import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as a,c as s,f as e}from"./app-DJDhr41o.js";const t={},o=e(`<h1 id="c-上取整" tabindex="-1"><a class="header-anchor" href="#c-上取整"><span>C++ 上取整：</span></a></h1><div class="language-cpp line-numbers-mode" data-ext="cpp" data-title="cpp"><pre class="language-cpp"><code><span class="token number">1.</span> 使用ceil和floor：
                            <span class="token function">ceil</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token keyword">double</span><span class="token punctuation">)</span>a<span class="token operator">/</span>b<span class="token punctuation">)</span>
这里如果a和b都是<span class="token keyword">int</span>的时候就要加上<span class="token keyword">double</span>进行一下类型转换。

<span class="token number">2.</span>
                            <span class="token punctuation">(</span>a<span class="token operator">+</span>b<span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token operator">/</span>b
也就是a<span class="token operator">+</span>b<span class="token operator">/</span>b上取整时候，其实就是如果a<span class="token operator">/</span>b整除了就不加<span class="token number">1</span>，如果a没有整除b，那么就在加上<span class="token number">1</span>。
所以这个式子就能实现这样的想法。                               
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="证明" tabindex="-1"><a class="header-anchor" href="#证明"><span>证明：</span></a></h4><p>$ a=nb+m \\ a/b =n+ m/b \\ (a+b-1)/b=nb+m+b-1/b\\text{;;;;;m=0时候,变成了(n+1)b -1 /b刚好就是n了。 }\\ m\\neq 0,m\\in (1,b)时候,a/b的上取整就是n+1\\ (a+b-1)/b=nb+m+b-1 /b=n+1 \\成立$</p>`,4),p=[o];function c(r,i){return a(),s("div",null,p)}const m=n(t,[["render",c],["__file","2.html.vue"]]),d=JSON.parse('{"path":"/zh/posts/ti/2.html","title":"C++ 上取整：","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2024-04-06T00:00:00.000Z","category":["tip"],"comment":true,"description":"C++ 上取整： 证明： $ a=nb+m \\\\ a/b =n+ m/b \\\\ (a+b-1)/b=nb+m+b-1/b\\\\text{;;;;;m=0时候,变成了(n+1)b -1 /b刚好就是n了。 }\\\\ m\\\\neq 0,m\\\\in (1,b)时候,a/b的上取整就是n+1\\\\ (a+b-1)/b=nb+m+b-1 /b=n+1 \\\\成立$","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/zh/posts/ti/2.html"}],["meta",{"property":"og:site_name","content":"ECROF"}],["meta",{"property":"og:title","content":"C++ 上取整："}],["meta",{"property":"og:description","content":"C++ 上取整： 证明： $ a=nb+m \\\\ a/b =n+ m/b \\\\ (a+b-1)/b=nb+m+b-1/b\\\\text{;;;;;m=0时候,变成了(n+1)b -1 /b刚好就是n了。 }\\\\ m\\\\neq 0,m\\\\in (1,b)时候,a/b的上取整就是n+1\\\\ (a+b-1)/b=nb+m+b-1 /b=n+1 \\\\成立$"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-05-04T03:08:32.000Z"}],["meta",{"property":"article:author","content":"ECROF"}],["meta",{"property":"article:published_time","content":"2024-04-06T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-05-04T03:08:32.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"C++ 上取整：\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-04-06T00:00:00.000Z\\",\\"dateModified\\":\\"2024-05-04T03:08:32.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"ECROF\\",\\"url\\":\\"https://ecrof88.github.io/\\"}]}"]]},"headers":[],"git":{"createdTime":1714792112000,"updatedTime":1714792112000,"contributors":[{"name":"ECROF88","email":"maomao8672@outlook.com","commits":1}]},"readingTime":{"minutes":0.59,"words":177},"filePathRelative":"zh/posts/ti/2.md","localizedDate":"2024年4月6日","excerpt":"\\n<div class=\\"language-cpp\\" data-ext=\\"cpp\\" data-title=\\"cpp\\"><pre class=\\"language-cpp\\"><code><span class=\\"token number\\">1.</span> 使用ceil和floor：\\n                            <span class=\\"token function\\">ceil</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">double</span><span class=\\"token punctuation\\">)</span>a<span class=\\"token operator\\">/</span>b<span class=\\"token punctuation\\">)</span>\\n这里如果a和b都是<span class=\\"token keyword\\">int</span>的时候就要加上<span class=\\"token keyword\\">double</span>进行一下类型转换。\\n\\n<span class=\\"token number\\">2.</span>\\n                            <span class=\\"token punctuation\\">(</span>a<span class=\\"token operator\\">+</span>b<span class=\\"token operator\\">-</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">)</span><span class=\\"token operator\\">/</span>b\\n也就是a<span class=\\"token operator\\">+</span>b<span class=\\"token operator\\">/</span>b上取整时候，其实就是如果a<span class=\\"token operator\\">/</span>b整除了就不加<span class=\\"token number\\">1</span>，如果a没有整除b，那么就在加上<span class=\\"token number\\">1</span>。\\n所以这个式子就能实现这样的想法。                               \\n</code></pre></div>","autoDesc":true}');export{m as comp,d as data};