if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let l={};const o=e=>i(e,t),u={module:{uri:t},exports:l,require:o};s[t]=Promise.all(n.map((e=>u[e]||o(e)))).then((e=>(r(...e),l)))}}define(["./workbox-9517df1b"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/GifsView-00162140.js",revision:null},{url:"assets/GoBackButton-7b31fb9b.js",revision:null},{url:"assets/index-9ca4de20.js",revision:null},{url:"assets/index-a0b26126.css",revision:null},{url:"assets/UserView-19243352.js",revision:null},{url:"index.html",revision:"066f6c31035290aad040c759ff33233c"},{url:"registerSW.js",revision:"6f644ba6ef6e5b59c79fe9c328078a96"},{url:"manifest.webmanifest",revision:"2e6f7c78aba1ff3a18ce1fc8738d0836"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
