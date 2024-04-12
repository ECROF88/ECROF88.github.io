import { checkSocialMediaIcons, navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/zh/",
  // "/zh/demo/",
  {

    text: "博文",
    icon: "pen-to-square",
    prefix: "/zh/posts/",
    children: [
      {
        text: "TEST1",
        icon: "pen-to-square",
        prefix: "apple/",
        children: [
          { text: "1", icon: "pen-to-square", link: "1" },
          { text: "2", icon: "pen-to-square", link: "2" },
          "3",
          "4",
        ],
      },
      // {
      //   text: "香蕉",
      //   icon: "pen-to-square",
      //   prefix: "banana/",
      //   children: [
      //     {
      //       text: "香蕉 1",
      //       icon: "pen-to-square",
      //       link: "1",
      //     },
      //     {
      //       text: "香蕉 2",
      //       icon: "pen-to-square",
      //       link: "2",
      //     },
      //     "3",
      //     "4",
      //   ],
      // },
      // { text: "樱桃", icon: "pen-to-square", link: "cherry" },
      // { text: "火龙果", icon: "pen-to-square", link: "dragonfruit" },
      // "tomato",
      // "strawberry",
      { text: "微分方程", icon: "book", prefix: "differential-equations/" ,
        children: [
          { text: "1", icon: "pen-to-square", link: "test1" },
        ],
       },
      {
        text:"线性代数", icon: "book", prefix: "linear-algebra/",  
        children: [
          { text: "1", icon: "pen-to-square", link: "1" },
        ],
          }
    ],

  },
  {
    text: "V2 文档",
    icon: "book",
    link: "https://theme-hope.vuejs.press/zh/",
  },
]);
