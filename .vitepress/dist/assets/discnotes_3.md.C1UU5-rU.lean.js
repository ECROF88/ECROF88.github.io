import{_ as a,c as d,a3 as t,o as i}from"./chunks/framework.C4Vvvhxx.js";const m=JSON.parse('{"title":"Neovim 基础学习笔记","description":"","frontmatter":{},"headers":[],"relativePath":"discnotes/3.md","filePath":"discnotes/3.md","lastUpdated":1738574633000}'),o={name:"discnotes/3.md"};function r(p,e,s,c,n,l){return i(),d("div",null,e[0]||(e[0]=[t('<h1 id="neovim-基础学习笔记" tabindex="-1">Neovim 基础学习笔记 <a class="header-anchor" href="#neovim-基础学习笔记" aria-label="Permalink to &quot;Neovim 基础学习笔记&quot;">​</a></h1><p>参考的视频： <a href="https://www.bilibili.com/video/BV1y4cWeiEnX/?share_source=copy_web&amp;vd_source=4a3c4256190471c23ba19a1aae210dae" target="_blank" rel="noreferrer">7 分钟学会 neovim 编辑技巧 手速比脑子快</a></p><p>11j 光标向下移动 11 行 w 按单词向右跳转 b 按单词向左跳转 f + ‘a’ 会使所有的 a 高亮，之后按 f 键跳到下一个，shift+f 跳转到上一个</p><p>s+ &#39;前缀&#39; 把所有的前缀都高亮起来： 例如 前缀为 add，把 add 全部高亮的同时，它后面的字符也会出现高亮， 例如 adda，addl，addq 如果想要跳转到 addq，此时按一下 q 就直接跳转到 addq 如果代码中存在错误，已经被红色标记，则使用】/【 + e 来跳转到错误的位置 方括号其他用法：【+a 跳转到参数</p><p>dw：delete word 删掉这个单词 diw：delete inside word 二者区别：如果光标在单词中间，dw 只会删后半部分，diw 会删除全部，所以 diw 用的比较多.</p><p>i：进入插入模式 cw：删除单词之后直接进入插入模式（删掉光标之后的） ciw：光标在word中间也会全删，和diw类似</p><p>vw：选中单词，选中之后可以用d来删除，也可以用y来复制 viw：</p><p>diw，ciw，viw，这个w可以换成别的符号： 例如 (, 代表里面的内容，只要是成对出现的符号都可以这样</p><p>u：撤销 重做撤销的操作：ctrl+r</p><p>2yy 复制两行 p 粘贴 o 在光标下面插入新行</p><p>shift+g 到代码最后一行 :w 或者 ctrl+s 保存文件</p>',11)]))}const f=a(o,[["render",r]]);export{m as __pageData,f as default};
