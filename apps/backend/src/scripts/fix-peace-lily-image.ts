import { ExecArgs } from "@medusajs/framework/types";
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils";

export default async function fixPeaceLilyImage({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const productModuleService = container.resolve(Modules.PRODUCT);

  logger.info("🌿 Updating Peace Lily image to verified working high-res photo...");

  const [peaceLily] = await productModuleService.listProducts({
    handle: "sample-peace-lily",
  });

  if (!peaceLily) {
    logger.warn("Peace Lily product not found in catalog");
    return;
  }

  const validImageUrl =
    "https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=800&q=80";

  await productModuleService.updateProducts(peaceLily.id, {
    thumbnail: validImageUrl,
    images: [{ url: validImageUrl }],
  });

  logger.info(`✅ Successfully updated Peace Lily (${peaceLily.id}) image and thumbnail!`);
}
