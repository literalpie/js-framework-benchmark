let e=0;const t=t=>e++%t,n=["pretty","large","big","small","tall","short","long","handsome","plain","quaint","clean","elegant","easy","angry","crazy","helpful","mushy","odd","unsightly","adorable","important","inexpensive","cheap","expensive","fancy"],l=["red","yellow","blue","green","pink","brown","purple","brown","white","black","orange"],s=["table","chair","house","bbq","desk","car","pony","cookie","sandwich","burger","pizza","mouse","keyboard"];let i=[],o=0,c=1;function a(e){const i=Array(e);for(let o=0;o<e;o++)i[o]={id:c++,label:`${n[t(n.length)]} ${l[t(l.length)]} ${s[t(s.length)]}`};return i}function d(){for(let e=0;e<i.length;e+=10)i[e].label+=" !!!"}function r(){if(i.length>998){const e=i[1];i[1]=i[998],i[998]=e}}function h(e){const t=i.findIndex(t=>t.id===e);return i.splice(t,1),t}function f(e){o=e}const u=document.getElementById("tbody"),m=document.createElement("tr");function g(e){const t=m.cloneNode(!0),n=t.firstChild,l=n.nextSibling.firstChild;return n.textContent=e.id,l.textContent=e.label,t}m.innerHTML="<td class='col-md-1'></td><td class='col-md-4'><a></a></td><td class='col-md-1'><a><span class='glyphicon glyphicon-remove' aria-hidden='true'></span></a></td><td class='col-md-6'></td>";let p=0,b=null;function y(){if(p!==o&&(p=o,b&&(b.className=""),0!==o)){const e=i.findIndex(e=>e.id===o);-1!==e?(b=u.childNodes[e]).className="danger":b=null}}let x=0;function N(){x=0,u.textContent=""}function C(){for(let e=x;e<i.length;e++)u.appendChild(g(i[e]));x=i.length}document.getElementById("main").addEventListener("click",({target:e})=>{if(e.matches("#add"))i=i.concat(a(1e3)),o=0,C();else if(e.matches("#run"))i=a(1e3),o=0,N(),C();else if(e.matches("#runlots"))i=a(1e4),o=0,N(),C();else if(e.matches("#update")){d();const e=u.childNodes;for(let t=0;t<i.length;t+=10)e[t].childNodes[1].childNodes[0].textContent=i[t].label}else if(e.matches("#clear"))i=[],o=0,N();else if(e.matches("#swaprows")){r();const e=u.childNodes,t=e[1],n=e[998],l=t.nextSibling,s=n.nextSibling;u.insertBefore(t,s),u.insertBefore(n,l)}}),u.addEventListener("click",({target:e})=>{const t=Number.parseInt(e.closest("tr").firstChild.firstChild.nodeValue);if(e.matches(".glyphicon-remove")){const e=h(t);u.childNodes[e].remove()}else e.matches("a")&&(f(t),y())});