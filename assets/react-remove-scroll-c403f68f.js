import{_ as j,a as P,b as Q}from"./tslib-c672c11e.js";import{r as a}from"./react-f80be28f.js";import{f as _,z as $,R as q}from"./react-remove-scroll-bar-488c5931.js";import{c as G,e as J}from"./use-sidecar-af9445ca.js";import{u as K}from"./use-callback-ref-085d136d.js";import{s as U}from"./react-style-singleton-eea99272.js";var V=G(),Y=function(){},X=a.forwardRef(function(e,t){var o=a.useRef(null),l=a.useState({onScrollCapture:Y,onWheelCapture:Y,onTouchMoveCapture:Y}),i=l[0],s=l[1],f=e.forwardProps,c=e.children,m=e.className,S=e.removeScrollBar,b=e.enabled,C=e.shards,w=e.sideCar,R=e.noIsolation,y=e.inert,r=e.allowPinchZoom,n=e.as,d=n===void 0?"div":n,h=e.gapMode,v=j(e,["forwardProps","children","className","removeScrollBar","enabled","shards","sideCar","noIsolation","inert","allowPinchZoom","as","gapMode"]),g=w,u=K([o,t]),E=P(P({},v),i);return a.createElement(a.Fragment,null,b&&a.createElement(g,{sideCar:V,removeScrollBar:S,shards:C,noIsolation:R,inert:y,setCallbacks:s,allowPinchZoom:!!r,lockRef:o,gapMode:h}),f?a.cloneElement(a.Children.only(c),P(P({},E),{ref:u})):a.createElement(d,P({},E,{className:m,ref:u}),c))});X.defaultProps={enabled:!0,removeScrollBar:!0,inert:!1};X.classNames={fullWidth:_,zeroRight:$};var D=!1;if(typeof window<"u")try{var T=Object.defineProperty({},"passive",{get:function(){return D=!0,!0}});window.addEventListener("test",T,T),window.removeEventListener("test",T,T)}catch{D=!1}var k=D?{passive:!1}:!1,p=function(e){return e.tagName==="TEXTAREA"},Z=function(e,t){var o=window.getComputedStyle(e);return o[t]!=="hidden"&&!(o.overflowY===o.overflowX&&!p(e)&&o[t]==="visible")},O=function(e){return Z(e,"overflowY")},ee=function(e){return Z(e,"overflowX")},I=function(e,t){var o=t.ownerDocument,l=t;do{typeof ShadowRoot<"u"&&l instanceof ShadowRoot&&(l=l.host);var i=F(e,l);if(i){var s=x(e,l),f=s[1],c=s[2];if(f>c)return!0}l=l.parentNode}while(l&&l!==o.body);return!1},re=function(e){var t=e.scrollTop,o=e.scrollHeight,l=e.clientHeight;return[t,o,l]},te=function(e){var t=e.scrollLeft,o=e.scrollWidth,l=e.clientWidth;return[t,o,l]},F=function(e,t){return e==="v"?O(t):ee(t)},x=function(e,t){return e==="v"?re(t):te(t)},ae=function(e,t){return e==="h"&&t==="rtl"?-1:1},ne=function(e,t,o,l,i){var s=ae(e,window.getComputedStyle(t).direction),f=s*l,c=o.target,m=t.contains(c),S=!1,b=f>0,C=0,w=0;do{var R=x(e,c),y=R[0],r=R[1],n=R[2],d=r-n-s*y;(y||d)&&F(e,c)&&(C+=d,w+=y),c=c.parentNode}while(!m&&c!==document.body||m&&(t.contains(c)||t===c));return(b&&(i&&C===0||!i&&f>C)||!b&&(i&&w===0||!i&&-f>w))&&(S=!0),S},N=function(e){return"changedTouches"in e?[e.changedTouches[0].clientX,e.changedTouches[0].clientY]:[0,0]},A=function(e){return[e.deltaX,e.deltaY]},H=function(e){return e&&"current"in e?e.current:e},le=function(e,t){return e[0]===t[0]&&e[1]===t[1]},oe=function(e){return`
  .block-interactivity-`.concat(e,` {pointer-events: none;}
  .allow-interactivity-`).concat(e,` {pointer-events: all;}
`)},ce=0,B=[];function ie(e){var t=a.useRef([]),o=a.useRef([0,0]),l=a.useRef(),i=a.useState(ce++)[0],s=a.useState(U)[0],f=a.useRef(e);a.useEffect(function(){f.current=e},[e]),a.useEffect(function(){if(e.inert){document.body.classList.add("block-interactivity-".concat(i));var r=Q([e.lockRef.current],(e.shards||[]).map(H),!0).filter(Boolean);return r.forEach(function(n){return n.classList.add("allow-interactivity-".concat(i))}),function(){document.body.classList.remove("block-interactivity-".concat(i)),r.forEach(function(n){return n.classList.remove("allow-interactivity-".concat(i))})}}},[e.inert,e.lockRef.current,e.shards]);var c=a.useCallback(function(r,n){if("touches"in r&&r.touches.length===2)return!f.current.allowPinchZoom;var d=N(r),h=o.current,v="deltaX"in r?r.deltaX:h[0]-d[0],g="deltaY"in r?r.deltaY:h[1]-d[1],u,E=r.target,L=Math.abs(v)>Math.abs(g)?"h":"v";if("touches"in r&&L==="h"&&E.type==="range")return!1;var M=I(L,E);if(!M)return!0;if(M?u=L:(u=L==="v"?"h":"v",M=I(L,E)),!M)return!1;if(!l.current&&"changedTouches"in r&&(v||g)&&(l.current=u),!u)return!0;var W=l.current||u;return ne(W,n,r,W==="h"?v:g,!0)},[]),m=a.useCallback(function(r){var n=r;if(!(!B.length||B[B.length-1]!==s)){var d="deltaY"in n?A(n):N(n),h=t.current.filter(function(u){return u.name===n.type&&u.target===n.target&&le(u.delta,d)})[0];if(h&&h.should){n.cancelable&&n.preventDefault();return}if(!h){var v=(f.current.shards||[]).map(H).filter(Boolean).filter(function(u){return u.contains(n.target)}),g=v.length>0?c(n,v[0]):!f.current.noIsolation;g&&n.cancelable&&n.preventDefault()}}},[]),S=a.useCallback(function(r,n,d,h){var v={name:r,delta:n,target:d,should:h};t.current.push(v),setTimeout(function(){t.current=t.current.filter(function(g){return g!==v})},1)},[]),b=a.useCallback(function(r){o.current=N(r),l.current=void 0},[]),C=a.useCallback(function(r){S(r.type,A(r),r.target,c(r,e.lockRef.current))},[]),w=a.useCallback(function(r){S(r.type,N(r),r.target,c(r,e.lockRef.current))},[]);a.useEffect(function(){return B.push(s),e.setCallbacks({onScrollCapture:C,onWheelCapture:C,onTouchMoveCapture:w}),document.addEventListener("wheel",m,k),document.addEventListener("touchmove",m,k),document.addEventListener("touchstart",b,k),function(){B=B.filter(function(r){return r!==s}),document.removeEventListener("wheel",m,k),document.removeEventListener("touchmove",m,k),document.removeEventListener("touchstart",b,k)}},[]);var R=e.removeScrollBar,y=e.inert;return a.createElement(a.Fragment,null,y?a.createElement(s,{styles:oe(i)}):null,R?a.createElement(q,{gapMode:e.gapMode}):null)}const ue=J(V,ie);var z=a.forwardRef(function(e,t){return a.createElement(X,P({},e,{ref:t,sideCar:ue}))});z.classNames=X.classNames;const ge=z;export{ge as R};
