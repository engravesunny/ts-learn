var e;!function(e){e.expire="_expire_",e.permanent="permanent"}(e||(e={}));class t{get(t){const a=localStorage.getItem(t),r=JSON.parse(a);if(a){const a=(new Date).getTime();return"number"==typeof r[e.expire]&&r[e.expire]<a?(this.remove(t),{message:`${t}已过期`,value:null}):{message:"读取成功",value:r.value}}return console.warn("key值无效"),{message:`${t}无效`,value:null}}set(t,a,r=e.permanent){const l=JSON.stringify({value:a,[e.expire]:r});localStorage.setItem(t,l)}remove(e){localStorage.getItem(e)&&localStorage.removeItem(e)}clear(){localStorage.clear()}}export{t as Storage};
//# sourceMappingURL=index.js.map
