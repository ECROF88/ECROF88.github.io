import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as s,c as a,f as e}from"./app-BWRRY6CT.js";const t={},p=e(`<h1 id="a-simple-map" tabindex="-1"><a class="header-anchor" href="#a-simple-map"><span>A Simple Map</span></a></h1><h4 id="实现了基本的增删改查" tabindex="-1"><a class="header-anchor" href="#实现了基本的增删改查"><span>实现了基本的增删改查</span></a></h4><div class="language-c++ line-numbers-mode" data-ext="c++" data-title="c++"><pre class="language-c++"><code>template &lt;typename KeyType, typename ValueType&gt;
class Map
{
private:
    vector&lt;pair&lt;KeyType, ValueType&gt;&gt; pairs;
public:
    void insert(KeyType key, ValueType value)
    {   
        // cout&lt;&lt;key&lt;&lt;&quot; &quot;&lt;&lt;value&lt;&lt;endl;
        for(auto i:pairs)
        {
            if(i.first==key)
            {
                cout&lt;&lt;&quot;Key already exists&quot;&lt;&lt;endl;
                return;
            }
        }
        pair&lt;KeyType,ValueType&gt; p(key,value);
        pairs.push_back(p);
    }
    void output()
    {
        for(auto i:pairs)
        {   
            cout&lt;&lt;i.first&lt;&lt;&quot; &quot;&lt;&lt;i.second&lt;&lt;endl;
        }
    }
    void remove(KeyType key)
    {
        // for(auto i=pairs.begin();i!=pairs.end();i++)
        // {
        //     if(i-&gt;first==key)
        //     {
        //         pairs.erase(i);
        //     }
        // }
        //std::remove_if函数并不直接删除元素，而是将不满足条件的元素移到容器的末尾，
        // 并返回一个迭代器，指向第一个不满足条件的元素。
        // 然后你可以使用容器的erase方法来删除这些元素。
        pairs.erase(std::remove_if(pairs.begin(), pairs.end(), [&amp;](const auto&amp; pair) {
            return pair.first == key;
        }), pairs.end());
    }
    ValueType get(KeyType key)
    {   
        if(pairs.size()==0)
        {
            cout&lt;&lt;&quot;Map is empty&quot;&lt;&lt;endl;
            return -1;
        }
        for(auto i:pairs)
        {
            if(i.first==key)
            {
                return i.second;
            }
        }
        cout&lt;&lt;&quot;Key not found&quot;&lt;&lt;endl;
        return pairs.end()-&gt;second;
    }
    int size()
    {
        return pairs.size();
    }
};
int main()
{
    Map&lt;string,int&gt; mymap;
    for(auto i = &#39;a&#39;;i&lt;&#39;f&#39;;i++)
    {   
        mymap.insert(string(1,i),i);
    }
    string s=string(1,&#39;b&#39;);
    mymap.output();//a 97 b 98 c 99 d 100 e 101
    cout&lt;&lt;&quot;map_size:&quot;&lt;&lt;mymap.size()&lt;&lt;endl;//5
    cout&lt;&lt;&quot;find key &#39;b&#39;:&quot;&lt;&lt;mymap.get(&quot;b&quot;)&lt;&lt;endl;//98
    mymap.remove(&quot;b&quot;);
    mymap.output();//a 97 c 99 d 100 e 101
    cout&lt;&lt;&quot;map_size:&quot;&lt;&lt;mymap.size()&lt;&lt;endl;//4
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-cpp line-numbers-mode" data-ext="cpp" data-title="cpp"><pre class="language-cpp"><code><span class="token keyword">template</span> <span class="token operator">&lt;</span><span class="token keyword">typename</span> <span class="token class-name">KeyType</span><span class="token punctuation">,</span> <span class="token keyword">typename</span> <span class="token class-name">ValueType</span><span class="token operator">&gt;</span> 
不能写成
<span class="token keyword">template</span> <span class="token operator">&lt;</span>KeyType<span class="token punctuation">,</span> ValueType<span class="token operator">&gt;</span>
在 C<span class="token operator">++</span> 中，<span class="token keyword">typename</span> 关键字通常用于告诉编译器模板参数是一个类型。
当你在模板中使用某个类型时，编译器需要知道这个名字代表一个类型而不是其他东西，比如一个静态成员或者一个函数。
在模板定义中，<span class="token keyword">typename</span> 用于声明一个类型参数。如果不使用 <span class="token keyword">typename</span>，编译器可能会将其解释为非类型的东西，导致编译错误。
在某些情况下，<span class="token keyword">typename</span> 可以省略。例如，在模板的参数列表中，不需要 <span class="token keyword">typename</span>：
<span class="token keyword">template</span> <span class="token operator">&lt;</span><span class="token keyword">typename</span> <span class="token class-name">T</span><span class="token operator">&gt;</span>
<span class="token keyword">void</span> <span class="token function">print</span><span class="token punctuation">(</span>T value<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// T 是一个类型，这里不需要使用 typename</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> value <span class="token operator">&lt;&lt;</span> std<span class="token double-colon punctuation">::</span>endl<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
然而，在模板的函数体内，如果你要使用模板参数作为一个类型，你必须在其前面加上<span class="token keyword">typename</span><span class="token operator">:</span>
<span class="token keyword">template</span> <span class="token operator">&lt;</span><span class="token keyword">typename</span> <span class="token class-name">T</span><span class="token operator">&gt;</span>
<span class="token keyword">void</span> <span class="token function">print</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 这里需要使用 typename</span>
    <span class="token keyword">typename</span> <span class="token class-name">T</span><span class="token double-colon punctuation">::</span>iterator it<span class="token punctuation">;</span>
    <span class="token comment">// 使用 it</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="lambda表达式" tabindex="-1"><a class="header-anchor" href="#lambda表达式"><span>lambda表达式</span></a></h3><div class="language-cpp line-numbers-mode" data-ext="cpp" data-title="cpp"><pre class="language-cpp"><code><span class="token punctuation">[</span>capture clause<span class="token punctuation">]</span><span class="token punctuation">(</span>parameter list<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token keyword">return</span> type <span class="token punctuation">{</span>
    <span class="token comment">// 函数体</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

捕获子句 <span class="token punctuation">(</span>capture clause<span class="token punctuation">)</span><span class="token operator">:</span> 指定 lambda 表达式可以访问的外部变量。
参数列表 <span class="token punctuation">(</span>parameter list<span class="token punctuation">)</span><span class="token operator">:</span> 定义函数的参数，类似于普通函数。
返回类型 <span class="token punctuation">(</span><span class="token keyword">return</span> type<span class="token punctuation">)</span><span class="token operator">:</span> 可选，可以由编译器自动推导。
函数体 <span class="token punctuation">(</span>function body<span class="token punctuation">)</span><span class="token operator">:</span> 包含函数的实际代码。
捕获子句
<span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token operator">:</span> 不捕获任何外部变量。
<span class="token punctuation">[</span><span class="token operator">=</span><span class="token punctuation">]</span><span class="token operator">:</span> 按值捕获所有外部变量。
<span class="token punctuation">[</span><span class="token operator">&amp;</span><span class="token punctuation">]</span><span class="token operator">:</span> 按引用捕获所有外部变量。
<span class="token punctuation">[</span>a<span class="token punctuation">,</span> <span class="token operator">&amp;</span>b<span class="token punctuation">]</span><span class="token operator">:</span> 按值捕获 a，按引用捕获 b。

Example<span class="token operator">:</span>
std<span class="token double-colon punctuation">::</span>vector data <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">,</span> <span class="token number">4</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7</span><span class="token punctuation">,</span> <span class="token number">8</span><span class="token punctuation">,</span> <span class="token number">9</span><span class="token punctuation">,</span> <span class="token number">10</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">auto</span> new_end <span class="token operator">=</span> std<span class="token double-colon punctuation">::</span><span class="token function">remove_if</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span><span class="token function">begin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> data<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token keyword">int</span> x<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> x <span class="token operator">%</span> <span class="token number">2</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
这里<span class="token operator">*</span>new_end是<span class="token number">6.</span>

当然，remove_if并不会真的像erase一样删除<span class="token punctuation">,</span>只是把符合条件的放在末尾了
也就是<span class="token operator">:</span>
<span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token keyword">auto</span> it <span class="token operator">=</span> data<span class="token punctuation">.</span><span class="token function">begin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> it <span class="token operator">!=</span> data<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token operator">++</span>it<span class="token punctuation">)</span> 
<span class="token punctuation">{</span>
    std<span class="token double-colon punctuation">::</span>cout <span class="token operator">&lt;&lt;</span> <span class="token operator">*</span>it <span class="token operator">&lt;&lt;</span> <span class="token string">&quot; &quot;</span><span class="token punctuation">;</span><span class="token comment">//1 3 5 7 9 6 7 8 9 10</span>
<span class="token punctuation">}</span>
后面的<span class="token number">5</span>位并不会变，当然前面<span class="token number">1</span> <span class="token number">2</span> <span class="token number">3</span> <span class="token number">4</span> <span class="token number">5</span>被覆盖了。
所以想要只保留<span class="token number">1</span> <span class="token number">3</span> <span class="token number">5</span> <span class="token number">7</span> <span class="token number">9</span>：
data<span class="token punctuation">.</span><span class="token function">erase</span><span class="token punctuation">(</span>std<span class="token double-colon punctuation">::</span><span class="token function">remove_if</span><span class="token punctuation">(</span>data<span class="token punctuation">.</span><span class="token function">begin</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> data<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">(</span><span class="token keyword">int</span> x<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> x <span class="token operator">%</span> <span class="token number">2</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span>data<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">//删除从new_end开始到结尾。</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6),i=[p];function l(o,c){return s(),a("div",null,i)}const d=n(t,[["render",l],["__file","a_simple_map.html.vue"]]),m=JSON.parse(`{"path":"/zh/posts/ti/a_simple_map.html","title":"A Simple Map","lang":"zh-CN","frontmatter":{"icon":"pen-to-square","date":"2024-04-06T00:00:00.000Z","category":["题"],"comment":true,"description":"A Simple Map 实现了基本的增删改查 lambda表达式","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/zh/posts/ti/a_simple_map.html"}],["meta",{"property":"og:site_name","content":"ECROF"}],["meta",{"property":"og:title","content":"A Simple Map"}],["meta",{"property":"og:description","content":"A Simple Map 实现了基本的增删改查 lambda表达式"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-05-02T07:31:41.000Z"}],["meta",{"property":"article:author","content":"ECROF"}],["meta",{"property":"article:published_time","content":"2024-04-06T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-05-02T07:31:41.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"A Simple Map\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-04-06T00:00:00.000Z\\",\\"dateModified\\":\\"2024-05-02T07:31:41.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"ECROF\\",\\"url\\":\\"https://ecrof88.github.io/\\"}]}"]]},"headers":[{"level":3,"title":"lambda表达式","slug":"lambda表达式","link":"#lambda表达式","children":[]}],"git":{"createdTime":1714634023000,"updatedTime":1714635101000,"contributors":[{"name":"ECROF88","email":"maomao8672@outlook.com","commits":3}]},"readingTime":{"minutes":2.69,"words":806},"filePathRelative":"zh/posts/ti/a_simple_map.md","localizedDate":"2024年4月6日","excerpt":"\\n<h4>实现了基本的增删改查</h4>\\n<div class=\\"language-c++\\" data-ext=\\"c++\\" data-title=\\"c++\\"><pre class=\\"language-c++\\"><code>template &lt;typename KeyType, typename ValueType&gt;\\nclass Map\\n{\\nprivate:\\n    vector&lt;pair&lt;KeyType, ValueType&gt;&gt; pairs;\\npublic:\\n    void insert(KeyType key, ValueType value)\\n    {   \\n        // cout&lt;&lt;key&lt;&lt;\\" \\"&lt;&lt;value&lt;&lt;endl;\\n        for(auto i:pairs)\\n        {\\n            if(i.first==key)\\n            {\\n                cout&lt;&lt;\\"Key already exists\\"&lt;&lt;endl;\\n                return;\\n            }\\n        }\\n        pair&lt;KeyType,ValueType&gt; p(key,value);\\n        pairs.push_back(p);\\n    }\\n    void output()\\n    {\\n        for(auto i:pairs)\\n        {   \\n            cout&lt;&lt;i.first&lt;&lt;\\" \\"&lt;&lt;i.second&lt;&lt;endl;\\n        }\\n    }\\n    void remove(KeyType key)\\n    {\\n        // for(auto i=pairs.begin();i!=pairs.end();i++)\\n        // {\\n        //     if(i-&gt;first==key)\\n        //     {\\n        //         pairs.erase(i);\\n        //     }\\n        // }\\n        //std::remove_if函数并不直接删除元素，而是将不满足条件的元素移到容器的末尾，\\n        // 并返回一个迭代器，指向第一个不满足条件的元素。\\n        // 然后你可以使用容器的erase方法来删除这些元素。\\n        pairs.erase(std::remove_if(pairs.begin(), pairs.end(), [&amp;](const auto&amp; pair) {\\n            return pair.first == key;\\n        }), pairs.end());\\n    }\\n    ValueType get(KeyType key)\\n    {   \\n        if(pairs.size()==0)\\n        {\\n            cout&lt;&lt;\\"Map is empty\\"&lt;&lt;endl;\\n            return -1;\\n        }\\n        for(auto i:pairs)\\n        {\\n            if(i.first==key)\\n            {\\n                return i.second;\\n            }\\n        }\\n        cout&lt;&lt;\\"Key not found\\"&lt;&lt;endl;\\n        return pairs.end()-&gt;second;\\n    }\\n    int size()\\n    {\\n        return pairs.size();\\n    }\\n};\\nint main()\\n{\\n    Map&lt;string,int&gt; mymap;\\n    for(auto i = 'a';i&lt;'f';i++)\\n    {   \\n        mymap.insert(string(1,i),i);\\n    }\\n    string s=string(1,'b');\\n    mymap.output();//a 97 b 98 c 99 d 100 e 101\\n    cout&lt;&lt;\\"map_size:\\"&lt;&lt;mymap.size()&lt;&lt;endl;//5\\n    cout&lt;&lt;\\"find key 'b':\\"&lt;&lt;mymap.get(\\"b\\")&lt;&lt;endl;//98\\n    mymap.remove(\\"b\\");\\n    mymap.output();//a 97 c 99 d 100 e 101\\n    cout&lt;&lt;\\"map_size:\\"&lt;&lt;mymap.size()&lt;&lt;endl;//4\\n}\\n</code></pre></div>","autoDesc":true}`);export{d as comp,m as data};
