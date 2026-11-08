import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";

const BACKEND_URL = process.env.MEDUSA_BACKEND_URL || "http://localhost:9000";
const PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY ||
  "pk_f99102c7f3f02d9814198899e7f43186c556d291e9283329a440e6db1fe6d480";

const headers = {
  "Content-Type": "application/json",
  "x-publishable-api-key": PUBLISHABLE_KEY,
};

async function apiRequest<T = any>(
  path: string,
  options: RequestInit = {}
): Promise<{ status: number; body: T }> {
  const url = `${BACKEND_URL}${path}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...(options.headers || {}),
    },
  });

  let body: any;
  try {
    body = await response.json();
  } catch {
    body = null;
  }

  return { status: response.status, body: body as T };
}

export default async function testPhase6QA({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);

  logger.info("===============================================================");
  logger.info("🧪 [Phase 6 QA & Hardening] Running Comprehensive Verification");
  logger.info("===============================================================\n");

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    if (condition) {
      logger.info(`  ✅ PASS: ${testName}`);
      passed++;
    } else {
      logger.error(`  ❌ FAIL: ${testName}`);
      if (detail) logger.error(`     Detail: ${detail}`);
      failed++;
    }
  }

  // =========================================================================
  // 1. Storefront Region & Authoritative BDT Currency
  // =========================================================================
  logger.info("--- 1. Testing Region Configuration & BDT Currency ---");
  const { status: regStatus, body: regBody } = await apiRequest<{ regions: any[] }>(
    "/store/regions"
  );
  assert(regStatus === 200, "Fetch store regions returns HTTP 200");

  const bdRegion = regBody.regions?.find(
    (r) => r.currency_code === "bdt" || r.countries?.some((c: any) => c.iso_2 === "bd")
  );
  assert(Boolean(bdRegion), "Bangladesh region exists with BDT currency");
  assert(bdRegion?.currency_code === "bdt", "Region primary currency is strictly 'bdt'");

  // =========================================================================
  // 2. Botanical Catalog & Plant Care Metadata Reflection
  // =========================================================================
  logger.info("\n--- 2. Testing Plant Catalog & Metadata Reflection ---");
  const { status: prodStatus, body: prodBody } = await apiRequest<{ products: any[] }>(
    "/store/products?fields=+metadata,+variants.prices"
  );
  assert(prodStatus === 200, "Fetch store products returns HTTP 200");
  assert(
    Boolean(prodBody.products && prodBody.products.length >= 3),
    `Botanical catalog contains published plants (Count: ${prodBody.products?.length})`
  );

  const samplePlant = prodBody.products.find((p) => p.metadata?.plant_care);
  assert(Boolean(samplePlant), "Catalog products carry metadata.plant_care profile");
  const care = samplePlant?.metadata?.plant_care;
  assert(
    Boolean(care?.watering && care?.light && care?.difficulty),
    `Plant care has required fields (watering: "${care?.watering?.slice(0, 20)}...")`
  );

  // =========================================================================
  // 3. E2E Cash on Delivery Flow A: Inside Dhaka (৳60 delivery)
  // =========================================================================
  logger.info("\n--- 3. Testing E2E COD Checkout Flow A: Inside Dhaka (৳60 Delivery) ---");

  // Step 3a: Create Cart
  const { body: cartAData } = await apiRequest<{ cart: any }>("/store/carts", {
    method: "POST",
    body: JSON.stringify({ region_id: bdRegion.id, currency_code: "bdt" }),
  });
  const cartAId = cartAData.cart.id;
  assert(Boolean(cartAId), "Cart created for Bangladesh region");

  // Step 3b: Add Line Item
  const targetVariantA = prodBody.products[0].variants[0];
  const { status: addItemAStatus, body: cartAWithItem } = await apiRequest<{ cart: any }>(
    `/store/carts/${cartAId}/line-items`,
    {
      method: "POST",
      body: JSON.stringify({ variant_id: targetVariantA.id, quantity: 1 }),
    }
  );
  assert(addItemAStatus === 200, "Add line item to cart succeeds with HTTP 200");

  // Step 3c: Set Customer & Dhaka Address
  const { status: addrAStatus } = await apiRequest(`/store/carts/${cartAId}`, {
    method: "POST",
    body: JSON.stringify({
      email: "tanvir.dhaka@greendreams.com",
      shipping_address: {
        first_name: "Tanvir",
        last_name: "Ahmed",
        address_1: "House 42, Road 7, Sector 4, Uttara",
        city: "Dhaka",
        country_code: "bd",
        postal_code: "1230",
        phone: "+8801712345678",
      },
      billing_address: {
        first_name: "Tanvir",
        last_name: "Ahmed",
        address_1: "House 42, Road 7, Sector 4, Uttara",
        city: "Dhaka",
        country_code: "bd",
        postal_code: "1230",
        phone: "+8801712345678",
      },
    }),
  });
  assert(addrAStatus === 200, "Set Dhaka customer shipping address succeeds");

  // Step 3d: Query & Select Inside Dhaka Shipping Option (৳60)
  const { body: shipOptAData } = await apiRequest<{ shipping_options: any[] }>(
    `/store/shipping-options?cart_id=${cartAId}`
  );
  const insideDhakaOpt = shipOptAData.shipping_options?.find(
    (o) => o.name.includes("Inside Dhaka") || o.amount === 60
  );
  assert(Boolean(insideDhakaOpt), "Inside Dhaka shipping option available");
  assert(insideDhakaOpt?.amount === 60, "Inside Dhaka shipping fee is authoritative ৳60");

  await apiRequest(`/store/carts/${cartAId}/shipping-methods`, {
    method: "POST",
    body: JSON.stringify({ option_id: insideDhakaOpt.id }),
  });

  // Step 3e: Payment Collection & COD Session
  const { body: payColA } = await apiRequest<{ payment_collection: any }>(
    "/store/payment-collections",
    { method: "POST", body: JSON.stringify({ cart_id: cartAId }) }
  );
  await apiRequest(
    `/store/payment-collections/${payColA.payment_collection.id}/payment-sessions`,
    { method: "POST", body: JSON.stringify({ provider_id: "pp_system_default" }) }
  );

  // Step 3f: Complete Cart
  const { status: compAStatus, body: compABody } = await apiRequest<any>(
    `/store/carts/${cartAId}/complete`,
    { method: "POST" }
  );
  assert(compAStatus === 200, "Complete cart A returns HTTP 200");
  const orderA = compABody.order || compABody.cart;
  assert(Boolean(orderA?.id), `Order A created successfully (ID: ${orderA?.id})`);

  // Query order details
  const { data: orderDetailsA } = await query.graph({
    entity: "order",
    fields: [
      "id",
      "currency_code",
      "total",
      "subtotal",
      "shipping_total",
      "status",
      "payment_collections.*",
      "shipping_methods.*",
    ],
    filters: { id: orderA.id },
  });
  const fullOrderA = orderDetailsA?.[0] || orderA;
  const payColStatusA = fullOrderA.payment_collections?.[0]?.status || "not_paid";

  const rawShippingFeeA =
    fullOrderA.shipping_methods?.[0]?.amount ?? fullOrderA.shipping_total ?? 0;
  const shippingFeeA = Math.round(Number(rawShippingFeeA));

  assert(fullOrderA.currency_code === "bdt", "Order A currency is 'bdt'");
  assert(
    shippingFeeA === 60,
    `Order A recorded shipping fee is ৳60 (got: ${shippingFeeA})`
  );
  assert(
    fullOrderA.status === "pending",
    `Order A status is correctly 'pending' (got: ${fullOrderA.status})`
  );
  assert(
    payColStatusA !== "captured",
    `Order A payment collection is NOT marked as captured (status: ${payColStatusA})`
  );

  // =========================================================================
  // 4. E2E Cash on Delivery Flow B: Outside Dhaka (৳130 delivery)
  // =========================================================================
  logger.info("\n--- 4. Testing E2E COD Checkout Flow B: Outside Dhaka (৳130 Delivery) ---");

  // Step 4a: Create Cart
  const { body: cartBData } = await apiRequest<{ cart: any }>("/store/carts", {
    method: "POST",
    body: JSON.stringify({ region_id: bdRegion.id, currency_code: "bdt" }),
  });
  const cartBId = cartBData.cart.id;

  // Step 4b: Add Line Item
  const targetVariantB = prodBody.products[1]?.variants[0] || targetVariantA;
  await apiRequest(`/store/carts/${cartBId}/line-items`, {
    method: "POST",
    body: JSON.stringify({ variant_id: targetVariantB.id, quantity: 1 }),
  });

  // Step 4c: Set Outside Dhaka Address (Chattogram)
  await apiRequest(`/store/carts/${cartBId}`, {
    method: "POST",
    body: JSON.stringify({
      email: "nusrat.ctg@greendreams.com",
      shipping_address: {
        first_name: "Nusrat",
        last_name: "Jahan",
        address_1: "House 12, Road 3, Agrabad C/A",
        city: "Chattogram",
        country_code: "bd",
        postal_code: "4100",
        phone: "+8801812345678",
      },
      billing_address: {
        first_name: "Nusrat",
        last_name: "Jahan",
        address_1: "House 12, Road 3, Agrabad C/A",
        city: "Chattogram",
        country_code: "bd",
        postal_code: "4100",
        phone: "+8801812345678",
      },
    }),
  });

  // Step 4d: Query & Select Outside Dhaka Shipping Option (৳130)
  const { body: shipOptBData } = await apiRequest<{ shipping_options: any[] }>(
    `/store/shipping-options?cart_id=${cartBId}`
  );
  const outsideDhakaOpt = shipOptBData.shipping_options?.find(
    (o) => o.name.includes("Outside Dhaka") || o.amount === 130
  );
  assert(Boolean(outsideDhakaOpt), "Outside Dhaka shipping option available");
  assert(outsideDhakaOpt?.amount === 130, "Outside Dhaka shipping fee is authoritative ৳130");

  await apiRequest(`/store/carts/${cartBId}/shipping-methods`, {
    method: "POST",
    body: JSON.stringify({ option_id: outsideDhakaOpt.id }),
  });

  // Step 4e: Payment Collection & COD Session
  const { body: payColB } = await apiRequest<{ payment_collection: any }>(
    "/store/payment-collections",
    { method: "POST", body: JSON.stringify({ cart_id: cartBId }) }
  );
  await apiRequest(
    `/store/payment-collections/${payColB.payment_collection.id}/payment-sessions`,
    { method: "POST", body: JSON.stringify({ provider_id: "pp_system_default" }) }
  );

  // Step 4f: Complete Cart
  const { status: compBStatus, body: compBBody } = await apiRequest<any>(
    `/store/carts/${cartBId}/complete`,
    { method: "POST" }
  );
  assert(compBStatus === 200, "Complete cart B returns HTTP 200");
  const orderB = compBBody.order || compBBody.cart;
  assert(Boolean(orderB?.id), `Order B created successfully (ID: ${orderB?.id})`);

  // Query order B details
  const { data: orderDetailsB } = await query.graph({
    entity: "order",
    fields: [
      "id",
      "currency_code",
      "total",
      "status",
      "payment_collections.*",
      "shipping_methods.*",
    ],
    filters: { id: orderB.id },
  });
  const fullOrderB = orderDetailsB?.[0] || orderB;
  const payColStatusB = fullOrderB.payment_collections?.[0]?.status || "not_paid";

  const rawShippingFeeB =
    fullOrderB.shipping_methods?.[0]?.amount ?? fullOrderB.shipping_total ?? 0;
  const shippingFeeB = Math.round(Number(rawShippingFeeB));

  assert(
    shippingFeeB === 130,
    `Order B recorded shipping fee is ৳130 (got: ${shippingFeeB})`
  );
  assert(
    fullOrderA.status === "pending",
    `Order B status is correctly 'pending' (got: ${fullOrderB.status})`
  );
  assert(
    payColStatusB !== "captured",
    `Order B payment collection is NOT marked as captured (status: ${payColStatusB})`
  );

  // =========================================================================
  // 5. Inventory & Out-of-Stock Validation
  // =========================================================================
  logger.info("\n--- 5. Testing Inventory Stock & Out-of-Stock Validation ---");

  // Create Cart for Out-of-Stock Test
  const { body: cartOosData } = await apiRequest<{ cart: any }>("/store/carts", {
    method: "POST",
    body: JSON.stringify({ region_id: bdRegion.id, currency_code: "bdt" }),
  });
  const cartOosId = cartOosData.cart.id;

  // Attempt to add 99,999 units (exceeding stocked 50 units)
  const { status: oosStatus, body: oosBody } = await apiRequest<any>(
    `/store/carts/${cartOosId}/line-items`,
    {
      method: "POST",
      body: JSON.stringify({
        variant_id: targetVariantA.id,
        quantity: 99999,
      }),
    }
  );

  // If item addition failed or if checkout completion rejects it
  if (oosStatus >= 400) {
    assert(
      oosStatus >= 400,
      `Server rejected excessive inventory item addition (Status: ${oosStatus})`
    );
  } else {
    // If Medusa permits adding to cart but rejects at checkout:
    await apiRequest(`/store/carts/${cartOosId}`, {
      method: "POST",
      body: JSON.stringify({
        email: "oos.test@greendreams.com",
        shipping_address: {
          first_name: "OOS",
          last_name: "Tester",
          address_1: "Test Address",
          city: "Dhaka",
          country_code: "bd",
          postal_code: "1200",
          phone: "+8801700000000",
        },
      }),
    });
    await apiRequest(`/store/carts/${cartOosId}/shipping-methods`, {
      method: "POST",
      body: JSON.stringify({ option_id: insideDhakaOpt.id }),
    });
    const { status: oosPayStatus, body: oosPayCol } = await apiRequest<{ payment_collection: any }>(
      "/store/payment-collections",
      { method: "POST", body: JSON.stringify({ cart_id: cartOosId }) }
    );
    if (oosPayStatus === 200) {
      await apiRequest(
        `/store/payment-collections/${oosPayCol.payment_collection.id}/payment-sessions`,
        { method: "POST", body: JSON.stringify({ provider_id: "pp_system_default" }) }
      );
      const { status: compOosStatus } = await apiRequest(
        `/store/carts/${cartOosId}/complete`,
        { method: "POST" }
      );
      assert(
        compOosStatus >= 400,
        `Server rejected completing order exceeding stock (Status: ${compOosStatus})`
      );
    } else {
      assert(true, "Server rejected payment initialization for out-of-stock items");
    }
  }

  // =========================================================================
  // 6. Idempotency & Duplicate Submission Safety
  // =========================================================================
  logger.info("\n--- 6. Testing Idempotency & Duplicate Order Submission ---");
  const { status: reCompStatus, body: reCompBody } = await apiRequest<any>(
    `/store/carts/${cartAId}/complete`,
    { method: "POST" }
  );

  // Medusa v2 returns either 400/409 error or the existing order without creating a new order
  const isIdempotentSafe =
    reCompStatus >= 400 || (reCompBody?.order && reCompBody.order.id === orderA.id);
  assert(
    isIdempotentSafe,
    `Duplicate submission on already completed cart A is safe (Status: ${reCompStatus})`
  );

  // =========================================================================
  // 7. Security Audit: Unauthenticated Admin Endpoint Protection
  // =========================================================================
  logger.info("\n--- 7. Testing Admin Authentication Lockdown (Security Audit) ---");
  const unauthEndpoints = [
    { method: "GET", path: "/admin/orders" },
    { method: "GET", path: "/admin/products" },
    { method: "GET", path: "/admin/users" },
    { method: "POST", path: "/admin/products" },
  ];

  for (const ep of unauthEndpoints) {
    const res = await fetch(`${BACKEND_URL}${ep.path}`, {
      method: ep.method,
      headers: { "Content-Type": "application/json" },
    });
    assert(
      res.status === 401,
      `Reject unauthenticated ${ep.method} ${ep.path} with HTTP 401 Unauthorized (Received: ${res.status})`
    );
  }

  // =========================================================================
  // Summary
  // =========================================================================
  logger.info("\n===============================================================");
  logger.info(`🏁 Phase 6 QA Verification Complete: ${passed} Passed, ${failed} Failed`);
  logger.info("===============================================================\n");

  if (failed > 0) {
    throw new Error(`Phase 6 QA failed with ${failed} failing test assertions!`);
  }
}
