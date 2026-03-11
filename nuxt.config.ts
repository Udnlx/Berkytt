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
    },
  },
  runtimeConfig: {
    public: {
      apiBase: "http://berkytt/api",
    },
  },
});
