import { ExecArgs } from "@medusajs/framework/types"

export default async function testAdminReflection({ container }: ExecArgs) {
  const logger = container.resolve("logger")
  const productModuleService = container.resolve("product")
  const orderModuleService = container.resolve("order")

  logger.info("🧪 [Phase 4 Verification] Starting Admin Widget & Storefront Reflection Verification...")

  // 1. Fetch our seeded Snake Plant product
  const [product] = await productModuleService.listProducts({
    handle: "sample-snake-plant",
  })

  if (!product) {
    throw new Error("Could not find sample-snake-plant in catalog")
  }

  logger.info(`✅ Found product: "${product.title}" (${product.id})`)
  logger.info(`   Current metadata.plant_care: ${JSON.stringify(product.metadata?.plant_care)}`)

  // 2. Simulate Staff Botanist updating the plant care metadata via Admin
  const updatedCare = {
    plantType: "indoor",
    scientificName: "Sansevieria trifasciata (Laurentii)",
    light: "Bright indirect light to low light; drought tolerant",
    watering: "Water every 2-3 weeks in Dhaka summer, monthly in winter. Allow soil to dry completely.",
    humidity: "Tolerates dry air; ideal indoor humidity 40-50%",
    difficulty: "easy",
    petSafety: "unsafe", // Cat & dog toxic (calcium oxalate crystals)
    careInstructions: "Wipe leaves monthly with damp cloth to remove Dhaka dust. Use well-draining succulent soil mix.",
    sourceVerified: true,
  }

  logger.info("🌿 Simulating staff botanist updating plant care guide via Admin Widget...")
  await productModuleService.updateProducts(product.id, {
    metadata: {
      ...(product.metadata || {}),
      plant_care: updatedCare,
    },
  })

  // 3. Re-fetch product to verify database persistence
  const updatedProduct = await productModuleService.retrieveProduct(product.id)
  const savedCare = updatedProduct.metadata?.plant_care as any

  if (savedCare?.scientificName !== updatedCare.scientificName || savedCare?.sourceVerified !== true) {
    throw new Error("Plant care profile was not correctly saved to database!")
  }
  logger.info("✅ Database persistence verified: plant_care profile successfully updated with sourceVerified: true")

  // 4. Verify Order Operations data on seeded COD order
  const [order] = await orderModuleService.listOrders(
    {},
    {
      relations: ["shipping_address", "shipping_methods"],
      take: 1,
    }
  )

  if (!order) {
    throw new Error("No orders found to verify order operations widget")
  }

  logger.info(`✅ Found order: ${order.id}`)
  logger.info(`   Customer: ${order.shipping_address?.first_name} ${order.shipping_address?.last_name}`)
  logger.info(`   Phone: ${order.shipping_address?.phone}`)
  logger.info(`   City: ${order.shipping_address?.city}`)

  // 5. Query through Medusa HTTP Store API to ensure storefront reflection
  logger.info("🌐 Testing Storefront Store API reflection on http://localhost:9000/store/products...")
  const storeRes = await fetch(
    `http://localhost:9000/store/products?handle=sample-snake-plant&fields=+metadata`,
    {
      headers: {
        "x-publishable-api-key": process.env.MEDUSA_PUBLISHABLE_KEY || "pk_f99102c7f3f02d9814198899e7f43186c556d291e9283329a440e6db1fe6d480",
      },
    }
  )

  if (!storeRes.ok) {
    throw new Error(`Store API request failed with status: ${storeRes.status}`)
  }

  const storeJson = await storeRes.json()
  const storeProduct = storeJson.products?.[0]
  const storeCare = storeProduct?.metadata?.plant_care

  if (!storeCare || storeCare.scientificName !== updatedCare.scientificName || storeCare.sourceVerified !== true) {
    throw new Error(`Storefront did not receive updated plant care metadata: ${JSON.stringify(storeCare)}`)
  }

  logger.info(`✅ Storefront Store API confirmed:`)
  logger.info(`   Scientific Name: ${storeCare.scientificName}`)
  logger.info(`   Light: ${storeCare.light}`)
  logger.info(`   Watering: ${storeCare.watering}`)
  logger.info(`   Difficulty: ${storeCare.difficulty}`)
  logger.info(`   Pet Safety: ${storeCare.petSafety}`)
  logger.info(`   Source Verified: ${storeCare.sourceVerified}`)
  logger.info("🎉 [Phase 4 Verification] ALL CHECKS PASSED SUCCESSFULLY!")
}
