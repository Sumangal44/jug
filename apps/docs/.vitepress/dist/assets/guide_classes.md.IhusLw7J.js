import{_ as s,o as n,c as e,a2 as l}from"./chunks/framework.BWuWLRhz.js";const h=JSON.parse('{"title":"Classes","description":"","frontmatter":{},"headers":[],"relativePath":"guide/classes.md","filePath":"guide/classes.md"}'),p={name:"guide/classes.md"};function t(o,a,i,c,d,u){return n(),e("div",null,[...a[0]||(a[0]=[l(`<h1 id="classes" tabindex="-1">Classes <a class="header-anchor" href="#classes" aria-label="Permalink to &quot;Classes&quot;">​</a></h1><p>Object-Oriented Programming is fully supported using standard ECMAScript 2026 class syntax.</p><h2 id="class-definition" tabindex="-1">Class Definition <a class="header-anchor" href="#class-definition" aria-label="Permalink to &quot;Class Definition&quot;">​</a></h2><ul><li><code>ustad</code> - Maps to <code>class</code></li><li><code>shuru</code> - Maps to <code>constructor</code></li><li><code>khud</code> - Maps to <code>this</code></li></ul><div class="language-jug vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jug</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ustad Insaan:</span></span>
<span class="line"><span>    banao shuru(naam):</span></span>
<span class="line"><span>        khud.naam = naam</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>    banao hello():</span></span>
<span class="line"><span>        bolo(&quot;Namaste, mera naam &quot; + khud.naam + &quot; hai.&quot;)</span></span></code></pre></div><h2 id="inheritance" tabindex="-1">Inheritance <a class="header-anchor" href="#inheritance" aria-label="Permalink to &quot;Inheritance&quot;">​</a></h2><ul><li><code>virasat</code> - Maps to <code>extends</code></li><li><code>maha_ustad</code> - Maps to <code>super</code></li></ul><div class="language-jug vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">jug</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>ustad Developer virasat Insaan:</span></span>
<span class="line"><span>    banao shuru(naam, bhasha):</span></span>
<span class="line"><span>        maha_ustad(naam)</span></span>
<span class="line"><span>        khud.bhasha = bhasha</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    banao code():</span></span>
<span class="line"><span>        bolo(&quot;Main &quot; + khud.bhasha + &quot; mein code karta hu.&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>rakho dev = naya Developer(&quot;Sumu&quot;, &quot;JugaadLang&quot;)</span></span>
<span class="line"><span>dev.hello()</span></span>
<span class="line"><span>dev.code()</span></span></code></pre></div>`,8)])])}const m=s(p,[["render",t]]);export{h as __pageData,m as default};
