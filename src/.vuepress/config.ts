import { defineUserConfig } from "vuepress";
import theme from "./theme.js";
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
  base: "/",
  head: [
    ['link', { rel: 'stylesheet', href: "/click-effect.css" }],
    ['script', { src: '/click-effect.js' }],
  ],
  locales: {
    // "/": {
    //   lang: "en-US",
    //   title: "ECROF-ENGLISH",
    //   description: "vuepress-theme-hope",
    // },
    "/": {
      lang: "zh-CN",
      title: "ECROF",
      description: "ECROF",
      
    },
  },

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,






});
