import{d as B,u as G,r as i,j as C,o as b,k as g,l as A,c as n,a,w as s,V as S,F as V,b as l,_ as I,e as N,m as r,n as T,i as y,t as h,p as E,q as k,s as v,v as F,x as M,y as R,z as $,A as j}from"./index-ef8059a2.js";import{u as q,G as z}from"./GoBackButton-fdd07857.js";const D={key:1},J=B({__name:"GifsView",setup(L){const x=G(),d=q(),f=i(null),t=i({id:"1",url:"",title:"",images:{original:{url:""},fixed_height:{url:""},fixed_height_still:{url:""}}}),c=i([]);return C(()=>x.params.gifId,async o=>{t.value=await g.fetchGifById(o),d.lastGifId=t.value.id,d.user=t.value.user},{immediate:!0}),b(async()=>{var o;for(let u=0;u<50;u++)(o=c.value)==null||o.push(await g.fetchRandomGif())}),(o,u)=>{const w=A("router-link");return l(),n(V,null,[a(I),a(S,null,{default:s(()=>[a(N,{fluid:""},{default:s(()=>{var m;return[a(z,{block:""}),(m=t.value)!=null&&m.id?(l(),r(F,{key:0,class:"bg-background",flat:""},{default:s(()=>[a(T,{class:"px-0"},{default:s(()=>{var e;return[y("h1",null,h((e=t.value)==null?void 0:e.title),1)]}),_:1}),a(E,{class:"px-0"},{default:s(()=>{var e;return[a(k,{gif:t.value,original:"",shareable:""},null,8,["gif"]),y("p",null,[v(" Added by: "),(e=t.value)!=null&&e.user?(l(),r(w,{key:0,to:"/user"},{default:s(()=>{var p,_;return[v(h((_=(p=t.value)==null?void 0:p.user)==null?void 0:_.username),1)]}),_:1})):(l(),n("span",D,"Anonym"))])]}),_:1})]),_:1})):(l(),r($,{key:1,class:"mx-auto my-5",type:"error",title:"Error!",text:"Gif not found.","max-width":"300"})),a(M,{modelValue:f.value,"onUpdate:modelValue":u[0]||(u[0]=e=>f.value=e),"show-arrows":""},{default:s(()=>[(l(!0),n(V,null,R(c.value,e=>(l(),r(j,{key:e.id},{default:s(()=>[a(k,{class:"ma-4",gif:e,to:/gifs/+e.id},null,8,["gif","to"])]),_:2},1024))),128))]),_:1},8,["modelValue"])]}),_:1})]),_:1})],64)}}});export{J as default};
