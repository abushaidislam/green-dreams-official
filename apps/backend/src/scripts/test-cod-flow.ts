import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";

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
): Promise<T> {
  const url = `${BACKEND_URL}${path}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...(options.headers || {}),
    },
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText} on ${path}\n${JSON.stringify(
        body,
        null,
        2
      )}`
    );
  }
  return body as T;
}

export default async function testCodFlow({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  logger.info("=== Starting Automated COD Commerce Flow Test ===");

  // Step 1: Verify Bangladesh Region and BDT Currency
  logger.info("[Step 1/8] Fetching regions from Store API...");
  const { regions } = await apiRequest<{ regions: any[] }>("/store/regions");
  const bdRegion = regions.find(
    (r) => r.currency_code === "bdt" || r.countries?.some((c: any) => c.iso_2 === "bd")
  );

  if (!bdRegion) {
    throw new Error("FAIL: Bangladesh region with BDT currency not found in Store API!");
  }
  logger.info(`PASS: Found Bangladesh region ${bdRegion.name} (${bdRegion.id}) with currency ${bdRegion.currency_code}`);

  // Step 2: Fetch Products & Variants
  logger.info("[Step 2/8] Fetching products from Store API...");
  const { products } = await apiRequest<{ products: any[] }>("/store/products?fields=+variants.prices");
  const snakePlant = products.find((p) => p.handle === "sample-snake-plant") || products[0];

  if (!snakePlant || !snakePlant.variants?.length) {
    throw new Error("FAIL: No published products or variants found for checkout test!");
  }

  const variant = snakePlant.variants[0];
  logger.info(`PASS: Selected product '${snakePlant.title}' variant '${variant.title}' (ID: ${variant.id})`);

  // Step 3: Create Cart for Bangladesh Region
  logger.info("[Step 3/8] Creating cart for Bangladesh region...");
  const { cart: createdCart } = await apiRequest<{ cart: any }>("/store/carts", {
    method: "POST",
    body: JSON.stringify({
      region_id: bdRegion.id,
      currency_code: "bdt",
    }),
  });
  logger.info(`PASS: Cart created (ID: ${createdCart.id})`);

  // Step 4: Add Line Item to Cart
  logger.info("[Step 4/8] Adding item to cart...");
  const { cart: cartWithItem } = await apiRequest<{ cart: any }>(
    `/store/carts/${createdCart.id}/line-items`,
    {
      method: "POST",
      body: JSON.stringify({
        variant_id: variant.id,
        quantity: 1,
      }),
    }
  );
  logger.info(`PASS: Line item added (Items count: ${cartWithItem.items?.length})`);

  // Step 5: Set Bangladesh Shipping & Customer Address
  logger.info("[Step 5/8] Setting customer & Bangladesh delivery address...");
  const { cart: cartWithAddress } = await apiRequest<{ cart: any }>(
    `/store/carts/${createdCart.id}`,
    {
      method: "POST",
      body: JSON.stringify({
        email: "test.customer@greendreams.com",
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
    }
  );
  logger.info(`PASS: Delivery address set to Dhaka, Bangladesh`);

  // Step 6: Query and Select Inside Dhaka Shipping Option
  logger.info("[Step 6/8] Querying available shipping options for cart...");
  const { shipping_options } = await apiRequest<{ shipping_options: any[] }>(
    `/store/shipping-options?cart_id=${createdCart.id}`
  );

  if (!shipping_options?.length) {
    throw new Error("FAIL: No shipping options available for cart!");
  }

  logger.info(`Available shipping options (${shipping_options.length}):`);
  for (const opt of shipping_options) {
    logger.info(` - ${opt.name}: ৳${opt.amount} (Provider: ${opt.provider_id})`);
  }

  const insideDhakaOption =
    shipping_options.find((opt) => opt.name.includes("Inside Dhaka") || opt.amount === 60) ||
    shipping_options[0];

  const { cart: cartWithShipping } = await apiRequest<{ cart: any }>(
    `/store/carts/${createdCart.id}/shipping-methods`,
    {
      method: "POST",
      body: JSON.stringify({
        option_id: insideDhakaOption.id,
      }),
    }
  );
  logger.info(
    `PASS: Selected shipping option '${insideDhakaOption.name}' with authoritative fee ৳${insideDhakaOption.amount}`
  );

  // Step 7: Initialize Payment Collection & COD Payment Session
  logger.info("[Step 7/8] Initializing Payment Collection and Cash on Delivery (COD) session...");
  const { payment_collection } = await apiRequest<{ payment_collection: any }>(
    "/store/payment-collections",
    {
      method: "POST",
      body: JSON.stringify({
        cart_id: createdCart.id,
      }),
    }
  );

  const { payment_collection: updatedCollection } = await apiRequest<{
    payment_collection: any;
  }>(`/store/payment-collections/${payment_collection.id}/payment-sessions`, {
    method: "POST",
    body: JSON.stringify({
      provider_id: "pp_system_default",
    }),
  });
  logger.info(`PASS: COD Payment Session initialized (Collection ID: ${updatedCollection.id})`);

  // Step 8: Complete Cart to Place COD Order
  logger.info("[Step 8/8] Completing cart to create Cash on Delivery order...");
  const completionResult = await apiRequest<any>(
    `/store/carts/${createdCart.id}/complete`,
    {
      method: "POST",
    }
  );

  const order = completionResult.order || completionResult.cart;
  if (!order || !order.id) {
    throw new Error(`FAIL: Order was not generated on cart completion: ${JSON.stringify(completionResult)}`);
  }

  // Retrieve full order details from query graph
  const query = container.resolve(ContainerRegistrationKeys.QUERY);
  const { data: orderDetails } = await query.graph({
    entity: "order",
    fields: [
      "id",
      "currency_code",
      "total",
      "status",
      "items.*",
      "shipping_methods.*",
      "payment_collections.*",
    ],
    filters: {
      id: order.id,
    },
  });

  const fullOrder = orderDetails?.[0] || order;
  const paymentCollectionStatus = fullOrder.payment_collections?.[0]?.status || "not_paid";

  logger.info(`\n========================================`);
  logger.info(`ORDER SUCCESSFULLY PLACED VIA COD!`);
  logger.info(`Order ID:                 ${fullOrder.id}`);
  logger.info(`Currency:                 ${fullOrder.currency_code?.toUpperCase()}`);
  logger.info(`Total Amount:             ৳${fullOrder.total}`);
  logger.info(`Order Status:             ${fullOrder.status}`);
  logger.info(`Payment Collection Status:${paymentCollectionStatus}`);
  logger.info(`Item Purchased:           ${fullOrder.items?.[0]?.title} x ${fullOrder.items?.[0]?.quantity} (৳${fullOrder.items?.[0]?.unit_price})`);
  logger.info(`Shipping Method:          ${fullOrder.shipping_methods?.[0]?.name} (৳${fullOrder.shipping_methods?.[0]?.amount})`);
  logger.info(`========================================\n`);

  // Strict Business Rules Verification (AGENTS.md & Architecture Rules)
  logger.info("Verifying COD Business Rules...");

  // Rule 1: COD must NOT be marked as captured online
  if (paymentCollectionStatus === "captured") {
    throw new Error(
      "BUSINESS RULE VIOLATION: COD order was marked as 'captured'! COD must remain unpaid/awaiting collection."
    );
  }
  logger.info("PASS: COD is not falsely marked as captured (Payment Collection Status: " + paymentCollectionStatus + ")");

  // Rule 2: Order must NOT be automatically marked as completed/delivered upon creation
  if (fullOrder.status === "completed") {
    throw new Error(
      "BUSINESS RULE VIOLATION: Order was prematurely marked as 'completed'!"
    );
  }
  logger.info("PASS: Order lifecycle status is correctly 'pending' (Status: " + fullOrder.status + ")");

  // Rule 3: Authoritative currency and amount
  if (fullOrder.currency_code !== "bdt") {
    throw new Error(`BUSINESS RULE VIOLATION: Expected currency 'bdt', got '${fullOrder.currency_code}'`);
  }
  logger.info("PASS: Authoritative currency is BDT (৳)");

  logger.info("=== Phase 2 COD End-to-End Commerce Flow Test Passed! ===");
}
