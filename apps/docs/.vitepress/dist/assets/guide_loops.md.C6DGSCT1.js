import{_ as s,o as n,c as o,a2 as e}from"./chunks/framework.BWuWLRhz.js";const u=JSON.parse('{"title":"Loops","description":"","frontmatter":{},"headers":[],"relativePath":"guide/loops.md","filePath":"guide/loops.md"}'),p={name:"guide/loops.md"};function i(l,a,t,d,r,c){return n(),o("div",null,[...a[0]||(a[0]=[e(`<h1 id="loops" tabindex="-1">Loops <a class="header-anchor" href="#loops" aria-label="Permalink to &quot;Loops&quot;">​</a></h1><p>Iterating in JugaadLang is intuitive and fun.</p><h2 id="standard-for-loop" tabindex="-1">Standard For Loop <a class="header-anchor" href="#standard-for-loop" aria-label="Permalink to &quot;Standard For Loop&quot;">​</a></h2><ul><li><code>ghumo</code> - Maps to <code>for</code></li></ul><div class="language-jug vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jug</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ghumo rakho i = 0; i &lt; 5; i++:</span></span>
<span class="line"><span>    bolo(&quot;Ghoom raha hai: &quot; + i)</span></span></code></pre></div><h2 id="for-of-and-for-in" tabindex="-1">For...of and For...in <a class="header-anchor" href="#for-of-and-for-in" aria-label="Permalink to &quot;For...of and For...in&quot;">​</a></h2><p>Iterate over arrays and objects easily:</p><div class="language-jug vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jug</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>rakho dost = [&quot;Raju&quot;, &quot;Shyam&quot;, &quot;Babu Rao&quot;]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ghumo rakho naam ka dost:</span></span>
<span class="line"><span>    bolo(naam)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>rakho paise = { raju: 10, shyam: 20 }</span></span>
<span class="line"><span>ghumo rakho k mein paise:</span></span>
<span class="line"><span>    bolo(k + &quot; = &quot; + paise[k])</span></span></code></pre></div><h2 id="while-loops" tabindex="-1">While Loops <a class="header-anchor" href="#while-loops" aria-label="Permalink to &quot;While Loops&quot;">​</a></h2><ul><li><code>jabtak</code> - Maps to <code>while</code></li><li><code>karo</code> - Maps to <code>do</code></li></ul><div class="language-jug vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jug</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>rakho i = 0</span></span>
<span class="line"><span>jabtak i &lt; 5:</span></span>
<span class="line"><span>    bolo(i)</span></span>
<span class="line"><span>    i++</span></span>
<span class="line"><span></span></span>
<span class="line"><span>karo:</span></span>
<span class="line"><span>    bolo(&quot;Ek baar to chalega&quot;)</span></span>
<span class="line"><span>jabtak i &lt; 0</span></span></code></pre></div>`,11)])])}const g=s(p,[["render",i]]);export{u as __pageData,g as default};
