(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{RXBc:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return i}));n("f3/d"),n("L9s1"),n("Vd3H"),n("OG14"),n("Z2Ku"),n("KKXr");var a=n("q1tI"),r=n.n(a),c=n("YwZP"),o="wubrg".split(""),u=function(e){return function(t){return e(t.target.value)}},l=function(e){var t=e.colors,n=e.expansion,c=Object(a.useState)([]),u=c[0],l=c[1];return Object(a.useEffect)((function(){if(n){var e=(t.split("").filter((function(e){return o.includes(e)}))||o).map((function(e){return"c:"+e})).join(" or ");fetch("https://api.scryfall.com/cards/search?order=cmc&q=s:"+n+"+(t:instant or o:flash)+("+e+")").then((function(e){return e.json()})).then((function(e){e.data&&l(e.data.map((function(e){return(e.image_uris||e.card_faces[0].image_uris).normal})))}))}else l([])}),[t,n]),r.a.createElement("div",null,r.a.createElement("div",{style:{maxWidth:1e3}},u.map((function(e){return r.a.createElement("img",{width:"200",src:e,alt:"",key:e})}))),r.a.createElement("br",null))};function i(){var e=Object(a.useState)(Object(c.useLocation)().search.slice(1)),t=e[0],n=e[1],o=Object(a.useState)(""),i=o[0],s=o[1],f=Object(a.useState)([]),d=f[0],p=f[1];return Object(a.useEffect)((function(){fetch("https://api.scryfall.com/sets").then((function(e){return e.json()})).then((function(e){e.data&&p(e.data.filter((function(e){return!e.parent_set_code&&!["spellbook","promo","funny","box","duel_deck","commander"].includes(e.set_type)&&!e.foil_only})).sort((function(e){return e.released_at})))}))}),[]),r.a.createElement("div",null,"expansion:",r.a.createElement("select",{value:t,onChange:u(n),onBlur:u(n)},d.map((function(e){return r.a.createElement("option",{value:e.code,key:e.id},e.code.toUpperCase()," - ",e.name)}))),r.a.createElement("br",null),"colors:",r.a.createElement("input",{type:"text",value:i,placeholder:"ur",onChange:u(s)}),r.a.createElement("br",null),r.a.createElement(l,{colors:i,expansion:t}))}}}]);
//# sourceMappingURL=component---src-pages-index-js-93ee72ab632a47791acb.js.map