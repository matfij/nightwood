"use strict";(self.webpackChunknightwood_frontend=self.webpackChunknightwood_frontend||[]).push([[429],{1808:(rt,Se,$e)=>{class de extends Error{constructor(n){super(`No translation found for ${et(n)}.`),this.parsedMessage=n,this.type="MissingTranslationError"}}const Ae=function(r,...n){if(Ae.translate){const u=Ae.translate(r,n);r=u[0],n=u[1]}let c=mt(r[0],r.raw[0]);for(let u=1;u<r.length;u++)c+=n[u-1]+mt(r[u],r.raw[u]);return c};function mt(r,n){return":"===n.charAt(0)?r.substring(function ht(r,n){for(let c=1,u=1;c<r.length;c++,u++)if("\\"===n[u])u++;else if(":"===r[c])return c;throw new Error(`Unterminated $localize metadata block in "${n}".`)}(r,n)+1):r}(()=>typeof globalThis<"u"&&globalThis||typeof global<"u"&&global||typeof window<"u"&&window||typeof self<"u"&&typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope&&self)().$localize=Ae,$e(8583)},8583:()=>{!function(e){const o=e.performance;function l(H){o&&o.mark&&o.mark(H)}function s(H,k){o&&o.measure&&o.measure(H,k)}l("Zone");const f=e.__Zone_symbol_prefix||"__zone_symbol__";function p(H){return f+H}const g=!0===e[p("forceDuplicateZoneCheck")];if(e.Zone){if(g||"function"!=typeof e.Zone.__symbol__)throw new Error("Zone already loaded.");return e.Zone}let y=(()=>{class H{constructor(t,i){this._parent=t,this._name=i?i.name||"unnamed":"<root>",this._properties=i&&i.properties||{},this._zoneDelegate=new w(this,this._parent&&this._parent._zoneDelegate,i)}static assertZonePatched(){if(e.Promise!==fe.ZoneAwarePromise)throw new Error("Zone.js has detected that ZoneAwarePromise `(window|global).Promise` has been overwritten.\nMost likely cause is that a Promise polyfill has been loaded after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. If you must load one, do so before loading zone.js.)")}static get root(){let t=H.current;for(;t.parent;)t=t.parent;return t}static get current(){return X.zone}static get currentTask(){return ge}static __load_patch(t,i,P=!1){if(fe.hasOwnProperty(t)){if(!P&&g)throw Error("Already loaded patch: "+t)}else if(!e["__Zone_disable_"+t]){const C="Zone:"+t;l(C),fe[t]=i(e,H,Ne),s(C,C)}}get parent(){return this._parent}get name(){return this._name}get(t){const i=this.getZoneWith(t);if(i)return i._properties[t]}getZoneWith(t){let i=this;for(;i;){if(i._properties.hasOwnProperty(t))return i;i=i._parent}return null}fork(t){if(!t)throw new Error("ZoneSpec required!");return this._zoneDelegate.fork(this,t)}wrap(t,i){if("function"!=typeof t)throw new Error("Expecting function got: "+t);const P=this._zoneDelegate.intercept(this,t,i),C=this;return function(){return C.runGuarded(P,this,arguments,i)}}run(t,i,P,C){X={parent:X,zone:this};try{return this._zoneDelegate.invoke(this,t,i,P,C)}finally{X=X.parent}}runGuarded(t,i=null,P,C){X={parent:X,zone:this};try{try{return this._zoneDelegate.invoke(this,t,i,P,C)}catch(ae){if(this._zoneDelegate.handleError(this,ae))throw ae}}finally{X=X.parent}}runTask(t,i,P){if(t.zone!=this)throw new Error("A task can only be run in the zone of creation! (Creation: "+(t.zone||Y).name+"; Execution: "+this.name+")");if(t.state===G&&(t.type===D||t.type===z))return;const C=t.state!=se;C&&t._transitionTo(se,A),t.runCount++;const ae=ge;ge=t,X={parent:X,zone:this};try{t.type==z&&t.data&&!t.data.isPeriodic&&(t.cancelFn=void 0);try{return this._zoneDelegate.invokeTask(this,t,i,P)}catch(d){if(this._zoneDelegate.handleError(this,d))throw d}}finally{t.state!==G&&t.state!==ie&&(t.type==D||t.data&&t.data.isPeriodic?C&&t._transitionTo(A,se):(t.runCount=0,this._updateTaskCount(t,-1),C&&t._transitionTo(G,se,G))),X=X.parent,ge=ae}}scheduleTask(t){if(t.zone&&t.zone!==this){let P=this;for(;P;){if(P===t.zone)throw Error(`can not reschedule task to ${this.name} which is descendants of the original zone ${t.zone.name}`);P=P.parent}}t._transitionTo(oe,G);const i=[];t._zoneDelegates=i,t._zone=this;try{t=this._zoneDelegate.scheduleTask(this,t)}catch(P){throw t._transitionTo(ie,oe,G),this._zoneDelegate.handleError(this,P),P}return t._zoneDelegates===i&&this._updateTaskCount(t,1),t.state==oe&&t._transitionTo(A,oe),t}scheduleMicroTask(t,i,P,C){return this.scheduleTask(new v(R,t,i,P,C,void 0))}scheduleMacroTask(t,i,P,C,ae){return this.scheduleTask(new v(z,t,i,P,C,ae))}scheduleEventTask(t,i,P,C,ae){return this.scheduleTask(new v(D,t,i,P,C,ae))}cancelTask(t){if(t.zone!=this)throw new Error("A task can only be cancelled in the zone of creation! (Creation: "+(t.zone||Y).name+"; Execution: "+this.name+")");t._transitionTo(V,A,se);try{this._zoneDelegate.cancelTask(this,t)}catch(i){throw t._transitionTo(ie,V),this._zoneDelegate.handleError(this,i),i}return this._updateTaskCount(t,-1),t._transitionTo(G,V),t.runCount=0,t}_updateTaskCount(t,i){const P=t._zoneDelegates;-1==i&&(t._zoneDelegates=null);for(let C=0;C<P.length;C++)P[C]._updateTaskCount(t.type,i)}}return H.__symbol__=p,H})();const N={name:"",onHasTask:(H,k,t,i)=>H.hasTask(t,i),onScheduleTask:(H,k,t,i)=>H.scheduleTask(t,i),onInvokeTask:(H,k,t,i,P,C)=>H.invokeTask(t,i,P,C),onCancelTask:(H,k,t,i)=>H.cancelTask(t,i)};class w{constructor(k,t,i){this._taskCounts={microTask:0,macroTask:0,eventTask:0},this.zone=k,this._parentDelegate=t,this._forkZS=i&&(i&&i.onFork?i:t._forkZS),this._forkDlgt=i&&(i.onFork?t:t._forkDlgt),this._forkCurrZone=i&&(i.onFork?this.zone:t._forkCurrZone),this._interceptZS=i&&(i.onIntercept?i:t._interceptZS),this._interceptDlgt=i&&(i.onIntercept?t:t._interceptDlgt),this._interceptCurrZone=i&&(i.onIntercept?this.zone:t._interceptCurrZone),this._invokeZS=i&&(i.onInvoke?i:t._invokeZS),this._invokeDlgt=i&&(i.onInvoke?t:t._invokeDlgt),this._invokeCurrZone=i&&(i.onInvoke?this.zone:t._invokeCurrZone),this._handleErrorZS=i&&(i.onHandleError?i:t._handleErrorZS),this._handleErrorDlgt=i&&(i.onHandleError?t:t._handleErrorDlgt),this._handleErrorCurrZone=i&&(i.onHandleError?this.zone:t._handleErrorCurrZone),this._scheduleTaskZS=i&&(i.onScheduleTask?i:t._scheduleTaskZS),this._scheduleTaskDlgt=i&&(i.onScheduleTask?t:t._scheduleTaskDlgt),this._scheduleTaskCurrZone=i&&(i.onScheduleTask?this.zone:t._scheduleTaskCurrZone),this._invokeTaskZS=i&&(i.onInvokeTask?i:t._invokeTaskZS),this._invokeTaskDlgt=i&&(i.onInvokeTask?t:t._invokeTaskDlgt),this._invokeTaskCurrZone=i&&(i.onInvokeTask?this.zone:t._invokeTaskCurrZone),this._cancelTaskZS=i&&(i.onCancelTask?i:t._cancelTaskZS),this._cancelTaskDlgt=i&&(i.onCancelTask?t:t._cancelTaskDlgt),this._cancelTaskCurrZone=i&&(i.onCancelTask?this.zone:t._cancelTaskCurrZone),this._hasTaskZS=null,this._hasTaskDlgt=null,this._hasTaskDlgtOwner=null,this._hasTaskCurrZone=null;const P=i&&i.onHasTask;(P||t&&t._hasTaskZS)&&(this._hasTaskZS=P?i:N,this._hasTaskDlgt=t,this._hasTaskDlgtOwner=this,this._hasTaskCurrZone=k,i.onScheduleTask||(this._scheduleTaskZS=N,this._scheduleTaskDlgt=t,this._scheduleTaskCurrZone=this.zone),i.onInvokeTask||(this._invokeTaskZS=N,this._invokeTaskDlgt=t,this._invokeTaskCurrZone=this.zone),i.onCancelTask||(this._cancelTaskZS=N,this._cancelTaskDlgt=t,this._cancelTaskCurrZone=this.zone))}fork(k,t){return this._forkZS?this._forkZS.onFork(this._forkDlgt,this.zone,k,t):new y(k,t)}intercept(k,t,i){return this._interceptZS?this._interceptZS.onIntercept(this._interceptDlgt,this._interceptCurrZone,k,t,i):t}invoke(k,t,i,P,C){return this._invokeZS?this._invokeZS.onInvoke(this._invokeDlgt,this._invokeCurrZone,k,t,i,P,C):t.apply(i,P)}handleError(k,t){return!this._handleErrorZS||this._handleErrorZS.onHandleError(this._handleErrorDlgt,this._handleErrorCurrZone,k,t)}scheduleTask(k,t){let i=t;if(this._scheduleTaskZS)this._hasTaskZS&&i._zoneDelegates.push(this._hasTaskDlgtOwner),i=this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt,this._scheduleTaskCurrZone,k,t),i||(i=t);else if(t.scheduleFn)t.scheduleFn(t);else{if(t.type!=R)throw new Error("Task is missing scheduleFn.");T(t)}return i}invokeTask(k,t,i,P){return this._invokeTaskZS?this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt,this._invokeTaskCurrZone,k,t,i,P):t.callback.apply(i,P)}cancelTask(k,t){let i;if(this._cancelTaskZS)i=this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt,this._cancelTaskCurrZone,k,t);else{if(!t.cancelFn)throw Error("Task is not cancelable");i=t.cancelFn(t)}return i}hasTask(k,t){try{this._hasTaskZS&&this._hasTaskZS.onHasTask(this._hasTaskDlgt,this._hasTaskCurrZone,k,t)}catch(i){this.handleError(k,i)}}_updateTaskCount(k,t){const i=this._taskCounts,P=i[k],C=i[k]=P+t;if(C<0)throw new Error("More tasks executed then were scheduled.");0!=P&&0!=C||this.hasTask(this.zone,{microTask:i.microTask>0,macroTask:i.macroTask>0,eventTask:i.eventTask>0,change:k})}}class v{constructor(k,t,i,P,C,ae){if(this._zone=null,this.runCount=0,this._zoneDelegates=null,this._state="notScheduled",this.type=k,this.source=t,this.data=P,this.scheduleFn=C,this.cancelFn=ae,!i)throw new Error("callback is not defined");this.callback=i;const d=this;this.invoke=k===D&&P&&P.useG?v.invokeTask:function(){return v.invokeTask.call(e,d,this,arguments)}}static invokeTask(k,t,i){k||(k=this),ke++;try{return k.runCount++,k.zone.runTask(k,t,i)}finally{1==ke&&$(),ke--}}get zone(){return this._zone}get state(){return this._state}cancelScheduleRequest(){this._transitionTo(G,oe)}_transitionTo(k,t,i){if(this._state!==t&&this._state!==i)throw new Error(`${this.type} '${this.source}': can not transition to '${k}', expecting state '${t}'${i?" or '"+i+"'":""}, was '${this._state}'.`);this._state=k,k==G&&(this._zoneDelegates=null)}toString(){return this.data&&typeof this.data.handleId<"u"?this.data.handleId.toString():Object.prototype.toString.call(this)}toJSON(){return{type:this.type,state:this.state,source:this.source,zone:this.zone.name,runCount:this.runCount}}}const x=p("setTimeout"),L=p("Promise"),j=p("then");let b,J=[],q=!1;function T(H){if(0===ke&&0===J.length)if(b||e[L]&&(b=e[L].resolve(0)),b){let k=b[j];k||(k=b.then),k.call(b,$)}else e[x]($,0);H&&J.push(H)}function $(){if(!q){for(q=!0;J.length;){const H=J;J=[];for(let k=0;k<H.length;k++){const t=H[k];try{t.zone.runTask(t,null,null)}catch(i){Ne.onUnhandledError(i)}}}Ne.microtaskDrainDone(),q=!1}}const Y={name:"NO ZONE"},G="notScheduled",oe="scheduling",A="scheduled",se="running",V="canceling",ie="unknown",R="microTask",z="macroTask",D="eventTask",fe={},Ne={symbol:p,currentZoneFrame:()=>X,onUnhandledError:Q,microtaskDrainDone:Q,scheduleMicroTask:T,showUncaughtError:()=>!y[p("ignoreConsoleErrorUncaughtError")],patchEventTarget:()=>[],patchOnProperties:Q,patchMethod:()=>Q,bindArguments:()=>[],patchThen:()=>Q,patchMacroTask:()=>Q,patchEventPrototype:()=>Q,isIEOrEdge:()=>!1,getGlobalObjects:()=>{},ObjectDefineProperty:()=>Q,ObjectGetOwnPropertyDescriptor:()=>{},ObjectCreate:()=>{},ArraySlice:()=>[],patchClass:()=>Q,wrapWithCurrentZone:()=>Q,filterProperties:()=>[],attachOriginToPatched:()=>Q,_redefineProperty:()=>Q,patchCallbacks:()=>Q};let X={parent:null,zone:new y(null,null)},ge=null,ke=0;function Q(){}s("Zone","Zone"),e.Zone=y}(typeof window<"u"&&window||typeof self<"u"&&self||global);const Se=Object.getOwnPropertyDescriptor,$e=Object.defineProperty,Pe=Object.getPrototypeOf,_t=Object.create,ot=Array.prototype.slice,Fe="addEventListener",ve="removeEventListener",ze=Zone.__symbol__(Fe),We=Zone.__symbol__(ve),le="true",be="false",Ze=Zone.__symbol__("");function st(e,o){return Zone.current.wrap(e,o)}function qe(e,o,l,s,f){return Zone.current.scheduleMacroTask(e,o,l,s,f)}const U=Zone.__symbol__,Be=typeof window<"u",Re=Be?window:void 0,te=Be&&Re||"object"==typeof self&&self||global,Me=[null];function Xe(e,o){for(let l=e.length-1;l>=0;l--)"function"==typeof e[l]&&(e[l]=st(e[l],o+"_"+l));return e}function Ye(e){return!e||!1!==e.writable&&!("function"==typeof e.get&&typeof e.set>"u")}const Ke=typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope,Le=!("nw"in te)&&typeof te.process<"u"&&"[object process]"==={}.toString.call(te.process),Ue=!Le&&!Ke&&!(!Be||!Re.HTMLElement),_e=typeof te.process<"u"&&"[object process]"==={}.toString.call(te.process)&&!Ke&&!(!Be||!Re.HTMLElement),xe={},ct=function(e){if(!(e=e||te.event))return;let o=xe[e.type];o||(o=xe[e.type]=U("ON_PROPERTY"+e.type));const l=this||e.target||te,s=l[o];let f;return Ue&&l===Re&&"error"===e.type?(f=s&&s.call(this,e.message,e.filename,e.lineno,e.colno,e.error),!0===f&&e.preventDefault()):(f=s&&s.apply(this,arguments),null!=f&&!f&&e.preventDefault()),f};function Ve(e,o,l){let s=Se(e,o);if(!s&&l&&Se(l,o)&&(s={enumerable:!0,configurable:!0}),!s||!s.configurable)return;const f=U("on"+o+"patched");if(e.hasOwnProperty(f)&&e[f])return;delete s.writable,delete s.value;const p=s.get,g=s.set,y=o.substr(2);let N=xe[y];N||(N=xe[y]=U("ON_PROPERTY"+y)),s.set=function(w){let v=this;!v&&e===te&&(v=te),v&&(v[N]&&v.removeEventListener(y,ct),g&&g.apply(v,Me),"function"==typeof w?(v[N]=w,v.addEventListener(y,ct,!1)):v[N]=null)},s.get=function(){let w=this;if(!w&&e===te&&(w=te),!w)return null;const v=w[N];if(v)return v;if(p){let x=p&&p.call(this);if(x)return s.set.call(this,x),"function"==typeof w.removeAttribute&&w.removeAttribute(o),x}return null},$e(e,o,s),e[f]=!0}function at(e,o,l){if(o)for(let s=0;s<o.length;s++)Ve(e,"on"+o[s],l);else{const s=[];for(const f in e)"on"==f.substr(0,2)&&s.push(f);for(let f=0;f<s.length;f++)Ve(e,s[f],l)}}const pe=U("originalInstance");function Oe(e){const o=te[e];if(!o)return;te[U(e)]=o,te[e]=function(){const f=Xe(arguments,e);switch(f.length){case 0:this[pe]=new o;break;case 1:this[pe]=new o(f[0]);break;case 2:this[pe]=new o(f[0],f[1]);break;case 3:this[pe]=new o(f[0],f[1],f[2]);break;case 4:this[pe]=new o(f[0],f[1],f[2],f[3]);break;default:throw new Error("Arg list too long.")}},Te(te[e],o);const l=new o(function(){});let s;for(s in l)"XMLHttpRequest"===e&&"responseBlob"===s||function(f){"function"==typeof l[f]?te[e].prototype[f]=function(){return this[pe][f].apply(this[pe],arguments)}:$e(te[e].prototype,f,{set:function(p){"function"==typeof p?(this[pe][f]=st(p,e+"."+f),Te(this[pe][f],p)):this[pe][f]=p},get:function(){return this[pe][f]}})}(s);for(s in o)"prototype"!==s&&o.hasOwnProperty(s)&&(te[e][s]=o[s])}function Ee(e,o,l){let s=e;for(;s&&!s.hasOwnProperty(o);)s=Pe(s);!s&&e[o]&&(s=e);const f=U(o);let p=null;if(s&&(!(p=s[f])||!s.hasOwnProperty(f))&&(p=s[f]=s[o],Ye(s&&Se(s,o)))){const y=l(p,f,o);s[o]=function(){return y(this,arguments)},Te(s[o],p)}return p}function lt(e,o,l){let s=null;function f(p){const g=p.data;return g.args[g.cbIdx]=function(){p.invoke.apply(this,arguments)},s.apply(g.target,g.args),p}s=Ee(e,o,p=>function(g,y){const N=l(g,y);return N.cbIdx>=0&&"function"==typeof y[N.cbIdx]?qe(N.name,y[N.cbIdx],N,f):p.apply(g,y)})}function Te(e,o){e[U("OriginalDelegate")]=o}let ut=!1,Je=!1;function ft(){if(ut)return Je;ut=!0;try{const e=Re.navigator.userAgent;(-1!==e.indexOf("MSIE ")||-1!==e.indexOf("Trident/")||-1!==e.indexOf("Edge/"))&&(Je=!0)}catch{}return Je}Zone.__load_patch("ZoneAwarePromise",(e,o,l)=>{const s=Object.getOwnPropertyDescriptor,f=Object.defineProperty,g=l.symbol,y=[],N=!0===e[g("DISABLE_WRAPPING_UNCAUGHT_PROMISE_REJECTION")],w=g("Promise"),v=g("then");l.onUnhandledError=d=>{if(l.showUncaughtError()){const a=d&&d.rejection;a?console.error("Unhandled Promise rejection:",a instanceof Error?a.message:a,"; Zone:",d.zone.name,"; Task:",d.task&&d.task.source,"; Value:",a,a instanceof Error?a.stack:void 0):console.error(d)}},l.microtaskDrainDone=()=>{for(;y.length;){const d=y.shift();try{d.zone.runGuarded(()=>{throw d.throwOriginal?d.rejection:d})}catch(a){j(a)}}};const L=g("unhandledPromiseRejectionHandler");function j(d){l.onUnhandledError(d);try{const a=o[L];"function"==typeof a&&a.call(this,d)}catch{}}function J(d){return d&&d.then}function q(d){return d}function b(d){return t.reject(d)}const T=g("state"),$=g("value"),Y=g("finally"),G=g("parentPromiseValue"),oe=g("parentPromiseState"),se=null,V=!0,ie=!1;function z(d,a){return h=>{try{X(d,a,h)}catch(E){X(d,!1,E)}}}const Ne=g("currentTaskTrace");function X(d,a,h){const E=function(){let d=!1;return function(h){return function(){d||(d=!0,h.apply(null,arguments))}}}();if(d===h)throw new TypeError("Promise resolved with itself");if(d[T]===se){let I=null;try{("object"==typeof h||"function"==typeof h)&&(I=h&&h.then)}catch(Z){return E(()=>{X(d,!1,Z)})(),d}if(a!==ie&&h instanceof t&&h.hasOwnProperty(T)&&h.hasOwnProperty($)&&h[T]!==se)ke(h),X(d,h[T],h[$]);else if(a!==ie&&"function"==typeof I)try{I.call(h,E(z(d,a)),E(z(d,!1)))}catch(Z){E(()=>{X(d,!1,Z)})()}else{d[T]=a;const Z=d[$];if(d[$]=h,d[Y]===Y&&a===V&&(d[T]=d[oe],d[$]=d[G]),a===ie&&h instanceof Error){const S=o.currentTask&&o.currentTask.data&&o.currentTask.data.__creationTrace__;S&&f(h,Ne,{configurable:!0,enumerable:!1,writable:!0,value:S})}for(let S=0;S<Z.length;)Q(d,Z[S++],Z[S++],Z[S++],Z[S++]);if(0==Z.length&&a==ie){d[T]=0;let S=h;try{throw new Error("Uncaught (in promise): "+function p(d){return d&&d.toString===Object.prototype.toString?(d.constructor&&d.constructor.name||"")+": "+JSON.stringify(d):d?d.toString():Object.prototype.toString.call(d)}(h)+(h&&h.stack?"\n"+h.stack:""))}catch(O){S=O}N&&(S.throwOriginal=!0),S.rejection=h,S.promise=d,S.zone=o.current,S.task=o.currentTask,y.push(S),l.scheduleMicroTask()}}}return d}const ge=g("rejectionHandledHandler");function ke(d){if(0===d[T]){try{const a=o[ge];a&&"function"==typeof a&&a.call(this,{rejection:d[$],promise:d})}catch{}d[T]=ie;for(let a=0;a<y.length;a++)d===y[a].promise&&y.splice(a,1)}}function Q(d,a,h,E,I){ke(d);const Z=d[T],S=Z?"function"==typeof E?E:q:"function"==typeof I?I:b;a.scheduleMicroTask("Promise.then",()=>{try{const O=d[$],M=!!h&&Y===h[Y];M&&(h[G]=O,h[oe]=Z);const F=a.run(S,void 0,M&&S!==b&&S!==q?[]:[O]);X(h,!0,F)}catch(O){X(h,!1,O)}},h)}const k=function(){};class t{static toString(){return"function ZoneAwarePromise() { [native code] }"}static resolve(a){return X(new this(null),V,a)}static reject(a){return X(new this(null),ie,a)}static race(a){let h,E,I=new this((O,M)=>{h=O,E=M});function Z(O){h(O)}function S(O){E(O)}for(let O of a)J(O)||(O=this.resolve(O)),O.then(Z,S);return I}static all(a){return t.allWithCallback(a)}static allSettled(a){return(this&&this.prototype instanceof t?this:t).allWithCallback(a,{thenCallback:E=>({status:"fulfilled",value:E}),errorCallback:E=>({status:"rejected",reason:E})})}static allWithCallback(a,h){let E,I,Z=new this((F,ee)=>{E=F,I=ee}),S=2,O=0;const M=[];for(let F of a){J(F)||(F=this.resolve(F));const ee=O;try{F.then(he=>{M[ee]=h?h.thenCallback(he):he,S--,0===S&&E(M)},he=>{h?(M[ee]=h.errorCallback(he),S--,0===S&&E(M)):I(he)})}catch(he){I(he)}S++,O++}return S-=2,0===S&&E(M),Z}constructor(a){const h=this;if(!(h instanceof t))throw new Error("Must be an instanceof Promise.");h[T]=se,h[$]=[];try{a&&a(z(h,V),z(h,ie))}catch(E){X(h,!1,E)}}get[Symbol.toStringTag](){return"Promise"}get[Symbol.species](){return t}then(a,h){let E=this.constructor[Symbol.species];(!E||"function"!=typeof E)&&(E=this.constructor||t);const I=new E(k),Z=o.current;return this[T]==se?this[$].push(Z,I,a,h):Q(this,Z,I,a,h),I}catch(a){return this.then(null,a)}finally(a){let h=this.constructor[Symbol.species];(!h||"function"!=typeof h)&&(h=t);const E=new h(k);E[Y]=Y;const I=o.current;return this[T]==se?this[$].push(I,E,a,a):Q(this,I,E,a,a),E}}t.resolve=t.resolve,t.reject=t.reject,t.race=t.race,t.all=t.all;const i=e[w]=e.Promise;e.Promise=t;const P=g("thenPatched");function C(d){const a=d.prototype,h=s(a,"then");if(h&&(!1===h.writable||!h.configurable))return;const E=a.then;a[v]=E,d.prototype.then=function(I,Z){return new t((O,M)=>{E.call(this,O,M)}).then(I,Z)},d[P]=!0}return l.patchThen=C,i&&(C(i),Ee(e,"fetch",d=>function ae(d){return function(a,h){let E=d.apply(a,h);if(E instanceof t)return E;let I=E.constructor;return I[P]||C(I),E}}(d))),Promise[o.__symbol__("uncaughtPromiseErrors")]=y,t}),Zone.__load_patch("toString",e=>{const o=Function.prototype.toString,l=U("OriginalDelegate"),s=U("Promise"),f=U("Error"),p=function(){if("function"==typeof this){const w=this[l];if(w)return"function"==typeof w?o.call(w):Object.prototype.toString.call(w);if(this===Promise){const v=e[s];if(v)return o.call(v)}if(this===Error){const v=e[f];if(v)return o.call(v)}}return o.call(this)};p[l]=o,Function.prototype.toString=p;const g=Object.prototype.toString;Object.prototype.toString=function(){return"function"==typeof Promise&&this instanceof Promise?"[object Promise]":g.call(this)}});let Ie=!1;if(typeof window<"u")try{const e=Object.defineProperty({},"passive",{get:function(){Ie=!0}});window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch{Ie=!1}const ht={useG:!0},de={},yt={},dt=new RegExp("^"+Ze+"(\\w+)(true|false)$"),Qe=U("propagationStopped");function kt(e,o){const l=(o?o(e):e)+be,s=(o?o(e):e)+le,f=Ze+l,p=Ze+s;de[e]={},de[e][be]=f,de[e][le]=p}function pt(e,o,l){const s=l&&l.add||Fe,f=l&&l.rm||ve,p=l&&l.listeners||"eventListeners",g=l&&l.rmAll||"removeAllListeners",y=U(s),N="."+s+":",w="prependListener",v="."+w+":",x=function(b,T,$){if(b.isRemoved)return;const Y=b.callback;"object"==typeof Y&&Y.handleEvent&&(b.callback=oe=>Y.handleEvent(oe),b.originalDelegate=Y),b.invoke(b,T,[$]);const G=b.options;G&&"object"==typeof G&&G.once&&T[f].call(T,$.type,b.originalDelegate?b.originalDelegate:b.callback,G)},L=function(b){if(!(b=b||e.event))return;const T=this||b.target||e,$=T[de[b.type][be]];if($)if(1===$.length)x($[0],T,b);else{const Y=$.slice();for(let G=0;G<Y.length&&(!b||!0!==b[Qe]);G++)x(Y[G],T,b)}},j=function(b){if(!(b=b||e.event))return;const T=this||b.target||e,$=T[de[b.type][le]];if($)if(1===$.length)x($[0],T,b);else{const Y=$.slice();for(let G=0;G<Y.length&&(!b||!0!==b[Qe]);G++)x(Y[G],T,b)}};function J(b,T){if(!b)return!1;let $=!0;T&&void 0!==T.useG&&($=T.useG);const Y=T&&T.vh;let G=!0;T&&void 0!==T.chkDup&&(G=T.chkDup);let oe=!1;T&&void 0!==T.rt&&(oe=T.rt);let A=b;for(;A&&!A.hasOwnProperty(s);)A=Pe(A);if(!A&&b[s]&&(A=b),!A||A[y])return!1;const se=T&&T.eventNameToString,V={},ie=A[y]=A[s],R=A[U(f)]=A[f],z=A[U(p)]=A[p],D=A[U(g)]=A[g];let fe;function Ne(a,h){return!Ie&&"object"==typeof a&&a?!!a.capture:Ie&&h?"boolean"==typeof a?{capture:a,passive:!0}:a?"object"==typeof a&&!1!==a.passive?Object.assign(Object.assign({},a),{passive:!0}):a:{passive:!0}:a}T&&T.prepend&&(fe=A[U(T.prepend)]=A[T.prepend]);const k=$?function(a){if(!V.isExisting)return ie.call(V.target,V.eventName,V.capture?j:L,V.options)}:function(a){return ie.call(V.target,V.eventName,a.invoke,V.options)},t=$?function(a){if(!a.isRemoved){const h=de[a.eventName];let E;h&&(E=h[a.capture?le:be]);const I=E&&a.target[E];if(I)for(let Z=0;Z<I.length;Z++)if(I[Z]===a){I.splice(Z,1),a.isRemoved=!0,0===I.length&&(a.allRemoved=!0,a.target[E]=null);break}}if(a.allRemoved)return R.call(a.target,a.eventName,a.capture?j:L,a.options)}:function(a){return R.call(a.target,a.eventName,a.invoke,a.options)},P=T&&T.diff?T.diff:function(a,h){const E=typeof h;return"function"===E&&a.callback===h||"object"===E&&a.originalDelegate===h},C=Zone[U("UNPATCHED_EVENTS")],ae=e[U("PASSIVE_EVENTS")],d=function(a,h,E,I,Z=!1,S=!1){return function(){const O=this||e;let M=arguments[0];T&&T.transferEventName&&(M=T.transferEventName(M));let F=arguments[1];if(!F)return a.apply(this,arguments);if(Le&&"uncaughtException"===M)return a.apply(this,arguments);let ee=!1;if("function"!=typeof F){if(!F.handleEvent)return a.apply(this,arguments);ee=!0}if(Y&&!Y(a,F,O,arguments))return;const he=Ie&&!!ae&&-1!==ae.indexOf(M),we=Ne(arguments[2],he);if(C)for(let He=0;He<C.length;He++)if(M===C[He])return he?a.call(O,M,F,we):a.apply(this,arguments);const Nt=!!we&&("boolean"==typeof we||we.capture),Ct=!(!we||"object"!=typeof we)&&we.once,xt=Zone.current;let St=de[M];St||(kt(M,se),St=de[M]);const Dt=St[Nt?le:be];let gt,Ge=O[Dt],Zt=!1;if(Ge){if(Zt=!0,G)for(let He=0;He<Ge.length;He++)if(P(Ge[He],F))return}else Ge=O[Dt]=[];const Mt=O.constructor.name,Lt=yt[Mt];Lt&&(gt=Lt[M]),gt||(gt=Mt+h+(se?se(M):M)),V.options=we,Ct&&(V.options.once=!1),V.target=O,V.capture=Nt,V.eventName=M,V.isExisting=Zt;const nt=$?ht:void 0;nt&&(nt.taskData=V);const De=xt.scheduleEventTask(gt,F,nt,E,I);return V.target=null,nt&&(nt.taskData=null),Ct&&(we.once=!0),!Ie&&"boolean"==typeof De.options||(De.options=we),De.target=O,De.capture=Nt,De.eventName=M,ee&&(De.originalDelegate=F),S?Ge.unshift(De):Ge.push(De),Z?O:void 0}};return A[s]=d(ie,N,k,t,oe),fe&&(A[w]=d(fe,v,function(a){return fe.call(V.target,V.eventName,a.invoke,V.options)},t,oe,!0)),A[f]=function(){const a=this||e;let h=arguments[0];T&&T.transferEventName&&(h=T.transferEventName(h));const E=arguments[2],I=!!E&&("boolean"==typeof E||E.capture),Z=arguments[1];if(!Z)return R.apply(this,arguments);if(Y&&!Y(R,Z,a,arguments))return;const S=de[h];let O;S&&(O=S[I?le:be]);const M=O&&a[O];if(M)for(let F=0;F<M.length;F++){const ee=M[F];if(P(ee,Z))return M.splice(F,1),ee.isRemoved=!0,0===M.length&&(ee.allRemoved=!0,a[O]=null,"string"==typeof h)&&(a[Ze+"ON_PROPERTY"+h]=null),ee.zone.cancelTask(ee),oe?a:void 0}return R.apply(this,arguments)},A[p]=function(){const a=this||e;let h=arguments[0];T&&T.transferEventName&&(h=T.transferEventName(h));const E=[],I=et(a,se?se(h):h);for(let Z=0;Z<I.length;Z++){const S=I[Z];E.push(S.originalDelegate?S.originalDelegate:S.callback)}return E},A[g]=function(){const a=this||e;let h=arguments[0];if(h){T&&T.transferEventName&&(h=T.transferEventName(h));const E=de[h];if(E){const S=a[E[be]],O=a[E[le]];if(S){const M=S.slice();for(let F=0;F<M.length;F++){const ee=M[F];this[f].call(this,h,ee.originalDelegate?ee.originalDelegate:ee.callback,ee.options)}}if(O){const M=O.slice();for(let F=0;F<M.length;F++){const ee=M[F];this[f].call(this,h,ee.originalDelegate?ee.originalDelegate:ee.callback,ee.options)}}}}else{const E=Object.keys(a);for(let I=0;I<E.length;I++){const S=dt.exec(E[I]);let O=S&&S[1];O&&"removeListener"!==O&&this[g].call(this,O)}this[g].call(this,"removeListener")}if(oe)return this},Te(A[s],ie),Te(A[f],R),D&&Te(A[g],D),z&&Te(A[p],z),!0}let q=[];for(let b=0;b<o.length;b++)q[b]=J(o[b],l);return q}function et(e,o){if(!o){const p=[];for(let g in e){const y=dt.exec(g);let N=y&&y[1];if(N&&(!o||N===o)){const w=e[g];if(w)for(let v=0;v<w.length;v++)p.push(w[v])}}return p}let l=de[o];l||(kt(o),l=de[o]);const s=e[l[be]],f=e[l[le]];return s?f?s.concat(f):s.slice():f?f.slice():[]}function Rt(e,o){const l=e.Event;l&&l.prototype&&o.patchMethod(l.prototype,"stopImmediatePropagation",s=>function(f,p){f[Qe]=!0,s&&s.apply(f,p)})}function Ot(e,o,l,s,f){const p=Zone.__symbol__(s);if(o[p])return;const g=o[p]=o[s];o[s]=function(y,N,w){return N&&N.prototype&&f.forEach(function(v){const x=`${l}.${s}::`+v,L=N.prototype;if(L.hasOwnProperty(v)){const j=e.ObjectGetOwnPropertyDescriptor(L,v);j&&j.value?(j.value=e.wrapWithCurrentZone(j.value,x),e._redefineProperty(N.prototype,v,j)):L[v]&&(L[v]=e.wrapWithCurrentZone(L[v],x))}else L[v]&&(L[v]=e.wrapWithCurrentZone(L[v],x))}),g.call(o,y,N,w)},e.attachOriginToPatched(o[s],g)}const Ae=["absolutedeviceorientation","afterinput","afterprint","appinstalled","beforeinstallprompt","beforeprint","beforeunload","devicelight","devicemotion","deviceorientation","deviceorientationabsolute","deviceproximity","hashchange","languagechange","message","mozbeforepaint","offline","online","paint","pageshow","pagehide","popstate","rejectionhandled","storage","unhandledrejection","unload","userproximity","vrdisplayconnected","vrdisplaydisconnected","vrdisplaypresentchange"],mt=["encrypted","waitingforkey","msneedkey","mozinterruptbegin","mozinterruptend"],u=["load"],m=["blur","error","focus","load","resize","scroll","messageerror"],_=["bounce","finish","start"],ne=["loadstart","progress","abort","error","load","progress","timeout","loadend","readystatechange"],B=["upgradeneeded","complete","abort","success","error","blocked","versionchange","close"],W=["close","error","open","message"],ce=["error","message"],me=["abort","animationcancel","animationend","animationiteration","auxclick","beforeinput","blur","cancel","canplay","canplaythrough","change","compositionstart","compositionupdate","compositionend","cuechange","click","close","contextmenu","curechange","dblclick","drag","dragend","dragenter","dragexit","dragleave","dragover","drop","durationchange","emptied","ended","error","focus","focusin","focusout","gotpointercapture","input","invalid","keydown","keypress","keyup","load","loadstart","loadeddata","loadedmetadata","lostpointercapture","mousedown","mouseenter","mouseleave","mousemove","mouseout","mouseover","mouseup","mousewheel","orientationchange","pause","play","playing","pointercancel","pointerdown","pointerenter","pointerleave","pointerlockchange","mozpointerlockchange","webkitpointerlockerchange","pointerlockerror","mozpointerlockerror","webkitpointerlockerror","pointermove","pointout","pointerover","pointerup","progress","ratechange","reset","resize","scroll","seeked","seeking","select","selectionchange","selectstart","show","sort","stalled","submit","suspend","timeupdate","volumechange","touchcancel","touchmove","touchstart","touchend","transitioncancel","transitionend","waiting","wheel"].concat(["webglcontextrestored","webglcontextlost","webglcontextcreationerror"],["autocomplete","autocompleteerror"],["toggle"],["afterscriptexecute","beforescriptexecute","DOMContentLoaded","freeze","fullscreenchange","mozfullscreenchange","webkitfullscreenchange","msfullscreenchange","fullscreenerror","mozfullscreenerror","webkitfullscreenerror","msfullscreenerror","readystatechange","visibilitychange","resume"],Ae,["beforecopy","beforecut","beforepaste","copy","cut","paste","dragstart","loadend","animationstart","search","transitionrun","transitionstart","webkitanimationend","webkitanimationiteration","webkitanimationstart","webkittransitionend"],["activate","afterupdate","ariarequest","beforeactivate","beforedeactivate","beforeeditfocus","beforeupdate","cellchange","controlselect","dataavailable","datasetchanged","datasetcomplete","errorupdate","filterchange","layoutcomplete","losecapture","move","moveend","movestart","propertychange","resizeend","resizestart","rowenter","rowexit","rowsdelete","rowsinserted","command","compassneedscalibration","deactivate","help","mscontentzoom","msmanipulationstatechanged","msgesturechange","msgesturedoubletap","msgestureend","msgesturehold","msgesturestart","msgesturetap","msgotpointercapture","msinertiastart","mslostpointercapture","mspointercancel","mspointerdown","mspointerenter","mspointerhover","mspointerleave","mspointermove","mspointerout","mspointerover","mspointerup","pointerout","mssitemodejumplistitemremoved","msthumbnailclick","stop","storagecommit"]);function Ce(e,o,l){if(!l||0===l.length)return o;const s=l.filter(p=>p.target===e);if(!s||0===s.length)return o;const f=s[0].ignoreProperties;return o.filter(p=>-1===f.indexOf(p))}function K(e,o,l,s){e&&at(e,Ce(e,o,l),s)}Zone.__load_patch("util",(e,o,l)=>{l.patchOnProperties=at,l.patchMethod=Ee,l.bindArguments=Xe,l.patchMacroTask=lt;const s=o.__symbol__("BLACK_LISTED_EVENTS"),f=o.__symbol__("UNPATCHED_EVENTS");e[f]&&(e[s]=e[f]),e[s]&&(o[s]=o[f]=e[s]),l.patchEventPrototype=Rt,l.patchEventTarget=pt,l.isIEOrEdge=ft,l.ObjectDefineProperty=$e,l.ObjectGetOwnPropertyDescriptor=Se,l.ObjectCreate=_t,l.ArraySlice=ot,l.patchClass=Oe,l.wrapWithCurrentZone=st,l.filterProperties=Ce,l.attachOriginToPatched=Te,l._redefineProperty=Object.defineProperty,l.patchCallbacks=Ot,l.getGlobalObjects=()=>({globalSources:yt,zoneSymbolEventNames:de,eventNames:me,isBrowser:Ue,isMix:_e,isNode:Le,TRUE_STR:le,FALSE_STR:be,ZONE_SYMBOL_PREFIX:Ze,ADD_EVENT_LISTENER_STR:Fe,REMOVE_EVENT_LISTENER_STR:ve})});const ue=U("zoneTask");function ye(e,o,l,s){let f=null,p=null;l+=s;const g={};function y(w){const v=w.data;return v.args[0]=function(){return w.invoke.apply(this,arguments)},v.handleId=f.apply(e,v.args),w}function N(w){return p.call(e,w.data.handleId)}f=Ee(e,o+=s,w=>function(v,x){if("function"==typeof x[0]){const L={isPeriodic:"Interval"===s,delay:"Timeout"===s||"Interval"===s?x[1]||0:void 0,args:x},j=x[0];x[0]=function(){try{return j.apply(this,arguments)}finally{L.isPeriodic||("number"==typeof L.handleId?delete g[L.handleId]:L.handleId&&(L.handleId[ue]=null))}};const J=qe(o,x[0],L,y,N);if(!J)return J;const q=J.data.handleId;return"number"==typeof q?g[q]=J:q&&(q[ue]=J),q&&q.ref&&q.unref&&"function"==typeof q.ref&&"function"==typeof q.unref&&(J.ref=q.ref.bind(q),J.unref=q.unref.bind(q)),"number"==typeof q||q?q:J}return w.apply(e,x)}),p=Ee(e,l,w=>function(v,x){const L=x[0];let j;"number"==typeof L?j=g[L]:(j=L&&L[ue],j||(j=L)),j&&"string"==typeof j.type?"notScheduled"!==j.state&&(j.cancelFn&&j.data.isPeriodic||0===j.runCount)&&("number"==typeof L?delete g[L]:L&&(L[ue]=null),j.zone.cancelTask(j)):w.apply(e,x)})}Zone.__load_patch("legacy",e=>{const o=e[Zone.__symbol__("legacyPatch")];o&&o()}),Zone.__load_patch("queueMicrotask",(e,o,l)=>{l.patchMethod(e,"queueMicrotask",s=>function(f,p){o.current.scheduleMicroTask("queueMicrotask",p[0])})}),Zone.__load_patch("timers",e=>{const o="set",l="clear";ye(e,o,l,"Timeout"),ye(e,o,l,"Interval"),ye(e,o,l,"Immediate")}),Zone.__load_patch("requestAnimationFrame",e=>{ye(e,"request","cancel","AnimationFrame"),ye(e,"mozRequest","mozCancel","AnimationFrame"),ye(e,"webkitRequest","webkitCancel","AnimationFrame")}),Zone.__load_patch("blocking",(e,o)=>{const l=["alert","prompt","confirm"];for(let s=0;s<l.length;s++)Ee(e,l[s],(p,g,y)=>function(N,w){return o.current.run(p,e,w,y)})}),Zone.__load_patch("EventTarget",(e,o,l)=>{(function Pt(e,o){o.patchEventPrototype(e,o)})(e,l),function je(e,o){if(Zone[o.symbol("patchEventTarget")])return;const{eventNames:l,zoneSymbolEventNames:s,TRUE_STR:f,FALSE_STR:p,ZONE_SYMBOL_PREFIX:g}=o.getGlobalObjects();for(let N=0;N<l.length;N++){const w=l[N],L=g+(w+p),j=g+(w+f);s[w]={},s[w][p]=L,s[w][f]=j}const y=e.EventTarget;y&&y.prototype&&o.patchEventTarget(e,[y&&y.prototype])}(e,l);const s=e.XMLHttpRequestEventTarget;s&&s.prototype&&l.patchEventTarget(e,[s.prototype])}),Zone.__load_patch("MutationObserver",(e,o,l)=>{Oe("MutationObserver"),Oe("WebKitMutationObserver")}),Zone.__load_patch("IntersectionObserver",(e,o,l)=>{Oe("IntersectionObserver")}),Zone.__load_patch("FileReader",(e,o,l)=>{Oe("FileReader")}),Zone.__load_patch("on_property",(e,o,l)=>{!function tt(e,o){if(Le&&!_e||Zone[e.symbol("patchEvents")])return;const l=typeof WebSocket<"u",s=o.__Zone_ignore_on_properties;if(Ue){const g=window,y=function Tt(){try{const e=Re.navigator.userAgent;if(-1!==e.indexOf("MSIE ")||-1!==e.indexOf("Trident/"))return!0}catch{}return!1}()?[{target:g,ignoreProperties:["error"]}]:[];K(g,me.concat(["messageerror"]),s&&s.concat(y),Pe(g)),K(Document.prototype,me,s),typeof g.SVGElement<"u"&&K(g.SVGElement.prototype,me,s),K(Element.prototype,me,s),K(HTMLElement.prototype,me,s),K(HTMLMediaElement.prototype,mt,s),K(HTMLFrameSetElement.prototype,Ae.concat(m),s),K(HTMLBodyElement.prototype,Ae.concat(m),s),K(HTMLFrameElement.prototype,u,s),K(HTMLIFrameElement.prototype,u,s);const N=g.HTMLMarqueeElement;N&&K(N.prototype,_,s);const w=g.Worker;w&&K(w.prototype,ce,s)}const f=o.XMLHttpRequest;f&&K(f.prototype,ne,s);const p=o.XMLHttpRequestEventTarget;p&&K(p&&p.prototype,ne,s),typeof IDBIndex<"u"&&(K(IDBIndex.prototype,B,s),K(IDBRequest.prototype,B,s),K(IDBOpenDBRequest.prototype,B,s),K(IDBDatabase.prototype,B,s),K(IDBTransaction.prototype,B,s),K(IDBCursor.prototype,B,s)),l&&K(WebSocket.prototype,W,s)}(l,e)}),Zone.__load_patch("customElements",(e,o,l)=>{!function re(e,o){const{isBrowser:l,isMix:s}=o.getGlobalObjects();(l||s)&&e.customElements&&"customElements"in e&&o.patchCallbacks(o,e.customElements,"customElements","define",["connectedCallback","disconnectedCallback","adoptedCallback","attributeChangedCallback"])}(e,l)}),Zone.__load_patch("XHR",(e,o)=>{!function N(w){const v=w.XMLHttpRequest;if(!v)return;const x=v.prototype;let j=x[ze],J=x[We];if(!j){const R=w.XMLHttpRequestEventTarget;if(R){const z=R.prototype;j=z[ze],J=z[We]}}const q="readystatechange",b="scheduled";function T(R){const z=R.data,D=z.target;D[p]=!1,D[y]=!1;const fe=D[f];j||(j=D[ze],J=D[We]),fe&&J.call(D,q,fe);const Ne=D[f]=()=>{if(D.readyState===D.DONE)if(!z.aborted&&D[p]&&R.state===b){const ge=D[o.__symbol__("loadfalse")];if(0!==D.status&&ge&&ge.length>0){const ke=R.invoke;R.invoke=function(){const Q=D[o.__symbol__("loadfalse")];for(let H=0;H<Q.length;H++)Q[H]===R&&Q.splice(H,1);!z.aborted&&R.state===b&&ke.call(R)},ge.push(R)}else R.invoke()}else!z.aborted&&!1===D[p]&&(D[y]=!0)};return j.call(D,q,Ne),D[l]||(D[l]=R),V.apply(D,z.args),D[p]=!0,R}function $(){}function Y(R){const z=R.data;return z.aborted=!0,ie.apply(z.target,z.args)}const G=Ee(x,"open",()=>function(R,z){return R[s]=0==z[2],R[g]=z[1],G.apply(R,z)}),A=U("fetchTaskAborting"),se=U("fetchTaskScheduling"),V=Ee(x,"send",()=>function(R,z){if(!0===o.current[se]||R[s])return V.apply(R,z);{const D={target:R,url:R[g],isPeriodic:!1,args:z,aborted:!1},fe=qe("XMLHttpRequest.send",$,D,T,Y);R&&!0===R[y]&&!D.aborted&&fe.state===b&&fe.invoke()}}),ie=Ee(x,"abort",()=>function(R,z){const D=function L(R){return R[l]}(R);if(D&&"string"==typeof D.type){if(null==D.cancelFn||D.data&&D.data.aborted)return;D.zone.cancelTask(D)}else if(!0===o.current[A])return ie.apply(R,z)})}(e);const l=U("xhrTask"),s=U("xhrSync"),f=U("xhrListener"),p=U("xhrScheduled"),g=U("xhrURL"),y=U("xhrErrorBeforeScheduled")}),Zone.__load_patch("geolocation",e=>{e.navigator&&e.navigator.geolocation&&function it(e,o){const l=e.constructor.name;for(let s=0;s<o.length;s++){const f=o[s],p=e[f];if(p){if(!Ye(Se(e,f)))continue;e[f]=(y=>{const N=function(){return y.apply(this,Xe(arguments,l+"."+f))};return Te(N,y),N})(p)}}}(e.navigator.geolocation,["getCurrentPosition","watchPosition"])}),Zone.__load_patch("PromiseRejectionEvent",(e,o)=>{function l(s){return function(f){et(e,s).forEach(g=>{const y=e.PromiseRejectionEvent;if(y){const N=new y(s,{promise:f.promise,reason:f.rejection});g.invoke(N)}})}}e.PromiseRejectionEvent&&(o[U("unhandledPromiseRejectionHandler")]=l("unhandledrejection"),o[U("rejectionHandledHandler")]=l("rejectionhandled"))})}},rt=>{rt(rt.s=1808)}]);