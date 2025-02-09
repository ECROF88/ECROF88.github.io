import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ecrof88-blog",
  description: "Kovaak ini",
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico', sizes: 'any' }],
    ['link', { rel: 'icon', href: './public/favicon.svg', type: 'image/svg+xml' }],
  ],
  themeConfig: {
    logo: './public/favicon.ico',
    // https://vitepress.dev/reference/default-theme-config
    nav: [

      { text: 'Home', link: '/' },
      {
        text: 'DISC Notes',
        items: [
          { text: 'windows msys2使用fish', link: '/discnotes/1' },
          { text: 'WIN终端代理', link: '/discnotes/2' },
          { text: 'Neovim 基础学习笔记', link: '/discnotes/3' },
        ]
      },
      {
        text: 'Notes',
        items: [
          {
            // 分组标题
            text: 'Rust Notes',
            items: [
              { text: 'Basic1', link: '/rustnotes/basic1' },
            ]
          },
          {
            text: 'CPP Notes',
            items: [
              { text: 'std中的variant', link: '/cppnotes/1' },
            ]
          },
          {
            // 分组标题
            text: 'Java Notes',
            items: [
              { text: '自定义注解', link: '/javanotes/1' },
            ]
          },
        ]
      },

    ],

    sidebar: [
      // {
      //   text: 'Examples',
      //   items: [
      //     { text: 'Markdown Examples', link: '/markdown-examples' },
      //     { text: 'Runtime API Examples', link: '/api-examples' }
      //   ]
      // },
      {
        text: 'DISC Notes',
        items: [
          { text: 'windows msys2使用fish', link: '/discnotes/1' },
          { text: 'WIN终端代理', link: '/discnotes/2' },
          { text: 'Neovim 基础学习笔记', link: '/discnotes/3' },
        ]
      },
      {
        text: 'Notes',
        items: [
          {
            // 分组标题
            text: 'Rust Notes',
            items: [
              { text: 'Basic1', link: '/rustnotes/basic1' },
            ]
          },
          {
            text: 'CPP Notes',
            items: [
              { text: 'std中的variant', link: '/cppnotes/1' },
            ]
          },
          {
            // 分组标题
            text: 'Java Notes',
            items: [
              { text: '自定义注解', link: '/javanotes/1' },
            ]
          },
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ECROF88' }
    ]
  }
})
