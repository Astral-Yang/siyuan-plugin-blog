const isDev = process.env.NODE_ENV === "development"
const appBase = "/"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {enabled: true},
  app: {
    baseURL: appBase,
  },
  // 环境变量
  runtimeConfig: {
    public: {
      defaultType: process.env.NUXT_PUBLIC_DEFAULT_TYPE ?? "node",
      siyuanApiUrl: process.env.NUXT_PUBLIC_SIYUAN_API_URL ?? "http://127.0.0.1:6806",
      providerMode: process.env.NUXT_PUBLIC_PROVIDER_MODE ?? "false",
      providerUrl: process.env.NUXT_PUBLIC_PROVIDER_URL ?? "http://127.0.0.1:8086",
    },
  },
  compatibilityDate: "2024-11-01",
})
