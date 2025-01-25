import{R as y,r as o,A as B,u as L,h as U,i as $,j as p}from"./index-DCRbO2L6.js";import{P as A}from"./Pagination-BtcVu4SD.js";function b(){return b=Object.assign||function(i){for(var e=1;e<arguments.length;e++){var s=arguments[e];for(var a in s)Object.prototype.hasOwnProperty.call(s,a)&&(i[a]=s[a])}return i},b.apply(this,arguments)}function F(i,e){i.prototype=Object.create(e.prototype),i.prototype.constructor=i,_(i,e)}function _(i,e){return _=Object.setPrototypeOf||function(a,n){return a.__proto__=n,a},_(i,e)}var M=function(i){F(e,i);function e(){var a;return a=i.call(this)||this,a.state={columns:[],childRefs:[],hasDistributed:!1},a}var s=e.prototype;return s.componentDidUpdate=function(){!this.state.hasDistributed&&!this.props.sequential&&this.distributeChildren()},e.getDerivedStateFromProps=function(n,r){var u=n.children,l=n.columnsCount,c=l!==r.columns.length;return r&&u===r.children&&!c?null:b({},e.getEqualCountColumns(u,l),{children:u,hasDistributed:!1})},s.shouldComponentUpdate=function(n){return n.children!==this.state.children||n.columnsCount!==this.props.columnsCount},s.distributeChildren=function(){var n=this,r=this.props,u=r.children,l=r.columnsCount,c=Array(l).fill(0),m=this.state.childRefs.every(function(f){return f.current.getBoundingClientRect().height});if(m){var g=Array.from({length:l},function(){return[]}),v=0;y.Children.forEach(u,function(f){if(f&&y.isValidElement(f)){var x=n.state.childRefs[v].current.getBoundingClientRect().height,h=c.indexOf(Math.min.apply(Math,c));c[h]+=x,g[h].push(f),v++}}),this.setState(function(f){return b({},f,{columns:g,hasDistributed:!0})})}},e.getEqualCountColumns=function(n,r){var u=Array.from({length:r},function(){return[]}),l=0,c=[];return y.Children.forEach(n,function(m){if(m&&y.isValidElement(m)){var g=y.createRef();c.push(g),u[l%r].push(y.createElement("div",{style:{display:"flex",justifyContent:"stretch"},key:l,ref:g},m)),l++}}),{columns:u,childRefs:c}},s.renderColumns=function(){var n=this.props,r=n.gutter,u=n.itemTag,l=n.itemStyle;return this.state.columns.map(function(c,m){return y.createElement(u,{key:m,style:b({display:"flex",flexDirection:"column",justifyContent:"flex-start",alignContent:"stretch",flex:1,width:0,gap:r},l)},c.map(function(g){return g}))})},s.render=function(){var n=this.props,r=n.gutter,u=n.className,l=n.style,c=n.containerTag;return y.createElement(c,{style:b({display:"flex",flexDirection:"row",justifyContent:"center",alignContent:"stretch",boxSizing:"border-box",width:"100%",gap:r},l),className:u},this.renderColumns())},e}(y.Component);M.propTypes={};M.defaultProps={columnsCount:3,gutter:"0",className:null,style:{},containerTag:"div",itemTag:"div",itemStyle:{},sequential:!1};var I=1,W="10px",N=typeof window<"u"?o.useLayoutEffect:o.useEffect,z=function(){var e=o.useState(!1),s=e[0],a=e[1];return N(function(){a(!0)},[]),s},G=function(){var e=z(),s=o.useState(typeof window<"u"?window.innerWidth:0),a=s[0],n=s[1],r=o.useCallback(function(){e&&n(window.innerWidth)},[e]);return N(function(){if(e)return window.addEventListener("resize",r),r(),function(){return window.removeEventListener("resize",r)}},[e,r]),a},R=function(e){var s=e.columnsCountBreakPoints,a=s===void 0?{350:1,750:2,900:3}:s,n=e.gutterBreakPoints,r=n===void 0?{}:n,u=e.children,l=e.className,c=l===void 0?null:l,m=e.style,g=m===void 0?null:m,v=G(),f=o.useCallback(function(C,E){var j=Object.keys(C).sort(function(w,S){return w-S}),k=j.length>0?C[j[0]]:E;return j.forEach(function(w){w<v&&(k=C[w])}),k},[v]),x=o.useMemo(function(){return f(a,I)},[f,a]),h=o.useMemo(function(){return f(r,W)},[f,r]);return y.createElement("div",{className:c,style:g},y.Children.map(u,function(C,E){return y.cloneElement(C,{key:E,columnsCount:x,gutter:h})}))};R.propTypes={};const H=()=>{const{language:i}=o.useContext(B),[e,s]=L(),[a,n]=o.useState([]),[r,u]=o.useState({}),[l,c]=o.useState([]),[m,g]=o.useState(null),[v,f]=o.useState(!1),x=o.useRef(null),h=e.get("category")||"",C=parseInt(e.get("page")||"1",10),E={"co-pha":{vi:"Cơ Phá",en:"Break Cue"},"co-nhay":{vi:"Cơ Nhảy",en:"Jump Cue"},"co-danh":{vi:"Cơ Đánh",en:"Billard Cue"},"phu-kien":{vi:"Phụ Kiện",en:"Billiard Accessories"}};o.useEffect(()=>{j()},[h,C,i]),o.useEffect(()=>{k()},[i]),o.useEffect(()=>{const t=O=>{O.key==="Escape"&&P()},d=x.current;return v&&d&&(d.addEventListener("keydown",t),d.focus()),()=>{d&&d.removeEventListener("keydown",t)}},[v]);const j=async()=>{try{const t=await U({...h?{category:h}:{},page:C});t.status===200&&(n(t.data.data),u(t.data.meta))}catch(t){console.log("Failed Fetch Galleries: ",t)}},k=async()=>{try{const t=await $();t.status===200&&c(t.data)}catch(t){console.log("Failed Fetch Categories Galleries: ",t)}},w=o.useCallback(t=>{const d=new URLSearchParams(e);h?d.set("category",h):d.delete("category"),d.set("page",t),s(d)},[s,e,h]),S=o.useCallback(t=>{if(t)s({category:t,page:"1"});else{const d=new URLSearchParams(e);d.delete("category"),d.set("page","1"),s(d)}},[s,e]),T=o.useCallback(t=>{g(t),setTimeout(()=>f(!0),10)},[]),P=o.useCallback(()=>{f(!1),setTimeout(()=>g(null),300)},[]),D=o.useCallback(t=>{t.target.classList.contains("modal-overlay")&&P()},[P]);return p.jsx("div",{className:"w-full grid grid-cols-6 gap-[2rem] xs:gap-[1rem] px-[3.2rem] xs:px-[1rem] py-[2rem]",children:p.jsx("main",{className:"w-full col-start-2 col-span-4 flex flex-col gap-[2rem]",children:p.jsxs("section",{className:"w-full flex flex-col gap-[1.6rem] py-[2rem] gallery",children:[p.jsxs("div",{className:"inline-flex gap-[1.6rem] items-stretch w-full",children:[p.jsx("button",{className:`w-full text-sm border border-gray-500 transition duration-200 px-[1rem] py-[0.6rem] rounded-[0.6rem] font-medium hover:border-gray-900 hover:shadow-button ${h?"":"bg-gray-900 text-white"}`,onClick:()=>S(""),children:i==="vi"?"Tất Cả":"All"}),Object.entries(E).map(([t,d])=>p.jsx("button",{className:`w-full text-sm border border-gray-500 transition duration-200 px-[1rem] py-[0.6rem] rounded-[0.6rem] font-medium hover:border-gray-900 hover:shadow-button ${h===t?"bg-gray-900 text-white":""}`,onClick:()=>S(t),children:d[i]},t))]}),p.jsx(R,{columnsCountBreakPoints:{350:1,750:2,900:3},children:p.jsx(M,{gutter:"10px",children:a.map(t=>p.jsx("img",{src:t.image_url,alt:t.title,className:"w-full h-auto rounded-[0.6rem] cursor-pointer mb-[2rem]",onClick:()=>T(t.image_url),loading:"lazy"},t.id))})}),r&&r.last_page>1&&p.jsx(A,{currentPage:C,totalPages:r.last_page,onPageChange:w,pageSize:r.per_page,totalItems:r.total}),m&&p.jsx("div",{ref:x,tabIndex:-1,className:`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 transition-opacity duration-300 modal-overlay ${v?"opacity-100":"opacity-0"}`,onClick:D,children:p.jsx("div",{className:`relative transform transition-transform duration-300 ${v?"scale-100":"scale-50"}`,children:p.jsx("img",{src:m,alt:"Selected",className:"max-w-full max-h-screen rounded-[0.6rem]"})})})]})})})};export{H as default};
