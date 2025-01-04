import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

import { join, resolve } from "path";
export default defineConfig({
  mode: "development",
  resolve: {
    alias: {
      "@": join(__dirname, "./src"),
    },
  },
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    VueI18nPlugin({
      runtimeOnly: false,
      include: resolve(__dirname, "./locales/**"),
    }),
    quasar({
      autoImportComponentCase: 'combined',
      sassVariables: 'src/quasar-variables.sass'
    })
  ],
  // define: { "process.env": {} },
  // css: {
  //   preprocessorOptions: {
  //     scss: { additionalData: ` @import "@/styles/variables.scss";` },
  //   },
  // },
});
