!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=4)}({4:function(e,t,r){"use strict";r.r(t),r.d(t,"id",(function(){return s})),r.d(t,"peer",(function(){return f}));let n,o=document.querySelector("#player"),c=document.querySelector("#start"),l=document.querySelector("#stop"),u=document.querySelector("#connect"),a=document.querySelector("#peerid");c.addEventListener("click",e=>{!async function(){try{if(n)return;n=await navigator.mediaDevices.getDisplayMedia(i),o.srcObject=n,f.connections&&Object.keys(f.connections).forEach(e=>{f.call(e,n)})}catch(e){console.error("Error: "+e)}}()}),l.addEventListener("click",e=>{!function(e){if(!n)return;o.srcObject.getTracks().forEach(e=>e.stop()),o.srcObject=null,n=null}()}),u.addEventListener("click",e=>{if(a.value===s)return a.value="";f.connect(a.value),a.value=""});let i={video:{cursor:"always",framerate:{ideal:60,max:60}},audio:!0};let d="DEF1G2OPQ23RS3TUV5564MN1OPQ23RS3TU3RS3TUV5564MN1V55WXYZ".toLowerCase()+"DEF1G2OPQ23RS3TUV5564MN1OPQ23RS3TU3RS3TUV5564MN1V55WXYZ",s="";for(let e=0;e<15;e++)s+=d[Math.floor(Math.random()*d.length)];document.querySelector("#mypeerid").textContent="Ваш id: "+s;let f=new Peer(s,{host:location.hostname,port:location.port||("https:"===location.protocol?443:80),path:"/peer"});f.on("connection",e=>{n&&f.call(e.peer,n)}),f.on("call",e=>{e.answer(),e.on("stream",e=>{o.srcObject=e})}),f.on("error",e=>{console.log(e)})}});