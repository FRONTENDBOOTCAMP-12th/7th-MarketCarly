(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function e(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(i){if(i.ep)return;i.ep=!0;const o=e(i);fetch(i.href,o)}})();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const N=globalThis,I=N.ShadowRoot&&(N.ShadyCSS===void 0||N.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,j=Symbol(),D=new WeakMap;let tt=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==j)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(I&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=D.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&D.set(e,t))}return t}toString(){return this.cssText}};const at=r=>new tt(typeof r=="string"?r:r+"",void 0,j),et=(r,...t)=>{const e=r.length===1?r[0]:t.reduce((s,i,o)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[o+1],r[0]);return new tt(e,r,j)},lt=(r,t)=>{if(I)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),i=N.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},V=I?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return at(e)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:ct,defineProperty:ht,getOwnPropertyDescriptor:dt,getOwnPropertyNames:pt,getOwnPropertySymbols:ut,getPrototypeOf:ft}=Object,$=globalThis,F=$.trustedTypes,gt=F?F.emptyScript:"",R=$.reactiveElementPolyfillSupport,E=(r,t)=>r,q={toAttribute(r,t){switch(t){case Boolean:r=r?gt:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},st=(r,t)=>!ct(r,t),W={attribute:!0,type:String,converter:q,reflect:!1,hasChanged:st};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),$.litPropertyMetadata??($.litPropertyMetadata=new WeakMap);class b extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=W){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&ht(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:o}=dt(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get(){return i==null?void 0:i.call(this)},set(n){const c=i==null?void 0:i.call(this);o.call(this,n),this.requestUpdate(t,c,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??W}static _$Ei(){if(this.hasOwnProperty(E("elementProperties")))return;const t=ft(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(E("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(E("properties"))){const e=this.properties,s=[...pt(e),...ut(e)];for(const i of s)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(V(i))}else t!==void 0&&e.push(V(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return lt(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EC(t,e){var o;const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){const n=(((o=s.converter)==null?void 0:o.toAttribute)!==void 0?s.converter:q).toAttribute(e,s.type);this._$Em=t,n==null?this.removeAttribute(i):this.setAttribute(i,n),this._$Em=null}}_$AK(t,e){var o;const s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){const n=s.getPropertyOptions(i),c=typeof n.converter=="function"?{fromAttribute:n.converter}:((o=n.converter)==null?void 0:o.fromAttribute)!==void 0?n.converter:q;this._$Em=i,this[i]=c.fromAttribute(e,n.type),this._$Em=null}}requestUpdate(t,e,s){if(t!==void 0){if(s??(s=this.constructor.getPropertyOptions(t)),!(s.hasChanged??st)(this[t],e))return;this.P(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(t,e,s){this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this._$Em!==t&&(this._$Ej??(this._$Ej=new Set)).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,n]of this._$Ep)this[o]=n;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[o,n]of i)n.wrapped!==!0||this._$AL.has(o)||this[o]===void 0||this.P(o,this[o],n)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(s=this._$EO)==null||s.forEach(i=>{var o;return(o=i.hostUpdate)==null?void 0:o.call(i)}),this.update(e)):this._$EU()}catch(i){throw t=!1,this._$EU(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&(this._$Ej=this._$Ej.forEach(e=>this._$EC(e,this[e]))),this._$EU()}updated(t){}firstUpdated(t){}}b.elementStyles=[],b.shadowRootOptions={mode:"open"},b[E("elementProperties")]=new Map,b[E("finalized")]=new Map,R==null||R({ReactiveElement:b}),($.reactiveElementVersions??($.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const w=globalThis,T=w.trustedTypes,K=T?T.createPolicy("lit-html",{createHTML:r=>r}):void 0,it="$lit$",g=`lit$${Math.random().toFixed(9).slice(2)}$`,rt="?"+g,$t=`<${rt}>`,y=document,x=()=>y.createComment(""),P=r=>r===null||typeof r!="object"&&typeof r!="function",B=Array.isArray,mt=r=>B(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",M=`[ 	
\f\r]`,S=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,J=/-->/g,Z=/>/g,m=RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),G=/'/g,Q=/"/g,ot=/^(?:script|style|textarea|title)$/i,_t=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),yt=_t(1),A=Symbol.for("lit-noChange"),d=Symbol.for("lit-nothing"),X=new WeakMap,_=y.createTreeWalker(y,129);function nt(r,t){if(!B(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return K!==void 0?K.createHTML(t):t}const bt=(r,t)=>{const e=r.length-1,s=[];let i,o=t===2?"<svg>":t===3?"<math>":"",n=S;for(let c=0;c<e;c++){const a=r[c];let h,p,l=-1,u=0;for(;u<a.length&&(n.lastIndex=u,p=n.exec(a),p!==null);)u=n.lastIndex,n===S?p[1]==="!--"?n=J:p[1]!==void 0?n=Z:p[2]!==void 0?(ot.test(p[2])&&(i=RegExp("</"+p[2],"g")),n=m):p[3]!==void 0&&(n=m):n===m?p[0]===">"?(n=i??S,l=-1):p[1]===void 0?l=-2:(l=n.lastIndex-p[2].length,h=p[1],n=p[3]===void 0?m:p[3]==='"'?Q:G):n===Q||n===G?n=m:n===J||n===Z?n=S:(n=m,i=void 0);const f=n===m&&r[c+1].startsWith("/>")?" ":"";o+=n===S?a+$t:l>=0?(s.push(h),a.slice(0,l)+it+a.slice(l)+g+f):a+g+(l===-2?c:f)}return[nt(r,o+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class k{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,n=0;const c=t.length-1,a=this.parts,[h,p]=bt(t,e);if(this.el=k.createElement(h,s),_.currentNode=this.el.content,e===2||e===3){const l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(i=_.nextNode())!==null&&a.length<c;){if(i.nodeType===1){if(i.hasAttributes())for(const l of i.getAttributeNames())if(l.endsWith(it)){const u=p[n++],f=i.getAttribute(l).split(g),O=/([.?@])?(.*)/.exec(u);a.push({type:1,index:o,name:O[2],strings:f,ctor:O[1]==="."?vt:O[1]==="?"?St:O[1]==="@"?Et:H}),i.removeAttribute(l)}else l.startsWith(g)&&(a.push({type:6,index:o}),i.removeAttribute(l));if(ot.test(i.tagName)){const l=i.textContent.split(g),u=l.length-1;if(u>0){i.textContent=T?T.emptyScript:"";for(let f=0;f<u;f++)i.append(l[f],x()),_.nextNode(),a.push({type:2,index:++o});i.append(l[u],x())}}}else if(i.nodeType===8)if(i.data===rt)a.push({type:2,index:o});else{let l=-1;for(;(l=i.data.indexOf(g,l+1))!==-1;)a.push({type:7,index:o}),l+=g.length-1}o++}}static createElement(t,e){const s=y.createElement("template");return s.innerHTML=t,s}}function v(r,t,e=r,s){var n,c;if(t===A)return t;let i=s!==void 0?(n=e._$Co)==null?void 0:n[s]:e._$Cl;const o=P(t)?void 0:t._$litDirective$;return(i==null?void 0:i.constructor)!==o&&((c=i==null?void 0:i._$AO)==null||c.call(i,!1),o===void 0?i=void 0:(i=new o(r),i._$AT(r,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=i:e._$Cl=i),i!==void 0&&(t=v(r,i._$AS(r,t.values),i,s)),t}class At{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=((t==null?void 0:t.creationScope)??y).importNode(e,!0);_.currentNode=i;let o=_.nextNode(),n=0,c=0,a=s[0];for(;a!==void 0;){if(n===a.index){let h;a.type===2?h=new U(o,o.nextSibling,this,t):a.type===1?h=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(h=new wt(o,this,t)),this._$AV.push(h),a=s[++c]}n!==(a==null?void 0:a.index)&&(o=_.nextNode(),n++)}return _.currentNode=y,i}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class U{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=d,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=v(this,t,e),P(t)?t===d||t==null||t===""?(this._$AH!==d&&this._$AR(),this._$AH=d):t!==this._$AH&&t!==A&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):mt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==d&&P(this._$AH)?this._$AA.nextSibling.data=t:this.T(y.createTextNode(t)),this._$AH=t}$(t){var o;const{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=k.createElement(nt(s.h,s.h[0]),this.options)),s);if(((o=this._$AH)==null?void 0:o._$AD)===i)this._$AH.p(e);else{const n=new At(i,this),c=n.u(this.options);n.p(e),this.T(c),this._$AH=n}}_$AC(t){let e=X.get(t.strings);return e===void 0&&X.set(t.strings,e=new k(t)),e}k(t){B(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const o of t)i===e.length?e.push(s=new U(this.O(x()),this.O(x()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,o){this.type=1,this._$AH=d,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=d}_$AI(t,e=this,s,i){const o=this.strings;let n=!1;if(o===void 0)t=v(this,t,e,0),n=!P(t)||t!==this._$AH&&t!==A,n&&(this._$AH=t);else{const c=t;let a,h;for(t=o[0],a=0;a<o.length-1;a++)h=v(this,c[s+a],e,a),h===A&&(h=this._$AH[a]),n||(n=!P(h)||h!==this._$AH[a]),h===d?t=d:t!==d&&(t+=(h??"")+o[a+1]),this._$AH[a]=h}n&&!i&&this.j(t)}j(t){t===d?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class vt extends H{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===d?void 0:t}}class St extends H{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==d)}}class Et extends H{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){if((t=v(this,t,e,0)??d)===A)return;const s=this._$AH,i=t===d&&s!==d||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==d&&(s===d||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class wt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){v(this,t)}}const L=w.litHtmlPolyfillSupport;L==null||L(k,U),(w.litHtmlVersions??(w.litHtmlVersions=[])).push("3.2.1");const Ct=(r,t,e)=>{const s=(e==null?void 0:e.renderBefore)??t;let i=s._$litPart$;if(i===void 0){const o=(e==null?void 0:e.renderBefore)??null;s._$litPart$=i=new U(t.insertBefore(x(),o),o,void 0,e??{})}return i._$AI(r),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class C extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ct(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return A}}var Y;C._$litElement$=!0,C.finalized=!0,(Y=globalThis.litElementHydrateSupport)==null||Y.call(globalThis,{LitElement:C});const z=globalThis.litElementPolyfillSupport;z==null||z({LitElement:C});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.1.1");const xt=et`
  html,body,div,span,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,abbr,address,cite,code,del,dfn,em,img,ins,kbd,q,samp,small,strong,sub,sup,var,b,i,dl,dt,dd,ol,ul,li,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td,article,aside,canvas,details,figcaption,figure,footer,header,hgroup,menu,nav,section,summary,time,mark,audio,video{margin:0;padding:0;border:0;outline:0;font-size:100%;vertical-align:baseline;background:transparent}
  body{line-height:1}
  article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}
  nav ul{list-style:none}
  ul{list-style:none}
  img{width:100%}
  blockquote,q{quotes:none}
  blockquote:before,blockquote:after,q:before,q:after{content:none}
  a{margin:0;padding:0;font-size:100%;vertical-align:baseline;background:transparent}
  a{color:inherit; text-decoration: none}
  ins{background-color:#ff9;color:#000;text-decoration:none}
  mark{background-color:#ff9;color:#000;font-style:italic;font-weight:bold}
  del{text-decoration:line-through}
  abbr[title],dfn[title]{border-bottom:1px dotted;cursor:help}
  table{border-collapse:collapse;border-spacing:0}
  hr{display:block;height:1px;border:0;border-top:1px solid #ccc;margin:1em 0;padding:0}
  input,select{vertical-align:middle}
`;class Pt extends C{constructor(){super(),this.attachShadow({mode:"open"}),this.filterTitle="카테고리",this.selectedFilterCount="1",this.filterName="샐러드 · 간편식",this.filterItemCount="65"}static get properties(){return{filterTitle:{type:String},selectedFilterCount:{type:Number},filterName:{type:String},filterItemCount:{type:Number}}}static get styles(){return[xt,et`
        button {
          font-family: 'Pretendard Variable', Pretendard, sans-serif;
          border: none;
          background: none;
          padding: 0;
          cursor: pointer;
        }

        .filters {
          width: 13.75rem;
          display: flex;
          flex-direction: column;
          border-bottom: 0.0625rem solid var(--gray--100);
        }

        .filter {
          display: flex;
          justify-content: space-between;
          padding: 0.875rem 0;
        }

        .filter__info {
          display: flex;
          align-items: center;
          gap: 0.5rem;

          span {
            font-weight: var(--font-semibold);
          }
        }

        .name {
          color: var(--content);
          font-size: var(--text-base);
        }

        .items {
          color: var(--gray--300);
          font-size: var(--text-xs);
        }

        .filter__dropdown {
          display: inline-block;
          width: 1.125rem;
          height: 1.125rem;
          background: url('/assets/images/Arrow-down.svg');
          transition: transform 0.2s ease-in-out;

          &.isActive {
            transform: rotate(-180deg);
          }
        }

        .categories {
          display: none;

          &.isActive {
            display: block;
          }

          li {
            margin-top: 0.5rem;
            margin-bottom: 1rem;
          }

        }
        
        .category {
          display: flex;
          align-items: center;
          cursor: pointer;

          &.isSelected {
            .category__icon-check {
              background: url('/assets/images/isChecked=true.svg');
            }
          }
        }

        .category__checkbox {
          position: absolute;
          appearance: none;
        }

        .category__icon-check {
          display: inline-block;
          width: 1.5rem;
          height: 1.5rem;
          background: url('/assets/images/isChecked=false.svg') no-repeat
            center/cover;
          margin-right: 0.5rem;
          cursor: pointer;
        }

        .category__name {
          color: var(--content);
          font-size: var(--text-base);
          margin-right: 0.25rem;

          &:hover {
            color: var(--secondary);
          }
        }

        .category__items {
          color: var(--gray--300);
          font-size: var(--text-xs);
        }

        .more-category {
          display: none;

          &.isActive {
            display: flex;
            justify-content: center;
            align-items: center;
            color: var(--gray--300);
            font-weight: var(--font-semibold);
            margin-top: 0.375rem;
            margin-bottom: 1.125rem;
          }
        }

        .more-category__arrow {
          display: inline-block;
          width: 1.125rem;
          height: 1.125rem;
          background: url('/assets/images/Arrow-right.svg');
        }
      `]}handleClickFilter(){const t=this.shadowRoot.querySelector(".filter__dropdown"),e=this.shadowRoot.querySelector(".categories"),s=this.shadowRoot.querySelector(".more-category");t.classList.toggle("isActive"),e.classList.toggle("isActive"),s.classList.toggle("isActive")}handleClickCategory(){this.shadowRoot.querySelector(".category").classList.toggle("isSelected")}render(){return yt`
      <div class="filters">
        <button 
          class="filter" 
          @click=${this.handleClickFilter}
        >
          <div class="filter__info">
            <span class="name">${this.filterTitle}</span>
            <span class="items">${this.selectedFilterCount}</span>
          </div>
          <span class="filter__dropdown"></span>
        </button>
        <ul class="categories">
          <li>
            <div 
              class="category"
              @click=${this.handleClickCategory}
            >
              <input class="category__checkbox" type="checkbox" id="checkbox" />
              <label class="category__icon-check" for="checkbox"></label>
              <span class="category__name">${this.filterName}</span>
              <span class="category__items">${this.filterItemCount}</span>
            </div>
          </li>
        </ul>
        <button class="more-category">
          <span class="more-category__text">카테고리 더 보기</span>
          <span class="more-category__arrow"></span>
        </button>
      </div>
    `}}customElements.define("filter-item",Pt);
