!function(){"use strict";const t=new WeakMap,e=e=>"function"==typeof e&&t.has(e),s=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,n=(t,e,s=null)=>{let n=e;for(;n!==s;){const e=n.nextSibling;t.removeChild(n),n=e}},i={},o={},l=`{{lit-${String(Math.random()).slice(2)}}}`,a=`\x3c!--${l}--\x3e`,r=new RegExp(`${l}|${a}`),d="$lit$";class c{constructor(t,e){this.parts=[],this.element=e;let s=-1,n=0;const i=[],o=e=>{const a=e.content,c=document.createTreeWalker(a,133,null,!1);let h=0;for(;c.nextNode();){s++;const e=c.currentNode;if(1===e.nodeType){if(e.hasAttributes()){const i=e.attributes;let o=0;for(let t=0;t<i.length;t++)i[t].value.indexOf(l)>=0&&o++;for(;o-- >0;){const i=t.strings[n],o=p.exec(i)[2],l=o.toLowerCase()+d,a=e.getAttribute(l).split(r);this.parts.push({type:"attribute",index:s,name:o,strings:a}),e.removeAttribute(l),n+=a.length-1}}"TEMPLATE"===e.tagName&&o(e)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(l)>=0){const o=e.parentNode,l=t.split(r),a=l.length-1;for(let t=0;t<a;t++)o.insertBefore(""===l[t]?u():document.createTextNode(l[t]),e),this.parts.push({type:"node",index:++s});""===l[a]?(o.insertBefore(u(),e),i.push(e)):e.data=l[a],n+=a}}else if(8===e.nodeType)if(e.data===l){const t=e.parentNode;null!==e.previousSibling&&s!==h||(s++,t.insertBefore(u(),e)),h=s,this.parts.push({type:"node",index:s}),null===e.nextSibling?e.data="":(i.push(e),s--),n++}else{let t=-1;for(;-1!==(t=e.data.indexOf(l,t+1));)this.parts.push({type:"node",index:-1})}}};o(e);for(const t of i)t.parentNode.removeChild(t)}}const h=t=>-1!==t.index,u=()=>document.createComment(""),p=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=\/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;class m{constructor(t,e,s){this._parts=[],this.template=t,this.processor=e,this.options=s}update(t){let e=0;for(const s of this._parts)void 0!==s&&s.setValue(t[e]),e++;for(const t of this._parts)void 0!==t&&t.commit()}_clone(){const t=s?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=this.template.parts;let n=0,i=0;const o=t=>{const s=document.createTreeWalker(t,133,null,!1);let l=s.nextNode();for(;n<e.length&&null!==l;){const t=e[n];if(h(t))if(i===t.index){if("node"===t.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(l.previousSibling),this._parts.push(t)}else this._parts.push(...this.processor.handleAttributeExpressions(l,t.name,t.strings,this.options));n++}else i++,"TEMPLATE"===l.nodeName&&o(l.content),l=s.nextNode();else this._parts.push(void 0),n++}};return o(t),s&&(document.adoptNode(t),customElements.upgrade(t)),t}}class g{constructor(t,e,s,n){this.strings=t,this.values=e,this.type=s,this.processor=n}getHTML(){const t=this.strings.length-1;let e="";for(let s=0;s<t;s++){const t=this.strings[s],n=p.exec(t);e+=n?t.substr(0,n.index)+n[1]+n[2]+d+n[3]+l:t+a}return e+this.strings[t]}getTemplateElement(){const t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}const v=t=>null===t||!("object"==typeof t||"function"==typeof t);class b{constructor(t,e,s){this.dirty=!0,this.element=t,this.name=e,this.strings=s,this.parts=[];for(let t=0;t<s.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new f(this)}_getValue(){const t=this.strings,e=t.length-1;let s="";for(let n=0;n<e;n++){s+=t[n];const e=this.parts[n];if(void 0!==e){const t=e.value;if(null!=t&&(Array.isArray(t)||"string"!=typeof t&&t[Symbol.iterator]))for(const e of t)s+="string"==typeof e?e:String(e);else s+="string"==typeof t?t:String(t)}}return s+=t[e]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class f{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===i||v(t)&&t===this.value||(this.value=t,e(t)||(this.committer.dirty=!0))}commit(){for(;e(this.value);){const t=this.value;this.value=i,t(this)}this.value!==i&&this.committer.commit()}}class y{constructor(t){this.value=void 0,this._pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(u()),this.endNode=t.appendChild(u())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t._insert(this.startNode=u()),t._insert(this.endNode=u())}insertAfterPart(t){t._insert(this.startNode=u()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this._pendingValue=t}commit(){for(;e(this._pendingValue);){const t=this._pendingValue;this._pendingValue=i,t(this)}const t=this._pendingValue;t!==i&&(v(t)?t!==this.value&&this._commitText(t):t instanceof g?this._commitTemplateResult(t):t instanceof Node?this._commitNode(t):Array.isArray(t)||t[Symbol.iterator]?this._commitIterable(t):t===o?(this.value=o,this.clear()):this._commitText(t))}_insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}_commitNode(t){this.value!==t&&(this.clear(),this._insert(t),this.value=t)}_commitText(t){const e=this.startNode.nextSibling;t=null==t?"":t,e===this.endNode.previousSibling&&3===e.nodeType?e.data=t:this._commitNode(document.createTextNode("string"==typeof t?t:String(t))),this.value=t}_commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof m&&this.value.template===e)this.value.update(t.values);else{const s=new m(e,t.processor,this.options),n=s._clone();s.update(t.values),this._commitNode(n),this.value=s}}_commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let s,n=0;for(const i of t)void 0===(s=e[n])&&(s=new y(this.options),e.push(s),0===n?s.appendIntoPart(this):s.insertAfterPart(e[n-1])),s.setValue(i),s.commit(),n++;n<e.length&&(e.length=n,this.clear(s&&s.endNode))}clear(t=this.startNode){n(this.startNode.parentNode,t.nextSibling,this.endNode)}}class x{constructor(t,e,s){if(this.value=void 0,this._pendingValue=void 0,2!==s.length||""!==s[0]||""!==s[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=s}setValue(t){this._pendingValue=t}commit(){for(;e(this._pendingValue);){const t=this._pendingValue;this._pendingValue=i,t(this)}if(this._pendingValue===i)return;const t=!!this._pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)),this.value=t,this._pendingValue=i}}class N extends b{constructor(t,e,s){super(t,e,s),this.single=2===s.length&&""===s[0]&&""===s[1]}_createPart(){return new _(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class _ extends f{}let w=!1;try{const t={get capture(){return w=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}class V{constructor(t,e,s){this.value=void 0,this._pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=s,this._boundHandleEvent=(t=>this.handleEvent(t))}setValue(t){this._pendingValue=t}commit(){for(;e(this._pendingValue);){const t=this._pendingValue;this._pendingValue=i,t(this)}if(this._pendingValue===i)return;const t=this._pendingValue,s=this.value,n=null==t||null!=s&&(t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive),o=null!=t&&(null==s||n);n&&this.element.removeEventListener(this.eventName,this._boundHandleEvent,this._options),o&&(this._options=k(t),this.element.addEventListener(this.eventName,this._boundHandleEvent,this._options)),this.value=t,this._pendingValue=i}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const k=t=>t&&(w?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);const E=new class{handleAttributeExpressions(t,e,s,n){const i=e[0];return"."===i?new N(t,e.slice(1),s).parts:"@"===i?[new V(t,e.slice(1),n.eventContext)]:"?"===i?[new x(t,e.slice(1),s)]:new b(t,e,s).parts}handleTextExpression(t){return new y(t)}};function A(t){let e=T.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},T.set(t.type,e));let s=e.stringsArray.get(t.strings);if(void 0!==s)return s;const n=t.strings.join(l);return void 0===(s=e.keyString.get(n))&&(s=new c(t,t.getTemplateElement()),e.keyString.set(n,s)),e.stringsArray.set(t.strings,s),s}const T=new Map,$=new WeakMap;(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.0.0");const S=(t,...e)=>new g(t,e,"html",E),M=(t,e)=>{const s=t.startNode.parentNode,n=void 0===e?t.endNode:e.startNode,i=s.insertBefore(u(),n);s.insertBefore(u(),n);const o=new y(t.options);return o.insertAfterNode(i),o},C=(t,e)=>(t.setValue(e),t.commit(),t),L=(t,e,s)=>{const n=t.startNode.parentNode,i=s?s.startNode:t.endNode,o=e.endNode.nextSibling;o!==i&&((t,e,s=null,n=null)=>{let i=e;for(;i!==s;){const e=i.nextSibling;t.insertBefore(i,n),i=e}})(n,e.startNode,o,i)},I=t=>{n(t.startNode.parentNode,t.startNode,t.endNode.nextSibling)},B=(t,e,s)=>{const n=new Map;for(let i=e;i<=s;i++)n.set(t[i],i);return n},H=new WeakMap,P=new WeakMap,W=(e=>(...s)=>{const n=e(...s);return t.set(n,!0),n})((t,e,s)=>{let n;return void 0===s?s=e:void 0!==e&&(n=e),e=>{if(!(e instanceof y))throw new Error("repeat can only be used in text bindings");const i=H.get(e)||[],o=P.get(e)||[],l=[],a=[],r=[];let d,c,h=0;for(const e of t)r[h]=n?n(e,h):h,a[h]=s(e,h),h++;let u=0,p=i.length-1,m=0,g=a.length-1;for(;u<=p&&m<=g;)if(null===i[u])u++;else if(null===i[p])p--;else if(o[u]===r[m])l[m]=C(i[u],a[m]),u++,m++;else if(o[p]===r[g])l[g]=C(i[p],a[g]),p--,g--;else if(o[u]===r[g])l[g]=C(i[u],a[g]),L(e,i[u],l[g+1]),u++,g--;else if(o[p]===r[m])l[m]=C(i[p],a[m]),L(e,i[p],i[u]),p--,m++;else if(void 0===d&&(d=B(r,m,g),c=B(o,u,p)),d.has(o[u]))if(d.has(o[p])){const t=c.get(r[m]),s=void 0!==t?i[t]:null;if(null===s){const t=M(e,i[u]);C(t,a[m]),l[m]=t}else l[m]=C(s,a[m]),L(e,s,i[u]),i[t]=null;m++}else I(i[p]),p--;else I(i[u]),u++;for(;m<=g;){const t=M(e,l[g+1]);C(t,a[m]),l[m++]=t}for(;u<=p;){const t=i[u++];null!==t&&I(t)}H.set(e,l),P.set(e,r)}}),F=["pretty","large","big","small","tall","short","long","handsome","plain","quaint","clean","elegant","easy","angry","crazy","helpful","mushy","odd","unsightly","adorable","important","inexpensive","cheap","expensive","fancy"],j=["red","yellow","blue","green","pink","brown","purple","brown","white","black","orange"],O=["table","chair","house","bbq","desk","car","pony","cookie","sandwich","burger","pizza","mouse","keyboard"];let R=0;const z=t=>R++%t,q=t=>{const e=[];for(let s=0;s<t;s++)e.push({id:D++,label:`${F[z(F.length)]} ${j[z(j.length)]} ${O[z(O.length)]}`,selected:!1});return e};let U=[],D=1,G=-1;const J=t=>{const e=U.findIndex(e=>e.id===t);U.splice(e,1),X()},K=t=>{G>-1&&(U[G].selected=!1),G=U.findIndex(e=>e.id===t),U[G].selected=!0,X()},Q=document.getElementById("container"),X=()=>{((t,e,s)=>{let i=$.get(e);void 0===i&&(n(e,e.firstChild),$.set(e,i=new y(Object.assign({templateFactory:A},s))),i.appendInto(e)),i.setValue(t),i.commit()})(Y(),Q)},Y=()=>S`<div class=container><div class=jumbotron><div class=row><div class=col-md-6><h1>Lit-HTML</h1></div><div class=col-md-6><div class=row><div class="col-sm-6 smallpad"><button type=button class="btn btn-primary btn-block" id=run @click=${()=>{U=q(1e3),X()}}>Create 1,000 rows</button></div><div class="col-sm-6 smallpad"><button type=button class="btn btn-primary btn-block" id=runlots @click=${()=>{U=q(1e4),X()}}>Create 10,000 rows</button></div><div class="col-sm-6 smallpad"><button type=button class="btn btn-primary btn-block" id=add @click=${()=>{U=U.concat(q(1e3)),X()}}>Append 1,000 rows</button></div><div class="col-sm-6 smallpad"><button type=button class="btn btn-primary btn-block" id=update @click=${()=>{for(let t=0;t<U.length;t+=10)U[t],U[t].label+=" !!!";X()}}>Update every 10th row</button></div><div class="col-sm-6 smallpad"><button type=button class="btn btn-primary btn-block" id=clear @click=${()=>{U=[],X()}}>Clear</button></div><div class="col-sm-6 smallpad"><button type=button class="btn btn-primary btn-block" id=swaprows @click=${()=>{if(U.length>998){const t=U[1];U[1]=U[998],U[998]=t}X()}}>Swap Rows</button></div></div></div></div></div><table @click=${t=>{const e=t.target.closest("td"),s=e.getAttribute("data-interaction"),n=parseInt(e.parentNode.id);"delete"===s?J(n):K(n)}} class="table table-hover table-striped test-data"><tbody>${W(U,t=>t.id,t=>S`<tr id=${t.id} class=${t.selected?"danger":""}><td class=col-md-1>${t.id}</td><td class=col-md-4><a>${t.label}</a></td><td data-interaction=delete class=col-md-1><a><span class="glyphicon glyphicon-remove" aria-hidden=true></span></a></td><td class=col-md-6></td></tr>`)}</tbody></table><span class="preloadicon glyphicon glyphicon-remove" aria-hidden=true></span></div>`;X()}();