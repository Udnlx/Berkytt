// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  nitro: {
    routeRules: {
      "/product/**": {
        cors: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
      "/catalog/**": {
        cors: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    },
    devProxy: {
      "/api": {
        target: "https://berkytt.ru/apiv2",
        changeOrigin: true,
        // Локальное подключение
        // target: "http://berkytt/api",
        // changeOrigin: true,
      },
      "/sdek/": {
        target: "https://berkytt.ru/sdek/",
        changeOrigin: true,
      },
    },
  },
  runtimeConfig: {
    public: {
      apiBase: "https://berkytt.ru/apiv2",
      siteUrl: "https://berkytt.ru",
      domain: "https://berkytt.ru",
      // Локальное подключение
      // apiBase: "http://localhost:3000/api",
      // siteUrl: "http://localhost:3000",
      // domain: "http://berkytt",
    },
  },
});
