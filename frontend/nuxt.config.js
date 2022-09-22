import webpack from "webpack";
import { getRoutes } from "./routes";
import theme from "./themeConfig";
console.log("host", process.env.HOST);
console.log("port", process.env.PORT);
export default {
  server: {
    port: process.env.PORT || 3001,
    host: process.env.HOST || "localhost",
  },
  buildDir: "dist",
  head: {
    title: "Vue Storefront",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || "",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  loading: { color: "#5ece7b" },
  plugins: [],
  css: ["~/assets/main.scss"],
  buildModules: [
    // to core
    "@nuxt/typescript-build",
    "@nuxtjs/google-fonts",
    "@nuxtjs/pwa",
    "@nuxtjs/style-resources",
    [
      "@vue-storefront/nuxt",
      {
        useRawSource: {
          dev: ["@vue-storefront/vendure", "@vue-storefront/core"],
          prod: ["@vue-storefront/vendure", "@vue-storefront/core"],
        },
      },
    ],
    // @core-development-only-start
    [
      "@vue-storefront/nuxt-theme",
      {
        routes: false,
      },
    ],
    // @core-development-only-end
    /* project-only-start
    ['@vue-storefront/nuxt-theme'],
    project-only-end */
    [
      "@vue-storefront/vendure/nuxt",
      {
        i18n: { useNuxtI18nConfig: true },
      },
    ],
    "@nuxt/postcss8",
  ],
  modules: [
    [
      "nuxt-i18n",
      {
        baseUrl: process.env.BASE_URL || "http://localhost:3000",
      },
    ],
    "cookie-universal-nuxt",
    "vue-scrollto/nuxt",
    "@vue-storefront/middleware/nuxt",
  ],
  i18n: {
    currency: "VND",
    country: "VI",
    // countries: [
    //   { name: 'US', label: 'United States', states: ['California', 'Nevada'] },
    //   { name: 'AT', label: 'Austria' },
    //   { name: 'DE', label: 'Germany' },
    //   { name: 'NL', label: 'Netherlands' }
    // ],
    currencies: [
      // { name: 'EUR', label: 'Euro' },
      // { name: 'USD', label: 'Dollar' }
      { name: "VND", label: "Đồng" },
    ],
    locales: [
      { code: "vi", label: "Việt Nam", file: "vi.js", iso: "vi" },
      // { code: "en", label: "English", file: "en.js", iso: "en" },
      // { code: 'de', label: 'German', file: 'de.js', iso: 'de' }
    ],
    defaultLocale: "vi",
    lazy: true,
    seo: true,
    langDir: "lang/",
    strategy: "no_prefix",
    vueI18n: {
      fallbackLocale: "vi",
      numberFormats: {
        // en: {
        //   currency: {
        //     style: "currency",
        //     currency: "USD",
        //     currencyDisplay: "symbol",
        //   },
        // },
        vi: {
          currency: {
            style: "currency",
            currency: "VND",
            currencyDisplay: "symbol",
          },
        },
      },
    },
  },
  styleResources: {
    scss: [
      require.resolve("@storefront-ui/shared/styles/_helpers.scss", {
        paths: [process.cwd()],
      }),
    ],
  },
  router: {
    extendRoutes(routes) {
      getRoutes(`${__dirname}`).forEach((route) => routes.unshift(route));
    },
    middleware: ["checkout"],
  },
  publicRuntimeConfig: {
    theme,
  },
  build: {
    babel: {
      plugins: [["@babel/plugin-proposal-private-property-in-object", { loose: true }]],
    },
    transpile: ["vee-validate/dist/rules", /^@storefront-ui/],
    plugins: [
      new webpack.DefinePlugin({
        "process.VERSION": JSON.stringify({
          // eslint-disable-next-line global-require
          version: require("./package.json").version,
          lastCommit: process.env.LAST_COMMIT || "",
        }),
      }),
    ],
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },
  pwa: {
    meta: {
      theme_color: "#5ECE7B",
    },
  },
  googleFonts: {
    families: {
      Raleway: {
        wght: [300, 400, 500, 600, 700],
        ital: [400],
      },
      Montserrat: {
        wght: [300, 400, 500, 600, 700],
        ital: [300, 400],
      },
    },
    display: "swap",
  },
};
