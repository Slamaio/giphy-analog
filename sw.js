if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let o={};const l=e=>i(e,t),f={module:{uri:t},exports:o,require:l};s[t]=Promise.all(n.map((e=>f[e]||l(e)))).then((e=>(r(...e),o)))}}define(["./workbox-9517df1b"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/GifsView-ff359c0a.js",revision:null},{url:"assets/GoBackButtonComponent-4b31fa09.js",revision:null},{url:"assets/index-851e360e.js",revision:null},{url:"assets/index-bfd7717e.css",revision:null},{url:"assets/UserView-42a0a5aa.js",revision:null},{url:"index.html",revision:"d3fc5e469dca11ddcb9f7c46f44d09ca"},{url:"registerSW.js",revision:"6f644ba6ef6e5b59c79fe9c328078a96"},{url:"manifest.webmanifest",revision:"2e6f7c78aba1ff3a18ce1fc8738d0836"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
