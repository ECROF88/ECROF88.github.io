import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as s,c as a,a as t,b as p}from"./app-BFy-aQIV.js";const e="/assets/images/1.jpg",o={},c=p(`<h1 id="在图基础上写的配对方法" tabindex="-1"><a class="header-anchor" href="#在图基础上写的配对方法"><span>在图基础上写的配对方法</span></a></h1><h2 id="使用的是邻接表" tabindex="-1"><a class="header-anchor" href="#使用的是邻接表"><span>使用的是邻接表</span></a></h2><p>每一个Node：</p><div class="language-cpp line-numbers-mode" data-ext="cpp" data-title="cpp"><pre class="language-cpp"><code><span class="token keyword">class</span> <span class="token class-name">Node</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">int</span> data<span class="token punctuation">;</span>
    <span class="token keyword">int</span> target<span class="token punctuation">;</span>
    Edgenode <span class="token operator">*</span>firstedge<span class="token punctuation">;</span><span class="token comment">//一个Node所有的边</span>
<span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token function">Node</span><span class="token punctuation">(</span><span class="token keyword">int</span> data<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token operator">-&gt;</span>data <span class="token operator">=</span> data<span class="token punctuation">;</span>
        firstedge<span class="token operator">=</span><span class="token constant">NULL</span><span class="token punctuation">;</span>
        target<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">bool</span> <span class="token keyword">operator</span><span class="token operator">==</span><span class="token punctuation">(</span><span class="token keyword">const</span> Node <span class="token operator">&amp;</span>n<span class="token punctuation">)</span> <span class="token comment">//用于后面的std::find(),重载==运算符用于比较</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token operator">-&gt;</span>data<span class="token operator">==</span>n<span class="token punctuation">.</span>data<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Edgenode:</p><div class="language-cpp line-numbers-mode" data-ext="cpp" data-title="cpp"><pre class="language-cpp"><code><span class="token keyword">class</span> <span class="token class-name">Edgenode</span><span class="token punctuation">{</span>
    <span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">int</span> data<span class="token punctuation">;</span>
    Edgenode <span class="token operator">*</span> next<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Graph:    使用的有向图:</p><p>先放一个没加别的扩展的正常的简单的图</p><div class="language-cpp line-numbers-mode" data-ext="cpp" data-title="cpp"><pre class="language-cpp"><code><span class="token keyword">class</span> <span class="token class-name">Graph</span><span class="token punctuation">{</span>
    <span class="token keyword">public</span><span class="token operator">:</span>
    <span class="token keyword">int</span> vexnum<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span><span class="token comment">//出发节点的数量</span>
    <span class="token keyword">int</span> edgenum<span class="token operator">=</span><span class="token number">0</span><span class="token punctuation">;</span><span class="token comment">//图中总共边的数量</span>
    vector<span class="token operator">&lt;</span>Node<span class="token operator">&gt;</span> nodelist<span class="token punctuation">;</span><span class="token comment">//作为出发节点的list</span>
    vector<span class="token operator">&lt;</span>Node<span class="token operator">&gt;</span> targets<span class="token punctuation">;</span><span class="token comment">//先不用管</span>
    <span class="token keyword">int</span> visited<span class="token punctuation">[</span><span class="token number">100</span><span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token comment">//先不用管</span>
    <span class="token keyword">int</span> match<span class="token punctuation">[</span><span class="token number">100</span><span class="token punctuation">]</span><span class="token punctuation">;</span><span class="token comment">//先不用管</span>
    <span class="token function">Graph</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">memset</span><span class="token punctuation">(</span>visited<span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token keyword">sizeof</span><span class="token punctuation">(</span>visited<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">memset</span><span class="token punctuation">(</span>match<span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token keyword">sizeof</span><span class="token punctuation">(</span>match<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">void</span> <span class="token function">addEdge</span><span class="token punctuation">(</span><span class="token keyword">int</span> u<span class="token punctuation">,</span> <span class="token keyword">int</span> v<span class="token punctuation">)</span><span class="token comment">//根据两个int u，v在图中添加边</span>
    <span class="token punctuation">{</span>   
        <span class="token comment">//在nodelist先找找u是不是已经存在了，如果不存在Iter就会指向end</span>
        <span class="token keyword">auto</span> Iter<span class="token operator">=</span>std<span class="token double-colon punctuation">::</span><span class="token function">find</span><span class="token punctuation">(</span>nodelist<span class="token punctuation">.</span><span class="token function">begin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>nodelist<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>u<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>Iter<span class="token operator">==</span>nodelist<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            nodelist<span class="token punctuation">.</span><span class="token function">push_back</span><span class="token punctuation">(</span><span class="token function">Node</span><span class="token punctuation">(</span>u<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//不存在就把新建一个Node加进去</span>
            vexnum<span class="token operator">++</span><span class="token punctuation">;</span>
            Iter <span class="token operator">=</span> std<span class="token double-colon punctuation">::</span><span class="token function">prev</span><span class="token punctuation">(</span>nodelist<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">//由于Iter一直指向end，现在应该让它指向新建的Node，它恰好也在end的前面</span>
        <span class="token punctuation">}</span>
        Edgenode <span class="token operator">*</span>newnode <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token function">Edgenode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//新建一个边的节点（也就是u通过一条边指向的节点。）</span>
        newnode<span class="token operator">-&gt;</span>data <span class="token operator">=</span> v<span class="token punctuation">;</span>
        newnode<span class="token operator">-&gt;</span>next <span class="token operator">=</span> <span class="token constant">NULL</span><span class="token punctuation">;</span>
        <span class="token comment">//让上个节点指向新节点（因为使用邻接表）</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token operator">*</span>Iter<span class="token punctuation">)</span><span class="token punctuation">.</span>firstedge<span class="token operator">==</span><span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token comment">//Iter是当前的Node，看看它现在有没有边</span>
        <span class="token punctuation">{</span>
            <span class="token punctuation">(</span><span class="token operator">*</span>Iter<span class="token punctuation">)</span><span class="token punctuation">.</span>firstedge<span class="token operator">=</span>newnode<span class="token punctuation">;</span><span class="token comment">//没有的话就把这个Edgenode当做第一条边指向的点</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">else</span>
        <span class="token punctuation">{</span>
            Edgenode <span class="token operator">*</span>p<span class="token operator">=</span><span class="token punctuation">(</span><span class="token operator">*</span>Iter<span class="token punctuation">)</span><span class="token punctuation">.</span>firstedge<span class="token punctuation">;</span>
            <span class="token keyword">while</span><span class="token punctuation">(</span>p<span class="token operator">-&gt;</span>next<span class="token operator">!=</span><span class="token constant">NULL</span><span class="token punctuation">)</span><span class="token comment">//不断迭代往后找最后一条边指向的节点</span>
            <span class="token punctuation">{</span>
                p<span class="token operator">=</span>p<span class="token operator">-&gt;</span>next<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            p<span class="token operator">-&gt;</span>next<span class="token operator">=</span>newnode<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        edgenum<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>之后想要配对，每个node都尽量跟一个edgenode配对，想要配对的最大数量</p><p>要考虑新建一个match数组，保存每一个edgenode配对的node是谁。</p><p>以及一个visited数组，保存每一个edgenode是都已经被占有了。</p><p>计算的思路：</p><ol><li>每次一个node想要进来找一个edgenode的时候，先看看自己能够到的每个edgenode是不是被“访问”了</li><li>然后如果一个edgenode没有被访问，那么就占为己有</li><li>如果被访问了，那么就看看与占据这个edgenode的node能不能给它让出来。</li></ol><p>实现：</p><div class="language-cpp line-numbers-mode" data-ext="cpp" data-title="cpp"><pre class="language-cpp"><code><span class="token function">MAIN</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span>Node <span class="token operator">&amp;</span>x<span class="token operator">:</span>g<span class="token punctuation">.</span>nodelist<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">memset</span><span class="token punctuation">(</span>g<span class="token punctuation">.</span>visited<span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token keyword">sizeof</span><span class="token punctuation">(</span>g<span class="token punctuation">.</span>visited<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//关键！每次一个node想要进来的时候都把visited数组变成0</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>g<span class="token punctuation">.</span><span class="token function">peidui</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span><span class="token punctuation">)</span>ans<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-cpp line-numbers-mode" data-ext="cpp" data-title="cpp"><pre class="language-cpp"><code><span class="token keyword">class</span> <span class="token class-name">Graph</span><span class="token punctuation">{</span>

<span class="token keyword">int</span> <span class="token function">peidui</span><span class="token punctuation">(</span>Node <span class="token operator">&amp;</span>n<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span>Edgenode<span class="token operator">*</span> j <span class="token operator">=</span> n<span class="token punctuation">.</span>firstedge<span class="token punctuation">;</span>j<span class="token operator">!=</span><span class="token constant">NULL</span><span class="token punctuation">;</span>j<span class="token operator">=</span>j<span class="token operator">-&gt;</span>next<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>   
            Node <span class="token operator">*</span>nn<span class="token operator">=</span><span class="token constant">NULL</span><span class="token punctuation">;</span>
            <span class="token keyword">int</span> a<span class="token operator">=</span>j<span class="token operator">-&gt;</span>data<span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>visited<span class="token punctuation">[</span>a<span class="token punctuation">]</span><span class="token operator">==</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token keyword">continue</span><span class="token punctuation">;</span>
            visited<span class="token punctuation">[</span>a<span class="token punctuation">]</span><span class="token operator">=</span><span class="token number">1</span><span class="token punctuation">;</span><span class="token comment">//先把它改为已被访问，用于后面的 peidui(*nn)</span>
            <span class="token keyword">for</span><span class="token punctuation">(</span>Node <span class="token operator">&amp;</span>node<span class="token operator">:</span>nodelist<span class="token punctuation">)</span><span class="token keyword">if</span><span class="token punctuation">(</span>node<span class="token punctuation">.</span>target<span class="token operator">==</span>a<span class="token punctuation">)</span>nn<span class="token operator">=</span><span class="token operator">&amp;</span>node<span class="token punctuation">;</span><span class="token comment">//找到a的配对</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span> <span class="token punctuation">(</span><span class="token operator">!</span>match<span class="token punctuation">[</span>a<span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token function">peidui</span><span class="token punctuation">(</span><span class="token operator">*</span>nn<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
            <span class="token comment">//如果match[a]=0，直接占据，如果=1，那么就看看nn能不能给它让出来</span>
            <span class="token comment">//这是因为如果peidui(*nn)里面visited数组没有变，在进入这个函数的时候它之前配对的a已经被设置为1了，</span>
            <span class="token comment">//所以如果这个这次函数还是返回1，那么就是能够找到一个别的edgenode配对。也就是外面这次抢占的是能够成功的</span>
            <span class="token comment">//这可以是一个多次嵌套的过程</span>
            <span class="token punctuation">{</span>
                match<span class="token punctuation">[</span>a<span class="token punctuation">]</span><span class="token operator">=</span>n<span class="token punctuation">.</span>data<span class="token punctuation">;</span>
                n<span class="token punctuation">.</span>target<span class="token operator">=</span>a<span class="token punctuation">;</span><span class="token comment">//target是node配对的edgenode的data，在这里也就是for循环里面的j.data</span>
                <span class="token keyword">return</span> <span class="token number">1</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span><span class="token comment">//返回0表示找不到一个配对。</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>例子： <img src="`+e+'" alt="1" loading="lazy"></p>',18);function i(l,u){return s(),a("div",null,[c,t(" ![1](/assets/images/cover1.jpg) ")])}const k=n(o,[["render",i],["__file","peidui_erfentu.html.vue"]]),m=JSON.parse('{"path":"/posts/ti/peidui_erfentu.html","title":"在图基础上写的配对方法","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2024-06-06T00:00:00.000Z","category":["test"],"comment":true,"description":"在图基础上写的配对方法 使用的是邻接表 每一个Node： Edgenode: Graph: 使用的有向图: 先放一个没加别的扩展的正常的简单的图 之后想要配对，每个node都尽量跟一个edgenode配对，想要配对的最大数量 要考虑新建一个match数组，保存每一个edgenode配对的node是谁。 以及一个visited数组，保存每一个edgeno...","head":[["meta",{"property":"og:url","content":"https://ecrof88.github.io/posts/ti/peidui_erfentu.html"}],["meta",{"property":"og:site_name","content":"ECROF"}],["meta",{"property":"og:title","content":"在图基础上写的配对方法"}],["meta",{"property":"og:description","content":"在图基础上写的配对方法 使用的是邻接表 每一个Node： Edgenode: Graph: 使用的有向图: 先放一个没加别的扩展的正常的简单的图 之后想要配对，每个node都尽量跟一个edgenode配对，想要配对的最大数量 要考虑新建一个match数组，保存每一个edgenode配对的node是谁。 以及一个visited数组，保存每一个edgeno..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://ecrof88.github.io/assets/images/1.jpg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-06T08:23:42.000Z"}],["meta",{"property":"article:author","content":"ECROF"}],["meta",{"property":"article:published_time","content":"2024-06-06T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-06T08:23:42.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"在图基础上写的配对方法\\",\\"image\\":[\\"https://ecrof88.github.io/assets/images/1.jpg\\",\\"https://ecrof88.github.io/assets/images/cover1.jpg\\"],\\"datePublished\\":\\"2024-06-06T00:00:00.000Z\\",\\"dateModified\\":\\"2024-07-06T08:23:42.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"ECROF\\",\\"url\\":\\"https://ecrof88.github.io/\\"}]}"]]},"headers":[{"level":2,"title":"使用的是邻接表","slug":"使用的是邻接表","link":"#使用的是邻接表","children":[]}],"git":{"createdTime":1720254222000,"updatedTime":1720254222000,"contributors":[{"name":"ECROF88","email":"maomao8672@outlook.com","commits":1}]},"readingTime":{"minutes":2.94,"words":883},"filePathRelative":"posts/ti/peidui_erfentu.md","localizedDate":"2024年6月6日","excerpt":"\\n<h2>使用的是邻接表</h2>\\n<p>每一个Node：</p>\\n<div class=\\"language-cpp\\" data-ext=\\"cpp\\" data-title=\\"cpp\\"><pre class=\\"language-cpp\\"><code><span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Node</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">public</span><span class=\\"token operator\\">:</span>\\n    <span class=\\"token keyword\\">int</span> data<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">int</span> target<span class=\\"token punctuation\\">;</span>\\n    Edgenode <span class=\\"token operator\\">*</span>firstedge<span class=\\"token punctuation\\">;</span><span class=\\"token comment\\">//一个Node所有的边</span>\\n<span class=\\"token keyword\\">public</span><span class=\\"token operator\\">:</span>\\n    <span class=\\"token function\\">Node</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">int</span> data<span class=\\"token punctuation\\">)</span>\\n    <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">this</span><span class=\\"token operator\\">-&gt;</span>data <span class=\\"token operator\\">=</span> data<span class=\\"token punctuation\\">;</span>\\n        firstedge<span class=\\"token operator\\">=</span><span class=\\"token constant\\">NULL</span><span class=\\"token punctuation\\">;</span>\\n        target<span class=\\"token operator\\">=</span><span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token keyword\\">bool</span> <span class=\\"token keyword\\">operator</span><span class=\\"token operator\\">==</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">const</span> Node <span class=\\"token operator\\">&amp;</span>n<span class=\\"token punctuation\\">)</span> <span class=\\"token comment\\">//用于后面的std::find(),重载==运算符用于比较</span>\\n    <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">return</span> <span class=\\"token keyword\\">this</span><span class=\\"token operator\\">-&gt;</span>data<span class=\\"token operator\\">==</span>n<span class=\\"token punctuation\\">.</span>data<span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n</code></pre></div>","autoDesc":true}');export{k as comp,m as data};