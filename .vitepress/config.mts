import { defineConfig } from "vitepress";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vitepress.dev/reference/site-config
export default defineConfig({
  sitemap: {
    hostname: "https://ecrof88.github.io",
  },
  lastUpdated: true,
  title: "ecrof88-blog",
  description: "Kovaak ini",
  vite: {
    resolve: {
      alias: {
        "@theme": resolve(__dirname, "./theme"),
      },
    },
  },
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  themeConfig: {
    logo: "/favicon.ico",
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      {
        text: "DISC Notes",
        items: [
          { text: "windows msys2使用fish", link: "/discnotes/1" },
          { text: "WIN终端代理", link: "/discnotes/2" },
          { text: "Neovim 基础学习笔记", link: "/discnotes/3" },
        ],
      },
      {
        text: "Notes",
        items: [
          {
            // 分组标题
            text: "Rust Notes",
            items: [
              { text: "Basic1", link: "/rustnotes/basic1" },
              { text: "SortAlgo", link: "/rustnotes/sortalgo" },
            ],
          },
          {
            text: "CPP Notes",
            items: [{ text: "std中的variant", link: "/cppnotes/1" }],
          },
          {
            // 分组标题
            text: "Java Notes",
            items: [{ text: "自定义注解", link: "/javanotes/1" }],
          },
          {
            text: "React Notes",
            items: [{ text: "笔记1", link: "/react/1" }],
          },
          {
            text: "Config",
            items: [
              { text: "wezterm配置", link: "/configtur/wezterm" },
              { text: "autohotkey配置", link: "/configtur/AutohotKey" },
              { text: "msys2配置", link: "/configtur/msys2" },
            ],
          },
        ],
      },
    ],

    sidebar: [
      {
        text: "DISC Notes",
        items: [
          { text: "windows msys2使用fish", link: "/discnotes/1" },
          { text: "WIN终端代理", link: "/discnotes/2" },
          { text: "Neovim 基础学习笔记", link: "/discnotes/3" },
        ],
      },
      {
        text: "Notes",
        items: [
          {
            // 分组标题
            text: "Rust Notes",
            items: [
              { text: "Basic1", link: "/rustnotes/basic1" },
              { text: "SORT_ALGO", link: "/rustnotes/sortalgo" },
            ],
          },
          {
            text: "CPP Notes",
            items: [{ text: "std中的variant", link: "/cppnotes/1" }],
          },
          {
            text: "Java Notes",
            items: [{ text: "自定义注解", link: "/javanotes/1" }],
          },
          {
            text: "Config",
            items: [
              { text: "wezterm配置", link: "/configtur/wezterm" },
              { text: "autohotkey配置", link: "/configtur/AutohotKey" },
              { text: "msys2配置", link: "/configtur/msys2" },
            ],
          },
        ],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/ECROF88" }],
    search: {
      provider: "local",
    },
  },
});
