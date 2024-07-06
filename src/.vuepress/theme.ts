import { hopeTheme } from "vuepress-theme-hope";
import {  zhNavbar } from "./navbar/index.js";
import { zhSidebar } from "./sidebar/index.js";
import { MR_HOPE_AVATAR } from "./logo.js";

export default hopeTheme({
  hostname: "https://mister-hope.github.io",
  darkmode: "enable",
  author: {
    name: "ECROF",
    url: "https://ecrof88.github.io/",
  },
  print: false,
  
  iconAssets: 
    "fontawesome",


    pageInfo:
    ["Author", "PageView", "Date", "Category", "Tag", "ReadingTime", "Word"]
      ,


  logo: "https://theme-hope-assets.vuejs.press/logo.svg",

  repo: "vuepress-theme-hope/vuepress-theme-hope",

  docsDir: "src",

  blog: {
    medias: {
      Email: "maomao8672@outlook.com",
      GitHub: "https://example.com",
      Gmail: "ecrofmaomao@gmail.com",
      Steam: "https://steamcommunity.com/profiles/76561199217264472/",
      Twitter: "https://twitter.com/ecrofmaomao",
      Zhihu: "https://www.zhihu.com/people/kingmm-46",
      MrHope: ["https://mister-hope.com", MR_HOPE_AVATAR],
    },
  },

  locales: {
    "/": {
      // navbar
      navbar: zhNavbar,

      // sidebar
      sidebar: zhSidebar,

      footer: "Default footer",

      displayFooter: true,

      blog: {
        avatar: "https://avatars.githubusercontent.com/u/114860152?s=400&u=cbe5964d8b2b1057bc78fc069afc29744df08ba6&v=4",
        name: "ECROF",
        roundAvatar: true,
        description: "GODDDD LIKE",
        intro: "/intro.html",
      },

      metaLocales: {
        editLink: "Edit this page on GitHub",
      },
    },

    /**
     * Chinese locale config
     */
    // "/zh/": {
    //   // navbar
    //   navbar: zhNavbar,
    //
    //   // sidebar
    //   sidebar: zhSidebar,
    //
    //   footer: "FOR LEGEND!",
    //
    //   displayFooter: true,
    //
    //   blog: {
    //     avatar: "https://avatars.githubusercontent.com/u/114860152?s=400&u=cbe5964d8b2b1057bc78fc069afc29744df08ba6&v=4",
    //     name: "ECROF",
    //     roundAvatar: true,
    //     description: "GODDDD LIKE",
    //     intro: "/zh/intro.html",
    //   },
    //
    //   // page meta
    //   metaLocales: {
    //     editLink: "在 GitHub 上编辑此页",
    //   },
    // },
  },
  
  encrypt: {
    config: {
      "/demo/encrypt.html": ["1234"],
      "/zh/demo/encrypt.html": ["1234"],
    },
  },

  // enable it to preview all changes in time
  // hotReload: true,

  plugins: {
    blog: true,
    prismjs: {
      dark: "atom-dark",
    },
    // install @waline/client before enabling it
    // WARNING: This is a test server for demo only.
    // You should create and use your own comment service in production.
    // comment: {
    //   provider: "Waline",
    //   serverURL: "https://waline-comment.vuejs.press",
    // },

    components: {
      components: ["Badge", "VPCard"],
    },

      // 选项
    copyright:{
      global: true,
      author: "ECROF",
      triggerLength: 100,
    },


    // all features are enabled for demo, only preserve features you need here
    mdEnhance: {
      align: true,
      attrs: true,
      codetabs: true,
      component: true,
      demo: true,
      figure: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      mark: true,
      katex: true,
      chart: true,
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,

      imgMark: true,
      // install chart.js before enabling it
      // chart: true,

      // insert component easily

      // install echarts before enabling it
      // echarts: true,

      // install flowchart.ts before enabling it
      // flowchart: true,

      // gfm requires mathjax-full to provide tex support
      // gfm: true,

      // install katex before enabling it
      // katex: true,

      // install mathjax-full before enabling it
      // mathjax: true,

      // install mermaid before enabling it
      // mermaid: true,

      // playground: {
      //   presets: ["ts", "vue"],
      // },

      // install reveal.js before enabling it
      // revealJs: {
      //   plugins: ["highlight", "math", "search", "notes", "zoom"],
      // },

      // install @vue/repl before enabling it
      // vuePlayground: true,

      // install sandpack-vue3 before enabling it
      // sandpack: true,
    },

    // install @vuepress/plugin-pwa and uncomment these if you want a PWA
    // pwa: {
    //   favicon: "/favicon.ico",
    //   cacheHTML: true,
    //   cachePic: true,
    //   appendBase: true,
    //   apple: {
    //     icon: "/assets/icon/apple-icon-152.png",
    //     statusBarColor: "black",
    //   },
    //   msTile: {
    //     image: "/assets/icon/ms-icon-144.png",
    //     color: "#ffffff",
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: "/assets/icon/chrome-mask-512.png",
    //         sizes: "512x512",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-mask-192.png",
    //         sizes: "192x192",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //     ],
    //     shortcuts: [
    //       {
    //         name: "Demo",
    //         short_name: "Demo",
    //         url: "/demo/",
    //         icons: [
    //           {
    //             src: "/assets/icon/guide-maskable.png",
    //             sizes: "192x192",
    //             purpose: "maskable",
    //             type: "image/png",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },
  },
},
//主题行为选项{ check: true, compact:true, custom: false, debug: false }



);
