import{_ as s,o as n,c as e,a2 as p}from"./chunks/framework.BWuWLRhz.js";const h=JSON.parse('{"title":"Async & Await","description":"","frontmatter":{},"headers":[],"relativePath":"guide/async.md","filePath":"guide/async.md"}'),t={name:"guide/async.md"};function o(i,a,l,c,r,d){return n(),e("div",null,[...a[0]||(a[0]=[p(`<h1 id="async-await" tabindex="-1">Async &amp; Await <a class="header-anchor" href="#async-await" aria-label="Permalink to &quot;Async &amp; Await&quot;">​</a></h1><p>JugaadLang supports top-level async and promises out of the box!</p><h2 id="async-functions" tabindex="-1">Async Functions <a class="header-anchor" href="#async-functions" aria-label="Permalink to &quot;Async Functions&quot;">​</a></h2><ul><li><code>tez</code> - Maps to <code>async</code></li><li><code>intezaar</code> - Maps to <code>await</code></li></ul><div class="language-jug vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jug</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>tez banao dataLao():</span></span>
<span class="line"><span>    rakho data = intezaar Vaada.resolve(&quot;API Data&quot;)</span></span>
<span class="line"><span>    wapas data</span></span>
<span class="line"><span></span></span>
<span class="line"><span>tez banao run():</span></span>
<span class="line"><span>    rakho result = intezaar dataLao()</span></span>
<span class="line"><span>    bolo(result)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>intezaar run()</span></span></code></pre></div><h2 id="promises" tabindex="-1">Promises <a class="header-anchor" href="#promises" aria-label="Permalink to &quot;Promises&quot;">​</a></h2><p>The global <code>Promise</code> object is aliased to <code>Vaada</code>.</p><div class="language-jug vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jug</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>rakho meraVaada = naya Vaada(banao(resolve, reject):</span></span>
<span class="line"><span>    resolve(&quot;Ho gaya!&quot;)</span></span>
<span class="line"><span>)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>meraVaada.then(banao(res):</span></span>
<span class="line"><span>    bolo(res)</span></span>
<span class="line"><span>)</span></span></code></pre></div>`,8)])])}const m=s(t,[["render",o]]);export{h as __pageData,m as default};
