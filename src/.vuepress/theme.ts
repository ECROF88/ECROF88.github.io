import {hopeTheme} from "vuepress-theme-hope";
import {zhNavbar} from "./navbar/index.js";
import {zhSidebar} from "./sidebar/index.js";
import {MR_HOPE_AVATAR} from "./logo.js";
import { prismjsPlugin } from '@vuepress/plugin-prismjs'
export default hopeTheme({
        hostname: "https://ecrof88.github.io/",
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
                dark: "xonokai",
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
            copyright: {
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
                        replacer: ({tag}) => {
                            if (tag === "em")
                                return {
                                    tag: "Badge",
                                    attrs: {type: "tip"},
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

            },

        },
    },
//主题行为选项{ check: true, compact:true, custom: false, debug: false }


);
