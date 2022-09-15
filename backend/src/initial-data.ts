import { LanguageCode } from "@vendure/common/lib/generated-types";
import { InitialData } from "@vendure/core/dist/data-import/index";

export const initialData: InitialData = {
  defaultLanguage: LanguageCode.vi,
  defaultZone: "Asia",
  taxRates: [{ name: "VAT", percentage: 0 }],
  shippingMethods: [
    { name: "Giao hàng tiêu chuẩn", price: 0 },
    { name: "Giao hàng nhanh", price: 0 },
  ],
  paymentMethods: [
    {
      name: "COD",
      handler: {
        code: "dummy-payment-handler",
        arguments: [{ name: "automaticSettle", value: "false" }],
      },
    },
  ],
  countries: [{ name: "Việt Nam", code: "VI", zone: "Asia" }],
  collections: [
    // {
    //   name: "Plants",
    //   filters: [
    //     {
    //       code: "facet-value-filter",
    //       args: { facetValueNames: ["plants"], containsAny: false },
    //     },
    //   ],
    // },
  ],
};
