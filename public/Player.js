!function(e){var t={};function r(i){if(t[i])return t[i].exports;var n=t[i]={i:i,l:!1,exports:{}};return e[i].call(n.exports,n,n.exports,r),n.l=!0,n.exports}r.m=e,r.c=t,r.d=function(e,t,i){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(r.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(i,n,function(t){return e[t]}.bind(null,n));return i},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";r.r(t),r.d(t,"default",(function(){return n}));var i=r(2);class n{constructor(e,t){this.parsers=[{parser:this.isThread,action:this.loadThread},{parser:this.isVideo,action:this.setVideo}],this.playerElem=e,this.listElem=t,this.room=new i.default,this.listeners=[]}addEventListener(e,t){this.listeners.push({event:e,cb:t})}emit(e,...t){this.listeners.forEach((r,i)=>{r.event===e&&r.cb(...t)})}setVolume(e){this.playerElem.volume=e||1}loadFromEvent(e){try{e=new URL(e)}catch(e){throw e}let t=!1;this.parsers.forEach((r,i)=>{if(t)return null;let n=r.parser,o=r.action;n.call(this,e)&&(t=!0,o.call(this,e))})}isThread(e){return e.href.match(/2ch.hk\/[A-z]{1,}\/res\/[0-9]*.\.html/)}isVideo(e){return e.href.match(/.*(mp4|webm)/)}async fetchVideos(e){return fetch("/api/getvideos",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:e})}).catch(e=>console.log(e)).then(e=>e.json().then(e=>(localStorage.setItem("videos",JSON.stringify(e)),e)))}async renderList(e){this.listElem.textContent="",e.forEach(async e=>{let t=document.createElement("a"),r=document.createElement("img");t.className="preview",t.href=e.video,r.src=e.preview,r.loading="lazy",t.appendChild(r),this.listElem.appendChild(t),t.onclick=t=>{t.preventDefault(),t.target.className="viewed",this.setVideo.call(this,e.video)},await new Promise(async e=>{setTimeout(e,100)})})}loadFromLocalStorage(){let e;(e=localStorage.getItem("videos"))&&(e=JSON.parse(e),this.renderList.call(this,e))}async loadThread(e){console.log("loadthread");let t=await this.fetchVideos.call(this,e);return await this.renderList.call(this,t)}setVideo(e){try{e=new URL(e),this.room.setRoomVideo(e),this.playerElem.src=e.href,this.emit("videochanged",e)}catch(e){throw new Error("Ошибка при смене адреса видео")}}setVideoNotManually(e){try{e=new URL(e),this.playerElem.src=e.href}catch(e){throw new Error("Ошибка при смене адреса видео")}}async init(){let e=await this.room.fetchRoomByName();this.setVideoNotManually(e.video)}play(e=!1){return e&&(n.stopPausePlayEvents=!0),this.playerElem.play()}pause(e=!1){return e&&(n.stopPausePlayEvents=!0),this.playerElem.pause()}currentTime(){return this.playerElem.currentTime}setTime(e){return this.playerElem.currentTime=e}}},,function(e,t,r){"use strict";r.r(t),r.d(t,"default",(function(){return i}));class i{constructor(e="main"){this.name=this.extractNameFromLocation()||"main"}extractNameFromLocation(){let e=window.location.href.match(/room\/([0-9]*)/);return e?e[1]:null}async fetchRoomByName(){let e=this.name,t=await fetch("/api/getRoomByName",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:e})});return await t.json()}async setRoomVideo(e){let t=this.name,r=await fetch("/api/setRoomVideo",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t,url:e})});return await r.json()}}}]);