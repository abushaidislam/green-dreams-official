import { CreateInventoryLevelInput, ExecArgs } from "@medusajs/framework/types";
import {
  ContainerRegistrationKeys,
  Modules,
  ProductStatus,
} from "@medusajs/framework/utils";
import {
  createWorkflow,
  transform,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk";
import {
  createApiKeysWorkflow,
  createInventoryLevelsWorkflow,
  createProductCategoriesWorkflow,
  createProductsWorkflow,
  createRegionsWorkflow,
  createSalesChannelsWorkflow,
  createShippingOptionsWorkflow,
  createShippingProfilesWorkflow,
  createStockLocationsWorkflow,
  createTaxRegionsWorkflow,
  linkSalesChannelsToApiKeyWorkflow,
  linkSalesChannelsToStockLocationWorkflow,
  updateStoresStep,
  updateStoresWorkflow,
} from "@medusajs/medusa/core-flows";

const updateStoreCurrencies = createWorkflow(
  "update-store-currencies",
  (input: {
    supported_currencies: { currency_code: string; is_default?: boolean }[];
    store_id: string;
  }) => {
    const normalizedInput = transform({ input }, (data) => {
      return {
        selector: { id: data.input.store_id },
        update: {
          supported_currencies: data.input.supported_currencies.map(
            (currency) => ({
              currency_code: currency.currency_code,
              is_default: currency.is_default ?? false,
            })
          ),
        },
      };
    });

    const stores = updateStoresStep(normalizedInput);
    return new WorkflowResponse(stores);
  }
);

export default async function seedBangladeshData({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const link = container.resolve(ContainerRegistrationKeys.LINK);
  const query = container.resolve(ContainerRegistrationKeys.QUERY);
  const fulfillmentModuleService = container.resolve(Modules.FULFILLMENT);
  const salesChannelModuleService = container.resolve(Modules.SALES_CHANNEL);
  const storeModuleService = container.resolve(Modules.STORE);
  const regionModuleService = container.resolve(Modules.REGION);
  const stockLocationModuleService = container.resolve(Modules.STOCK_LOCATION);
  const productCategoryModuleService = container.resolve(Modules.PRODUCT);

  logger.info("=== Starting Green Dreams Phase 2 Commerce Seeding ===");

  // 1. Store & Currency Configuration (BDT)
  logger.info("Configuring store currencies for Bangladesh (BDT)...");
  const [store] = await storeModuleService.listStores();

  let defaultSalesChannel = await salesChannelModuleService.listSalesChannels({
    name: "Default Sales Channel",
  });

  if (!defaultSalesChannel.length) {
    const { result: salesChannelResult } = await createSalesChannelsWorkflow(
      container
    ).run({
      input: {
        salesChannelsData: [
          {
            name: "Default Sales Channel",
            description: "Green Dreams Online Store Sales Channel",
          },
        ],
      },
    });
    defaultSalesChannel = salesChannelResult;
  }

  await updateStoreCurrencies(container).run({
    input: {
      store_id: store.id,
      supported_currencies: [
        {
          currency_code: "bdt",
          is_default: true,
        },
      ],
    },
  });

  await updateStoresWorkflow(container).run({
    input: {
      selector: { id: store.id },
      update: {
        name: "Green Dreams",
        default_sales_channel_id: defaultSalesChannel[0].id,
      },
    },
  });

  // 2. Bangladesh Sales Region Configuration
  logger.info("Configuring Bangladesh Sales Region with BDT and COD provider...");
  const existingRegions = await regionModuleService.listRegions({
    currency_code: "bdt",
  });

  let region: any = existingRegions[0];
  if (!region) {
    const { result: regionResult } = await createRegionsWorkflow(container).run({
      input: {
        regions: [
          {
            name: "Bangladesh",
            currency_code: "bdt",
            countries: ["bd"],
            payment_providers: ["pp_system_default"],
          },
        ],
      },
    });
    region = regionResult[0];
  }
  logger.info(`Bangladesh Region active (ID: ${region.id})`);

  // 3. Tax Region for Bangladesh
  logger.info("Configuring Tax Region for Bangladesh...");
  try {
    await createTaxRegionsWorkflow(container).run({
      input: [
        {
          country_code: "bd",
          provider_id: "tp_system",
        },
      ],
    });
  } catch {
    logger.info("Tax region for BD already configured, skipping.");
  }

  // 4. Stock Location (Dhaka Central Nursery)
  logger.info("Configuring Dhaka Central Nursery stock location...");
  const existingLocations = await stockLocationModuleService.listStockLocations({
    name: "Dhaka Central Nursery",
  });

  let stockLocation: any = existingLocations[0];
  if (!stockLocation) {
    const { result: stockLocationResult } = await createStockLocationsWorkflow(
      container
    ).run({
      input: {
        locations: [
          {
            name: "Dhaka Central Nursery",
            address: {
              city: "Dhaka",
              country_code: "BD",
              address_1: "Mirpur Botanical Hub",
              postal_code: "1216",
            },
          },
        ],
      },
    });
    stockLocation = stockLocationResult[0];
  }

  await updateStoresWorkflow(container).run({
    input: {
      selector: { id: store.id },
      update: {
        default_location_id: stockLocation.id,
      },
    },
  });

  try {
    await link.create({
      [Modules.STOCK_LOCATION]: {
        stock_location_id: stockLocation.id,
      },
      [Modules.FULFILLMENT]: {
        fulfillment_provider_id: "manual_manual",
      },
    });
  } catch {
    // Link may already exist
  }

  // 5. Fulfillment Set & Shipping Profile
  logger.info("Configuring fulfillment sets and shipping options...");
  const shippingProfiles = await fulfillmentModuleService.listShippingProfiles({
    type: "default",
  });
  let shippingProfile = shippingProfiles.length ? shippingProfiles[0] : null;

  if (!shippingProfile) {
    const { result: shippingProfileResult } =
      await createShippingProfilesWorkflow(container).run({
        input: {
          data: [
            {
              name: "Default Plant Shipping Profile",
              type: "default",
            },
          ],
        },
      });
    shippingProfile = shippingProfileResult[0];
  }

  const existingFulfillmentSets = await fulfillmentModuleService.listFulfillmentSets({
    name: "Green Dreams Plant Delivery",
  });

  let fulfillmentSet = existingFulfillmentSets[0];
  if (!fulfillmentSet) {
    fulfillmentSet = await fulfillmentModuleService.createFulfillmentSets({
      name: "Green Dreams Plant Delivery",
      type: "shipping",
      service_zones: [
        {
          name: "Bangladesh Delivery Zone",
          geo_zones: [
            {
              country_code: "bd",
              type: "country",
            },
          ],
        },
      ],
    });
  }

  try {
    await link.create({
      [Modules.STOCK_LOCATION]: {
        stock_location_id: stockLocation.id,
      },
      [Modules.FULFILLMENT]: {
        fulfillment_set_id: fulfillmentSet.id,
      },
    });
  } catch {
    // Link may already exist
  }

  // 6. Shipping Options (Inside Dhaka ৳60 & Outside Dhaka ৳130)
  const existingOptions = await fulfillmentModuleService.listShippingOptions({});
  const hasOptions = existingOptions.some(
    (opt: any) => opt.service_zone_id === fulfillmentSet.service_zones[0].id
  );

  if (!hasOptions) {
    await createShippingOptionsWorkflow(container).run({
      input: [
        {
          name: "Inside Dhaka Standard Delivery (ঢাকা শহরের ভেতরে)",
          price_type: "flat",
          provider_id: "manual_manual",
          service_zone_id: fulfillmentSet.service_zones[0].id,
          shipping_profile_id: shippingProfile.id,
          type: {
            label: "Inside Dhaka",
            description: "ঢাকা শহরের ভেতরে ডেলিভারি (২-৩ দিন)",
            code: "inside_dhaka",
          },
          prices: [
            {
              currency_code: "bdt",
              amount: 60,
            },
            {
              region_id: region.id,
              amount: 60,
            },
          ],
          rules: [
            {
              attribute: "enabled_in_store",
              value: "true",
              operator: "eq",
            },
            {
              attribute: "is_return",
              value: "false",
              operator: "eq",
            },
          ],
        },
        {
          name: "Outside Dhaka Standard Delivery (ঢাকার বাইরে)",
          price_type: "flat",
          provider_id: "manual_manual",
          service_zone_id: fulfillmentSet.service_zones[0].id,
          shipping_profile_id: shippingProfile.id,
          type: {
            label: "Outside Dhaka",
            description: "ঢাকার বাইরে ডেলিভারি (৩-৫ দিন)",
            code: "outside_dhaka",
          },
          prices: [
            {
              currency_code: "bdt",
              amount: 130,
            },
            {
              region_id: region.id,
              amount: 130,
            },
          ],
          rules: [
            {
              attribute: "enabled_in_store",
              value: "true",
              operator: "eq",
            },
            {
              attribute: "is_return",
              value: "false",
              operator: "eq",
            },
          ],
        },
      ],
    });
  }

  try {
    await linkSalesChannelsToStockLocationWorkflow(container).run({
      input: {
        id: stockLocation.id,
        add: [defaultSalesChannel[0].id],
      },
    });
  } catch {
    // Channel already linked
  }

  // 7. Publishable API Key
  logger.info("Setting up Storefront Publishable API Key...");
  let publishableApiKey: any = null;
  const { data: keys } = await query.graph({
    entity: "api_key",
    fields: ["id", "token"],
    filters: {
      type: "publishable",
    },
  });

  publishableApiKey = keys?.[0];

  if (!publishableApiKey) {
    const {
      result: [publishableApiKeyResult],
    } = await createApiKeysWorkflow(container).run({
      input: {
        api_keys: [
          {
            title: "Storefront Webshop",
            type: "publishable",
            created_by: "",
          },
        ],
      },
    });

    publishableApiKey = publishableApiKeyResult;
  }

  await linkSalesChannelsToApiKeyWorkflow(container).run({
    input: {
      id: publishableApiKey.id,
      add: [defaultSalesChannel[0].id],
    },
  });
  logger.info(`Storefront Publishable API Key Token: ${publishableApiKey.token}`);

  // 8. Botanical Product Categories
  logger.info("Seeding botanical categories...");
  const existingCategories = await productCategoryModuleService.listProductCategories();
  let categoryMap: Record<string, string> = {};

  if (!existingCategories.length) {
    const { result: categoryResult } = await createProductCategoriesWorkflow(
      container
    ).run({
      input: {
        product_categories: [
          {
            name: "Indoor Plants",
            handle: "indoor-plants",
            description: "কম ও মাঝারি আলোতে ঘরের ভেতর সহজে বেড়ে ওঠা ইনডোর গাছ।",
            is_active: true,
          },
          {
            name: "Balcony & Outdoor",
            handle: "balcony-outdoor",
            description: "ব্যালকনি ও সরাসরি রোদের জন্য উপযুক্ত সতেজ আউটডোর প্ল্যান্টস।",
            is_active: true,
          },
          {
            name: "Low-light & Succulents",
            handle: "low-light-succulents",
            description: "কম যত্ন ও কম আলোতে বেঁচে থাকা ড্রাউট-টলারেন্ট গাছ ও সাকুলেন্ট।",
            is_active: true,
          },
          {
            name: "Pots & Plant Care",
            handle: "pots-plant-care",
            description: "গাছের জন্য প্রিমিয়াম জৈব সার, টব ও নার্সারি কেয়ার সামগ্রী।",
            is_active: true,
          },
        ],
      },
    });
    for (const cat of categoryResult) {
      categoryMap[cat.handle] = cat.id;
    }
  } else {
    for (const cat of existingCategories) {
      categoryMap[cat.handle] = cat.id;
    }
  }

  // 9. Botanical Sample Catalog with Typed PlantCareProfile Metadata
  logger.info("Seeding botanical sample plant catalog (tagged [SAMPLE])...");
  const { data: existingProducts } = await query.graph({
    entity: "product",
    fields: ["id", "handle"],
  });

  if (!existingProducts?.length) {
    await createProductsWorkflow(container).run({
      input: {
        products: [
          {
            title: "Snake Plant (Sansevieria Trifasciata) [SAMPLE]",
            handle: "sample-snake-plant",
            subtitle: "সহজ পরিচর্যার সেরা বাতাস পরিশোধক ইনডোর গাছ",
            description:
              "[SAMPLE CONTENT - VERIFY BEFORE PUBLICATION] স্নেক প্ল্যান্ট কম আলো এবং অত্যন্ত কম পানিতেও বছরের পর বছর বেঁচে থাকে। ঘরের বিষাক্ত টক্সিন দূর করে বিশুদ্ধ অক্সিজেন ছড়াতে এটি আদর্শ।",
            status: ProductStatus.PUBLISHED,
            shipping_profile_id: shippingProfile.id,
            category_ids: categoryMap["indoor-plants"]
              ? [categoryMap["indoor-plants"]]
              : [],
            metadata: {
              plant_care: {
                plantType: "indoor",
                scientificName: "Sansevieria trifasciata",
                light: "কম বা মাঝারি পরোক্ষ আলো (Low to medium indirect light)",
                watering: "মাটি পুরোপুরি শুকিয়ে গেলে ১০-১৪ দিন পর পর পানি দিন",
                humidity: "স্বাভাবিক রুম হিউমিডিটি (৪০-৬০%)",
                difficulty: "easy",
                petSafety: "unsafe",
                careInstructions:
                  "অতিরিক্ত পানি দেওয়া থেকে বিরত থাকুন। ভালো ড্রেইনেজযুক্ত টব ব্যবহার করুন।",
                sourceVerified: false,
              },
            },
            images: [
              {
                url: "https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?auto=format&fit=crop&w=800&q=80",
              },
            ],
            options: [
              {
                title: "Pot Size",
                values: ["Small 4 inch", "Medium Ceramic 6 inch"],
              },
            ],
            variants: [
              {
                title: "Small 4 inch",
                sku: "GD-SNAKE-4IN",
                manage_inventory: true,
                options: {
                  "Pot Size": "Small 4 inch",
                },
                prices: [
                  {
                    amount: 350,
                    currency_code: "bdt",
                  },
                ],
              },
              {
                title: "Medium Ceramic 6 inch",
                sku: "GD-SNAKE-6IN",
                manage_inventory: true,
                options: {
                  "Pot Size": "Medium Ceramic 6 inch",
                },
                prices: [
                  {
                    amount: 550,
                    currency_code: "bdt",
                  },
                ],
              },
            ],
            sales_channels: [
              {
                id: defaultSalesChannel[0].id,
              },
            ],
          },
          {
            title: "Golden Pothos / Money Plant [SAMPLE]",
            handle: "sample-golden-pothos",
            subtitle: "দ্রুত বর্ধনশীল লাকি ইনডোর মানি প্ল্যান্ট",
            description:
              "[SAMPLE CONTENT - VERIFY BEFORE PUBLICATION] গোল্ডেন পোথোস বা মানি প্ল্যান্ট ঘরে পজিটিভ এনার্জি আনে। ঝুলন্ত টবে বা মস স্টিকে এটি খুব দ্রুত সুন্দরভাবে বৃদ্ধি পায়।",
            status: ProductStatus.PUBLISHED,
            shipping_profile_id: shippingProfile.id,
            category_ids: categoryMap["indoor-plants"]
              ? [categoryMap["indoor-plants"]]
              : [],
            metadata: {
              plant_care: {
                plantType: "indoor",
                scientificName: "Epipremnum aureum",
                light: "পরোক্ষ উজ্জ্বল বা মাঝারি আলো (Medium indirect light)",
                watering: "উপরের ১-২ ইঞ্চি মাটি শুকালে সপ্তাহে একবার পানি দিন",
                humidity: "উষ্ণ ও আর্দ্র পরিবেশ পছন্দ করে (৫০-৭০%)",
                difficulty: "easy",
                petSafety: "unsafe",
                careInstructions:
                  "পানি জমে থাকতে দেওয়া যাবে না। নিয়মিত পাতা মুছে ধুলাবালি পরিষ্কার রাখুন।",
                sourceVerified: false,
              },
            },
            images: [
              {
                url: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=800&q=80",
              },
            ],
            options: [
              {
                title: "Style",
                values: ["Hanging Basket", "Moss Stick Trellis"],
              },
            ],
            variants: [
              {
                title: "Hanging Basket",
                sku: "GD-POTHOS-HANG",
                manage_inventory: true,
                options: {
                  Style: "Hanging Basket",
                },
                prices: [
                  {
                    amount: 220,
                    currency_code: "bdt",
                  },
                ],
              },
              {
                title: "Moss Stick Trellis",
                sku: "GD-POTHOS-MOSS",
                manage_inventory: true,
                options: {
                  Style: "Moss Stick Trellis",
                },
                prices: [
                  {
                    amount: 450,
                    currency_code: "bdt",
                  },
                ],
              },
            ],
            sales_channels: [
              {
                id: defaultSalesChannel[0].id,
              },
            ],
          },
          {
            title: "Peace Lily (Spathiphyllum) [SAMPLE]",
            handle: "sample-peace-lily",
            subtitle: "সাদা ফুলের স্নিগ্ধ সৌন্দর্য ও প্রাকৃতিক এয়ার ফিল্টার",
            description:
              "[SAMPLE CONTENT - VERIFY BEFORE PUBLICATION] পিস লিলি তার স্নিগ্ধ সাদা স্প্যাথ ফুল এবং ঘন সবুজ পাতার জন্য পরিচিত। ঘরের অভ্যন্তরীণ টক্সিন ফিল্টারে এটি দারুণ কার্যকরী।",
            status: ProductStatus.PUBLISHED,
            shipping_profile_id: shippingProfile.id,
            category_ids: categoryMap["indoor-plants"]
              ? [categoryMap["indoor-plants"]]
              : [],
            metadata: {
              plant_care: {
                plantType: "flowering",
                scientificName: "Spathiphyllum wallisii",
                light: "পরোক্ষ নরম আলো, সরাসরি রোদ এড়িয়ে চলুন",
                watering:
                  "মাটি সবসময় হালকা ভেজা রাখুন, পাতা নুয়ে পড়লে দ্রুত পানি দিন",
                humidity: "উচ্চ আর্দ্রতা প্রয়োজন (৬০%+)",
                difficulty: "medium",
                petSafety: "unsafe",
                careInstructions:
                  "তীব্র রোদ ও শুকনো বাতাস পরিহার করুন। পাতা স্প্রে করে আর্দ্র রাখুন।",
                sourceVerified: false,
              },
            },
            images: [
              {
                url: "https://images.unsplash.com/photo-1593691509543-c55fb32e7355?auto=format&fit=crop&w=800&q=80",
              },
            ],
            options: [
              {
                title: "Pot Type",
                values: ["Standard 5 inch", "Terracotta 7 inch"],
              },
            ],
            variants: [
              {
                title: "Standard 5 inch",
                sku: "GD-PLILY-STD",
                manage_inventory: true,
                options: {
                  "Pot Type": "Standard 5 inch",
                },
                prices: [
                  {
                    amount: 480,
                    currency_code: "bdt",
                  },
                ],
              },
              {
                title: "Terracotta 7 inch",
                sku: "GD-PLILY-TERRA",
                manage_inventory: true,
                options: {
                  "Pot Type": "Terracotta 7 inch",
                },
                prices: [
                  {
                    amount: 720,
                    currency_code: "bdt",
                  },
                ],
              },
            ],
            sales_channels: [
              {
                id: defaultSalesChannel[0].id,
              },
            ],
          },
          {
            title: "ZZ Plant (Zamioculcas Zamiifolia) [SAMPLE]",
            handle: "sample-zz-plant",
            subtitle: "সবচেয়ে শক্তপোক্ত ও কম যত্নের ইনডোর প্ল্যান্ট",
            description:
              "[SAMPLE CONTENT - VERIFY BEFORE PUBLICATION] জেডজেড প্ল্যান্টের পাতা চকচকে ও গাঢ় সবুজ। অফিস ও ড্রয়িংরুমের কম আলোর কোণেও এটি চমৎকার সতেজ থাকে।",
            status: ProductStatus.PUBLISHED,
            shipping_profile_id: shippingProfile.id,
            category_ids: categoryMap["low-light-succulents"]
              ? [categoryMap["low-light-succulents"]]
              : [],
            metadata: {
              plant_care: {
                plantType: "indoor",
                scientificName: "Zamioculcas zamiifolia",
                light: "কম আলো ও টিউবলাইটের আলোতেও স্বাচ্ছন্দ্যে বাঁচে",
                watering: "২-৩ সপ্তাহে একবার পানি দিন, অত্যন্ত খরা সহনশীল",
                humidity: "স্বাভাবিক ঘরের আর্দ্রতা",
                difficulty: "easy",
                petSafety: "unsafe",
                careInstructions:
                  "রাইজোমে পানি সঞ্চিত থাকে, তাই অতিরিক্ত পানি দিলে শিকড় পচে যাবে।",
                sourceVerified: false,
              },
            },
            images: [
              {
                url: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?auto=format&fit=crop&w=800&q=80",
              },
            ],
            options: [
              {
                title: "Size",
                values: ["Tabletop 5 inch", "Floor Ceramic 8 inch"],
              },
            ],
            variants: [
              {
                title: "Tabletop 5 inch",
                sku: "GD-ZZ-TAB",
                manage_inventory: true,
                options: {
                  Size: "Tabletop 5 inch",
                },
                prices: [
                  {
                    amount: 650,
                    currency_code: "bdt",
                  },
                ],
              },
              {
                title: "Floor Ceramic 8 inch",
                sku: "GD-ZZ-FLR",
                manage_inventory: true,
                options: {
                  Size: "Floor Ceramic 8 inch",
                },
                prices: [
                  {
                    amount: 1200,
                    currency_code: "bdt",
                  },
                ],
              },
            ],
            sales_channels: [
              {
                id: defaultSalesChannel[0].id,
              },
            ],
          },
          {
            title: "Monstera Deliciosa [SAMPLE]",
            handle: "sample-monstera-deliciosa",
            subtitle: "আইকনিক সুইস চিজ প্ল্যান্ট - যেকোনো রুমের আকর্ষণ",
            description:
              "[SAMPLE CONTENT - VERIFY BEFORE PUBLICATION] মনস্টেরা ডেলিসিওসার প্রাকৃতিক কাটযুক্ত বড় পাতা যেকোনো ঘরের সাজসজ্জায় ট্রপিক্যাল আবহ তৈরি করে।",
            status: ProductStatus.PUBLISHED,
            shipping_profile_id: shippingProfile.id,
            category_ids: categoryMap["balcony-outdoor"]
              ? [categoryMap["balcony-outdoor"]]
              : [],
            metadata: {
              plant_care: {
                plantType: "indoor",
                scientificName: "Monstera deliciosa",
                light: "উজ্জ্বল পরোক্ষ রোদ (Bright filtered light)",
                watering: "উপরের ২ ইঞ্চি মাটি শুকালে পর্যাপ্ত পানি দিন",
                humidity: "মাঝারি থেকে উচ্চ আর্দ্রতা (৬০%+)",
                difficulty: "medium",
                petSafety: "unsafe",
                careInstructions:
                  "বড় পাতার ওজনের জন্য কাঠি বা মস স্টিকে সাপোর্ট দিন।",
                sourceVerified: false,
              },
            },
            images: [
              {
                url: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80",
              },
            ],
            options: [
              {
                title: "Grade",
                values: ["Starter 6 inch", "Mature Large 10 inch"],
              },
            ],
            variants: [
              {
                title: "Starter 6 inch",
                sku: "GD-MONST-STRT",
                manage_inventory: true,
                options: {
                  Grade: "Starter 6 inch",
                },
                prices: [
                  {
                    amount: 850,
                    currency_code: "bdt",
                  },
                ],
              },
              {
                title: "Mature Large 10 inch",
                sku: "GD-MONST-LRG",
                manage_inventory: true,
                options: {
                  Grade: "Mature Large 10 inch",
                },
                prices: [
                  {
                    amount: 1650,
                    currency_code: "bdt",
                  },
                ],
              },
            ],
            sales_channels: [
              {
                id: defaultSalesChannel[0].id,
              },
            ],
          },
          {
            title: "Organic Vermicompost & Potting Mix (2kg) [SAMPLE]",
            handle: "sample-organic-potting-mix",
            subtitle: "গাছের সুষম বৃদ্ধির জন্য পুষ্টিসমৃদ্ধ জৈব মাটির মিশ্রণ",
            description:
              "[SAMPLE CONTENT - VERIFY BEFORE PUBLICATION] ভার্মিকম্পোস্ট, কোকোপিট, পার্লাইট ও ট্রাইকোডার্মার আদর্শ অনুপাতযুক্ত এই মিশ্রণ টবের ড্রেইনেজ উন্নত করে ও শেকড় শক্তিশালী রাখে।",
            status: ProductStatus.PUBLISHED,
            shipping_profile_id: shippingProfile.id,
            category_ids: categoryMap["pots-plant-care"]
              ? [categoryMap["pots-plant-care"]]
              : [],
            metadata: {
              plant_care: {
                plantType: "other",
                scientificName: "Organic Soil Blend",
                careInstructions:
                  "টবের সাধারণ মাটির সাথে ২০-৩০% মিশিয়ে ব্যবহার করুন।",
                difficulty: "easy",
                petSafety: "safe",
                sourceVerified: false,
              },
            },
            images: [
              {
                url: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80",
              },
            ],
            options: [
              {
                title: "Pack Size",
                values: ["2kg Bag"],
              },
            ],
            variants: [
              {
                title: "2kg Bag",
                sku: "GD-SOIL-2KG",
                manage_inventory: true,
                options: {
                  "Pack Size": "2kg Bag",
                },
                prices: [
                  {
                    amount: 120,
                    currency_code: "bdt",
                  },
                ],
              },
            ],
            sales_channels: [
              {
                id: defaultSalesChannel[0].id,
              },
            ],
          },
        ],
      },
    });
  }

  // 10. Inventory Levels linked to Dhaka Central Nursery
  logger.info("Configuring inventory levels for Dhaka Central Nursery...");
  const { data: inventoryItems } = await query.graph({
    entity: "inventory_item",
    fields: ["id"],
  });

  if (inventoryItems?.length) {
    const inventoryLevels: CreateInventoryLevelInput[] = [];
    for (const item of inventoryItems) {
      inventoryLevels.push({
        location_id: stockLocation.id,
        stocked_quantity: 50,
        inventory_item_id: item.id,
      });
    }

    try {
      await createInventoryLevelsWorkflow(container).run({
        input: {
          inventory_levels: inventoryLevels,
        },
      });
    } catch {
      logger.info("Inventory levels already synced.");
    }
  }

  logger.info("=== Phase 2 Commerce Seeding Completed Successfully! ===");
}
