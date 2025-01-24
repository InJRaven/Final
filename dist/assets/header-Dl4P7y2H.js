import{R as i,r as m,S as b,A as w,j as r,L as j,N as x}from"./index--MCR1wgl.js";var z=["title"],N=["title"];function c(){return c=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var l in a)Object.prototype.hasOwnProperty.call(a,l)&&(t[l]=a[l])}return t},c.apply(this,arguments)}function u(t,e){if(t==null)return{};var a=y(t,e),l,n;if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);for(n=0;n<s.length;n++)l=s[n],!(e.indexOf(l)>=0)&&Object.prototype.propertyIsEnumerable.call(t,l)&&(a[l]=t[l])}return a}function y(t,e){if(t==null)return{};var a={},l=Object.keys(t),n,s;for(s=0;s<l.length;s++)n=l[s],!(e.indexOf(n)>=0)&&(a[n]=t[n]);return a}var H=function(e){var a=e.title,l=u(e,z);return i.createElement("svg",c({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 513 342"},l),a&&i.createElement("title",null,a),i.createElement("path",{fill:"#FFF",d:"M0 0h513v342H0z"}),i.createElement("path",{d:"M0 0h513v26.3H0zm0 52.6h513v26.3H0zm0 52.6h513v26.3H0zm0 52.6h513v26.3H0zm0 52.7h513v26.3H0zm0 52.6h513v26.3H0zm0 52.6h513V342H0z",fill:"#D80027"}),i.createElement("path",{fill:"#2E52B2",d:"M0 0h256.5v184.1H0z"}),i.createElement("path",{d:"m47.8 138.9-4-12.8-4.4 12.8H26.2l10.7 7.7-4 12.8 10.9-7.9 10.6 7.9-4.1-12.8 10.9-7.7zm56.3 0-4.1-12.8-4.2 12.8H82.6l10.7 7.7-4 12.8 10.7-7.9 10.8 7.9-4-12.8 10.7-7.7zm56.5 0-4.3-12.8-4 12.8h-13.5l11 7.7-4.2 12.8 10.7-7.9 11 7.9-4.2-12.8 10.7-7.7zm56.2 0-4-12.8-4.2 12.8h-13.3l10.8 7.7-4 12.8 10.7-7.9 10.8 7.9-4.3-12.8 11-7.7zM100 75.3l-4.2 12.8H82.6L93.3 96l-4 12.6 10.7-7.8 10.8 7.8-4-12.6 10.7-7.9h-13.4zm-56.2 0-4.4 12.8H26.2L36.9 96l-4 12.6 10.9-7.8 10.6 7.8L50.3 96l10.9-7.9H47.8zm112.5 0-4 12.8h-13.5l11 7.9-4.2 12.6 10.7-7.8 11 7.8-4.2-12.6 10.7-7.9h-13.2zm56.5 0-4.2 12.8h-13.3l10.8 7.9-4 12.6 10.7-7.8 10.8 7.8-4.3-12.6 11-7.9h-13.5zm-169-50.6-4.4 12.6H26.2l10.7 7.9-4 12.7L43.8 50l10.6 7.9-4.1-12.7 10.9-7.9H47.8zm56.2 0-4.2 12.6H82.6l10.7 7.9-4 12.7L100 50l10.8 7.9-4-12.7 10.7-7.9h-13.4zm56.3 0-4 12.6h-13.5l11 7.9-4.2 12.7 10.7-7.9 11 7.9-4.2-12.7 10.7-7.9h-13.2zm56.5 0-4.2 12.6h-13.3l10.8 7.9-4 12.7 10.7-7.9 10.8 7.9-4.3-12.7 11-7.9h-13.5z",fill:"#FFF"}))},E=function(e){var a=e.title,l=u(e,N);return i.createElement("svg",c({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 85.333 512 341.333"},l),a&&i.createElement("title",null,a),i.createElement("path",{fill:"#D80027",d:"M196.641 85.337H0v341.326h512V85.337z"}),i.createElement("path",{fill:"#FFDA44",d:"m256 157.279 22.663 69.747H352l-59.332 43.106 22.664 69.749L256 296.774l-59.332 43.107 22.664-69.749L160 227.026h73.337z"}))};const C=()=>{const{settings:t}=m.useContext(b),{language:e,toggleLanguage:a}=m.useContext(w),l=m.useMemo(()=>{var o;return(o=t==null?void 0:t.settings)==null?void 0:o.logo},[t]),[n,s]=m.useState(null),p=[{to:"/",label:`${e==="vi"?"Trang Chủ":"Home"}`},{to:"/products",children:[{to:"/products?category_id=6",label:`${e==="vi"?"Cơ Nhảy":"Jump Cue"}`},{to:"/products?category_id=7",label:`${e==="vi"?"Cơ Phá":"Break Cue"}`},{to:"/products?category_id=8",label:`${e==="vi"?"Cơ Đánh":"Billard Cue"}`},{to:"/products?category_id=9",label:`${e==="vi"?"Phụ Kiện":" Billiard Accessories"}`}],label:`${e==="vi"?"Sản Phẩm":"Products"}`},{to:"/service",label:`${e==="vi"?"Dịch Vụ":"Services"}`},{to:"/gallery",label:`${e==="vi"?"Thư Viện Ảnh":"Gallery"}`},{to:"/contact",label:`${e==="vi"?"Hỗ Trợ":"Contact"}`}],v=o=>s(o),g=()=>s(null);return r.jsxs("header",{className:"w-full bg-dark shadow-header flex flex-col items-center header",children:[r.jsx("div",{className:"w-full bg-dark flex items-center justify-center py-[0.8rem] border-b-[1px] border-gray-400 header__introduce",children:r.jsx("span",{className:"uppercase text-white font-medium text-xs",children:"DARIUSPHAN CUSTOM CUES AND REPAIR SERVICE"})}),r.jsx("div",{className:"w-full grid grid-cols-6 gap-[4rem] xs:gap-[1rem] py-[1.6rem] px-[3.2rem]",children:r.jsxs("div",{className:"w-full col-start-2 col-span-4 xs:col-start-1 xs:col-span-6 inline-flex items-center justify-between header__container",children:[r.jsx("div",{className:"logo",children:r.jsx(j,{to:"/",className:"text-display-xs text-white",children:r.jsx("img",{src:l&&l,alt:"",className:"max-w-[4rem]"})})}),r.jsx("ul",{className:"flex list-none items-center gap-[3.2rem] xs:gap-[1rem] header__menu",children:p.map((o,h)=>r.jsxs("li",{className:"relative header__menu--item",onMouseEnter:()=>v(h),onMouseLeave:g,children:[r.jsx(x,{to:o.to,className:" hover:text-light transition-all duration-300 text-md xs:text-xs font-medium capitalize p-[1rem] header__menu--link",children:o.label}),o.children&&n===h&&r.jsx("ul",{className:"absolute top-[3rem] left-[-50%] bg-white shadow-lg rounded-md z-10 flex flex-col",children:o.children.map((d,f)=>r.jsx("li",{className:"header__submenu--item",children:r.jsx(x,{to:d.to,className:"text-dark border-b border-gray-500 text-md min-w-[20rem] text-center xs:text-xs font-medium capitalize transition-all duration-300 p-[1rem] block hover:text-white hover:bg-dark",children:d.label})},f))})]},h))}),r.jsx("button",{className:"inline-flex items-center w-fit transition duration-200 px-[1rem] py-[0.8rem] border-b border-dark rounded-[0.6rem] text-xs text-light-active font-medium hover:text-light hover:border-light",onClick:a,children:e==="vi"?r.jsxs("span",{className:"inline-flex gap-[0.5rem] items-center",children:[r.jsx(E,{title:"Vietnamese",className:"h-[2rem] w-[2rem] xs:h-[1.5rem] xs:w-[1.5rem]"}),"Vietnamese"]}):r.jsxs("span",{className:"inline-flex gap-[0.5rem] items-center",children:[r.jsx(H,{title:"United States",className:"h-[2rem] w-[2rem] xs:h-[1.5rem] xs:w-[1.5rem]"}),"English"]})})]})})]})};export{C as default};
