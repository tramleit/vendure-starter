import { AdminUiPlugin } from "@vendure/admin-ui-plugin";
import {
  AssetServerPlugin,
  configureS3AssetStorage,
} from "@vendure/asset-server-plugin";
import {
  DefaultAssetNamingStrategy,
  DefaultJobQueuePlugin,
  DefaultSearchPlugin,
  dummyPaymentHandler,
  LanguageCode,
  VendureConfig,
} from "@vendure/core";
import { compileUiExtensions } from "@vendure/ui-devkit/compiler";
import "dotenv/config";
import path from "path";
import { customFields } from "./custom-fields-config";

const IS_DEV = process.env.APP_ENV === "dev";

export const config: VendureConfig = {
  defaultLanguageCode: LanguageCode.vi,
  apiOptions: {
    port: 3000,
    adminApiPath: "admin-api",
    shopApiPath: "shop-api",
    // The following options are useful in development mode,
    // but are best turned off for production for security
    // reasons.
    ...(IS_DEV
      ? {
          adminApiPlayground: {
            settings: { "request.credentials": "include" } as any,
          },
          adminApiDebug: true,
          shopApiPlayground: {
            settings: { "request.credentials": "include" } as any,
          },
          shopApiDebug: true,
        }
      : {}),
  },
  authOptions: {
    tokenMethod: ["bearer", "cookie"],
    requireVerification: false,
    superadminCredentials: {
      identifier: process.env.SUPERADMIN_USERNAME,
      password: process.env.SUPERADMIN_PASSWORD,
    },
    cookieOptions: {
      secret: process.env.COOKIE_SECRET,
    },
  },
  dbConnectionOptions: {
    type: "postgres",
    // See the README.md "Migrations" section for an explanation of
    // the `synchronize` and `migrations` options.
    synchronize: false,
    migrations: [path.join(__dirname, "./migrations/*.ts")],
    logging: false,
    database: process.env.DB_NAME,
    schema: process.env.DB_SCHEMA,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    ...(!IS_DEV && { ssl: { rejectUnauthorized: false } }),
  },
  paymentOptions: {
    paymentMethodHandlers: [dummyPaymentHandler],
  },
  // When adding or altering custom field definitions, the database will
  // need to be updated. See the "Migrations" section in README.md.
  customFields,
  plugins: [
    AssetServerPlugin.init({
      route: "assets",
      assetUploadDir: path.join(__dirname, "assets"),
      namingStrategy: new DefaultAssetNamingStrategy(),
      storageStrategyFactory: configureS3AssetStorage({
        bucket: process.env.AWS_BUCKET + "",
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID + "",
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY + "",
        },
      }),
    }),
    DefaultJobQueuePlugin.init({ useDatabaseForBuffer: true }),
    DefaultSearchPlugin.init({ bufferUpdates: false, indexStockStatus: true }),
    // TODO: Disable email plugin while verify flow not implement yet
    // EmailPlugin.init({
    //   devMode: true,
    //   outputPath: path.join(__dirname, "../static/email/test-emails"),
    //   route: "mailbox",
    //   handlers: defaultEmailHandlers,
    //   templatePath: path.join(__dirname, "../static/email/templates"),
    //   globalTemplateVars: {
    //     // The following variables will change depending on your storefront implementation.
    //     // Here we are assuming a storefront running at http://localhost:8080.
    //     fromAddress: '"example" <noreply@example.com>',
    //     verifyEmailAddressUrl: "http://localhost:8080/verify",
    //     passwordResetUrl: "http://localhost:8080/password-reset",
    //     changeEmailAddressUrl:
    //       "http://localhost:8080/verify-email-address-change",
    //   },
    // }),
    AdminUiPlugin.init({
      port: 3000,
      route: "admin",
      app: IS_DEV
        ? compileUiExtensions({
            outputPath: path.join(__dirname, "../admin-ui"),
            extensions: [
              {
                translations: {
                  en: path.join(__dirname, "translations/en.json"),
                  vi: path.join(__dirname, "translations/vi.json"),
                },
                // globalStyles: path.join(__dirname, "theme/default.scss"),
                // sassVariableOverrides: path.join(
                //   __dirname,
                //   "theme/_variables_default.scss"
                // ),
              },
            ],
            devMode: IS_DEV,
          })
        : { path: "admin-ui/dist" },
      adminUiConfig: {
        defaultLanguage: LanguageCode.vi,
        defaultLocale: "vi",
        availableLanguages: [LanguageCode.en, LanguageCode.vi],
      },
    }),
  ],
};
