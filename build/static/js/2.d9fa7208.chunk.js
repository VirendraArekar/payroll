(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{697:function(e,t,r){
/*! @license DOMPurify | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/2.2.2/LICENSE */
e.exports=function(){"use strict";function n(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}else return Array.from(e)}var a=Object.hasOwnProperty,i=Object.setPrototypeOf,o=Object.isFrozen,l=Object.getPrototypeOf,s=Object.getOwnPropertyDescriptor,Me=Object.freeze,e=Object.seal,f=Object.create,t=typeof Reflect!=="undefined"&&Reflect,c=t.apply,u=t.construct;if(!c)c=function e(t,r,n){return t.apply(r,n)};if(!Me)Me=function e(t){return t};if(!e)e=function e(t){return t};if(!u)u=function e(t,r){return new(Function.prototype.bind.apply(t,[null].concat(n(r))))};var Fe=p(Array.prototype.forEach),Ie=p(Array.prototype.pop),Ce=p(Array.prototype.push),ze=p(String.prototype.toLowerCase),Ue=p(String.prototype.match),He=p(String.prototype.replace),je=p(String.prototype.indexOf),Pe=p(String.prototype.trim),Be=p(RegExp.prototype.test),We=r(TypeError);function p(a){return function(e){for(var t=arguments.length,r=Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n];return c(a,e,r)}}function r(n){return function(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return u(n,t)}}function Ge(e,t){if(i)i(e,null);var r=t.length;while(r--){var n=t[r];if(typeof n==="string"){var a=ze(n);if(a!==n){if(!o(t))t[r]=a;n=a}}e[n]=true}return e}function qe(e){var t=f(null);var r=void 0;for(r in e)if(c(a,e,[r]))t[r]=e[r];return t}function Ke(e,t){while(e!==null){var r=s(e,t);if(r){if(r.get)return p(r.get);if(typeof r.value==="function")return p(r.value)}e=l(e)}function n(e){console.warn("fallback value for",e);return null}return n}var Ve=Me(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Ye=Me(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Je=Me(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Xe=Me(["animate","color-profile","cursor","discard","fedropshadow","feimage","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),$e=Me(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover"]),Ze=Me(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Qe=Me(["#text"]),et=Me(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","face","for","headers","height","hidden","high","href","hreflang","id","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","playsinline","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","xmlns","slot"]),tt=Me(["accent-height","accumulate","additive","alignment-baseline","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","targetx","targety","transform","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),rt=Me(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),nt=Me(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),at=e(/\{\{[\s\S]*|[\s\S]*\}\}/gm),it=e(/<%[\s\S]*|[\s\S]*%>/gm),ot=e(/^data-[\-\w.\u00B7-\uFFFF]/),lt=e(/^aria-[\-\w]+$/),st=e(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),ft=e(/^(?:\w+script|data):/i),ct=e(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),ut=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol==="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};function pt(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}else return Array.from(e)}var mt=function e(){return typeof window==="undefined"?null:window},dt=function e(t,r){if((typeof t==="undefined"?"undefined":ut(t))!=="object"||typeof t.createPolicy!=="function")return null;var n=null;var a="data-tt-policy-suffix";if(r.currentScript&&r.currentScript.hasAttribute(a))n=r.currentScript.getAttribute(a);var i="dompurify"+(n?"#"+n:"");try{return t.createPolicy(i,{createHTML:function e(t){return t}})}catch(e){console.warn("TrustedTypes policy "+i+" could not be created.");return null}},m;function vt(){var f=arguments.length>0&&arguments[0]!==undefined?arguments[0]:mt();var p=function e(t){return vt(t)};p.version="2.2.9";p.removed=[];if(!f||!f.document||f.document.nodeType!==9){p.isSupported=false;return p}var c=f.document;var l=f.document;var u=f.DocumentFragment,e=f.HTMLTemplateElement,m=f.Node,s=f.Element,r=f.NodeFilter,t=f.NamedNodeMap,n=t===undefined?f.NamedNodeMap||f.MozNamedAttrMap:t,a=f.Text,i=f.Comment,d=f.DOMParser,o=f.trustedTypes;var v=s.prototype;var h=Ke(v,"cloneNode");var g=Ke(v,"nextSibling");var y=Ke(v,"childNodes");var b=Ke(v,"parentNode");if(typeof e==="function"){var A=l.createElement("template");if(A.content&&A.content.ownerDocument)l=A.content.ownerDocument}var T=dt(o,c);var w=T&&Q?T.createHTML(""):"";var x=l,S=x.implementation,k=x.createNodeIterator,E=x.createDocumentFragment;var R=c.importNode;var _={};try{_=qe(l).documentMode?l.documentMode:{}}catch(e){}var D={};p.isSupported=typeof b==="function"&&S&&typeof S.createHTMLDocument!=="undefined"&&_!==9;var N=at,O=it,L=ot,M=lt,F=ft,I=ct;var C=st;var z=null;var U=Ge({},[].concat(pt(Ve),pt(Ye),pt(Je),pt($e),pt(Qe)));var H=null;var j=Ge({},[].concat(pt(et),pt(tt),pt(rt),pt(nt)));var P=null;var B=null;var W=true;var G=true;var q=false;var K=false;var V=false;var Y=false;var J=false;var X=false;var $=false;var Z=true;var Q=false;var ee=true;var te=true;var re=false;var ne={};var ae=Ge({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);var ie=null;var oe=Ge({},["audio","video","img","source","image","track"]);var le=null;var se=Ge({},["alt","class","for","id","label","name","pattern","placeholder","summary","title","value","style","xmlns"]);var fe="http://www.w3.org/1998/Math/MathML";var ce="http://www.w3.org/2000/svg";var ue="http://www.w3.org/1999/xhtml";var pe=ue;var me=false;var de=null;var ve=l.createElement("form");var he=function e(t){if(de&&de===t)return;if(!t||(typeof t==="undefined"?"undefined":ut(t))!=="object")t={};t=qe(t);z="ALLOWED_TAGS"in t?Ge({},t.ALLOWED_TAGS):U;H="ALLOWED_ATTR"in t?Ge({},t.ALLOWED_ATTR):j;le="ADD_URI_SAFE_ATTR"in t?Ge(qe(se),t.ADD_URI_SAFE_ATTR):se;ie="ADD_DATA_URI_TAGS"in t?Ge(qe(oe),t.ADD_DATA_URI_TAGS):oe;P="FORBID_TAGS"in t?Ge({},t.FORBID_TAGS):{};B="FORBID_ATTR"in t?Ge({},t.FORBID_ATTR):{};ne="USE_PROFILES"in t?t.USE_PROFILES:false;W=t.ALLOW_ARIA_ATTR!==false;G=t.ALLOW_DATA_ATTR!==false;q=t.ALLOW_UNKNOWN_PROTOCOLS||false;K=t.SAFE_FOR_TEMPLATES||false;V=t.WHOLE_DOCUMENT||false;X=t.RETURN_DOM||false;$=t.RETURN_DOM_FRAGMENT||false;Z=t.RETURN_DOM_IMPORT!==false;Q=t.RETURN_TRUSTED_TYPE||false;J=t.FORCE_BODY||false;ee=t.SANITIZE_DOM!==false;te=t.KEEP_CONTENT!==false;re=t.IN_PLACE||false;C=t.ALLOWED_URI_REGEXP||C;pe=t.NAMESPACE||ue;if(K)G=false;if($)X=true;if(ne){z=Ge({},[].concat(pt(Qe)));H=[];if(ne.html===true){Ge(z,Ve);Ge(H,et)}if(ne.svg===true){Ge(z,Ye);Ge(H,tt);Ge(H,nt)}if(ne.svgFilters===true){Ge(z,Je);Ge(H,tt);Ge(H,nt)}if(ne.mathMl===true){Ge(z,$e);Ge(H,rt);Ge(H,nt)}}if(t.ADD_TAGS){if(z===U)z=qe(z);Ge(z,t.ADD_TAGS)}if(t.ADD_ATTR){if(H===j)H=qe(H);Ge(H,t.ADD_ATTR)}if(t.ADD_URI_SAFE_ATTR)Ge(le,t.ADD_URI_SAFE_ATTR);if(te)z["#text"]=true;if(V)Ge(z,["html","head","body"]);if(z.table){Ge(z,["tbody"]);delete P.tbody}if(Me)Me(t);de=t};var ge=Ge({},["mi","mo","mn","ms","mtext"]);var ye=Ge({},["foreignobject","desc","title","annotation-xml"]);var be=Ge({},Ye);Ge(be,Je);Ge(be,Xe);var Ae=Ge({},$e);Ge(Ae,Ze);var Te=function e(t){var r=b(t);if(!r||!r.tagName)r={namespaceURI:ue,tagName:"template"};var n=ze(t.tagName);var a=ze(r.tagName);if(t.namespaceURI===ce){if(r.namespaceURI===ue)return n==="svg";if(r.namespaceURI===fe)return n==="svg"&&(a==="annotation-xml"||ge[a]);return Boolean(be[n])}if(t.namespaceURI===fe){if(r.namespaceURI===ue)return n==="math";if(r.namespaceURI===ce)return n==="math"&&ye[a];return Boolean(Ae[n])}if(t.namespaceURI===ue){if(r.namespaceURI===ce&&!ye[a])return false;if(r.namespaceURI===fe&&!ge[a])return false;var i=Ge({},["title","style","font","a","script"]);return!Ae[n]&&(i[n]||!be[n])}return false};var we=function e(t){Ce(p.removed,{element:t});try{t.parentNode.removeChild(t)}catch(e){try{t.outerHTML=w}catch(e){t.remove()}}};var xe=function e(t,r){try{Ce(p.removed,{attribute:r.getAttributeNode(t),from:r})}catch(e){Ce(p.removed,{attribute:null,from:r})}r.removeAttribute(t);if(t==="is"&&!H[t])if(X||$)try{we(r)}catch(e){}else try{r.setAttribute(t,"")}catch(e){}};var Se=function e(t){var r=void 0;var n=void 0;if(J)t="<remove></remove>"+t;else{var a=Ue(t,/^[\r\n\t ]+/);n=a&&a[0]}var i=T?T.createHTML(t):t;if(pe===ue)try{r=(new d).parseFromString(i,"text/html")}catch(e){}if(!r||!r.documentElement){r=S.createDocument(pe,"template",null);try{r.documentElement.innerHTML=me?"":i}catch(e){}}var o=r.body||r.documentElement;if(t&&n)o.insertBefore(l.createTextNode(n),o.childNodes[0]||null);return V?r.documentElement:o};var ke=function e(t){return k.call(t.ownerDocument||t,t,r.SHOW_ELEMENT|r.SHOW_COMMENT|r.SHOW_TEXT,null,false)};var Ee=function e(t){if(t instanceof a||t instanceof i)return false;if(typeof t.nodeName!=="string"||typeof t.textContent!=="string"||typeof t.removeChild!=="function"||!(t.attributes instanceof n)||typeof t.removeAttribute!=="function"||typeof t.setAttribute!=="function"||typeof t.namespaceURI!=="string"||typeof t.insertBefore!=="function")return true;return false};var Re=function e(t){return(typeof m==="undefined"?"undefined":ut(m))==="object"?t instanceof m:t&&(typeof t==="undefined"?"undefined":ut(t))==="object"&&typeof t.nodeType==="number"&&typeof t.nodeName==="string"};var _e=function e(t,r,n){if(!D[t])return;Fe(D[t],function(e){e.call(p,r,n,de)})};var De=function e(t){var r=void 0;_e("beforeSanitizeElements",t,null);if(Ee(t)){we(t);return true}if(Ue(t.nodeName,/[\u0080-\uFFFF]/)){we(t);return true}var n=ze(t.nodeName);_e("uponSanitizeElement",t,{tagName:n,allowedTags:z});if(!Re(t.firstElementChild)&&(!Re(t.content)||!Re(t.content.firstElementChild))&&Be(/<[/\w]/g,t.innerHTML)&&Be(/<[/\w]/g,t.textContent)){we(t);return true}if(!z[n]||P[n]){if(te&&!ae[n]){var a=b(t)||t.parentNode;var i=y(t)||t.childNodes;if(i&&a){var o=i.length;for(var l=o-1;l>=0;--l)a.insertBefore(h(i[l],true),g(t))}}we(t);return true}if(t instanceof s&&!Te(t)){we(t);return true}if((n==="noscript"||n==="noembed")&&Be(/<\/no(script|embed)/i,t.innerHTML)){we(t);return true}if(K&&t.nodeType===3){r=t.textContent;r=He(r,N," ");r=He(r,O," ");if(t.textContent!==r){Ce(p.removed,{element:t.cloneNode()});t.textContent=r}}_e("afterSanitizeElements",t,null);return false};var Ne=function e(t,r,n){if(ee&&(r==="id"||r==="name")&&(n in l||n in ve))return false;if(G&&Be(L,r));else if(W&&Be(M,r));else if(!H[r]||B[r])return false;else if(le[r]);else if(Be(C,He(n,I,"")));else if((r==="src"||r==="xlink:href"||r==="href")&&t!=="script"&&je(n,"data:")===0&&ie[t]);else if(q&&!Be(F,He(n,I,"")));else if(!n);else return false;return true};var Oe=function e(t){var r=void 0;var n=void 0;var a=void 0;var i=void 0;_e("beforeSanitizeAttributes",t,null);var o=t.attributes;if(!o)return;var l={attrName:"",attrValue:"",keepAttr:true,allowedAttributes:H};i=o.length;while(i--){r=o[i];var s=r,f=s.name,c=s.namespaceURI;n=Pe(r.value);a=ze(f);l.attrName=a;l.attrValue=n;l.keepAttr=true;l.forceKeepAttr=undefined;_e("uponSanitizeAttribute",t,l);n=l.attrValue;if(l.forceKeepAttr)continue;xe(f,t);if(!l.keepAttr)continue;if(Be(/\/>/i,n)){xe(f,t);continue}if(K){n=He(n,N," ");n=He(n,O," ")}var u=t.nodeName.toLowerCase();if(!Ne(u,a,n))continue;try{if(c)t.setAttributeNS(c,f,n);else t.setAttribute(f,n);Ie(p.removed)}catch(e){}}_e("afterSanitizeAttributes",t,null)};var Le=function e(t){var r=void 0;var n=ke(t);_e("beforeSanitizeShadowDOM",t,null);while(r=n.nextNode()){_e("uponSanitizeShadowNode",r,null);if(De(r))continue;if(r.content instanceof u)e(r.content);Oe(r)}_e("afterSanitizeShadowDOM",t,null)};p.sanitize=function(e,t){var r=void 0;var n=void 0;var a=void 0;var i=void 0;var o=void 0;me=!e;if(me)e="\x3c!--\x3e";if(typeof e!=="string"&&!Re(e))if(typeof e.toString!=="function")throw We("toString is not a function");else{e=e.toString();if(typeof e!=="string")throw We("dirty is not a string, aborting")}if(!p.isSupported){if(ut(f.toStaticHTML)==="object"||typeof f.toStaticHTML==="function"){if(typeof e==="string")return f.toStaticHTML(e);if(Re(e))return f.toStaticHTML(e.outerHTML)}return e}if(!Y)he(t);p.removed=[];if(typeof e==="string")re=false;if(re);else if(e instanceof m){r=Se("\x3c!----\x3e");n=r.ownerDocument.importNode(e,true);if(n.nodeType===1&&n.nodeName==="BODY")r=n;else if(n.nodeName==="HTML")r=n;else r.appendChild(n)}else{if(!X&&!K&&!V&&e.indexOf("<")===-1)return T&&Q?T.createHTML(e):e;r=Se(e);if(!r)return X?null:w}if(r&&J)we(r.firstChild);var l=ke(re?e:r);while(a=l.nextNode()){if(a.nodeType===3&&a===i)continue;if(De(a))continue;if(a.content instanceof u)Le(a.content);Oe(a);i=a}i=null;if(re)return e;if(X){if($){o=E.call(r.ownerDocument);while(r.firstChild)o.appendChild(r.firstChild)}else o=r;if(Z)o=R.call(c,o,true);return o}var s=V?r.outerHTML:r.innerHTML;if(K){s=He(s,N," ");s=He(s,O," ")}return T&&Q?T.createHTML(s):s};p.setConfig=function(e){he(e);Y=true};p.clearConfig=function(){de=null;Y=false};p.isValidAttribute=function(e,t,r){if(!de)he({});var n=ze(e);var a=ze(t);return Ne(n,a,r)};p.addHook=function(e,t){if(typeof t!=="function")return;D[e]=D[e]||[];Ce(D[e],t)};p.removeHook=function(e){if(D[e])Ie(D[e])};p.removeHooks=function(e){if(D[e])D[e]=[]};p.removeAllHooks=function(){D={}};return p}return vt()}()}}]);