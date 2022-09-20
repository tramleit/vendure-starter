import { LanguageCode, VendureConfig } from "@vendure/core";

export const customFields: VendureConfig["customFields"] = {
  Collection: [
    {
      name: "show_in_navbar",
      type: "boolean",
      defaultValue: false,
      label: [
        {
          languageCode: LanguageCode.vi,
          value: "Hiển thị trên điều hướng",
        },
        {
          languageCode: LanguageCode.en,
          value: "Show in navbar",
        },
      ],
    },
    {
      name: "show_in_home_page",
      type: "boolean",
      defaultValue: false,
      label: [
        {
          languageCode: LanguageCode.vi,
          value: "Hiển thị trên trang chủ",
        },
        {
          languageCode: LanguageCode.en,
          value: "Show in homepage",
        },
      ],
    },
    {
      name: "show_in_list",
      type: "boolean",
      defaultValue: false,
      label: [
        {
          languageCode: LanguageCode.vi,
          value: "Hiển thị trên danh sách",
        },
        {
          languageCode: LanguageCode.en,
          value: "Show in list",
        },
      ],
    },
  ],
};
