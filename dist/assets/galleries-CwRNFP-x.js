import{R as g,r as o,A as D,u as O,f as B,h as L,j as f}from"./index--MCR1wgl.js";import{P as U}from"./Pagination-WiJ-zkr4.js";function b(){return b=Object.assign||function(i){for(var e=1;e<arguments.length;e++){var s=arguments[e];for(var a in s)Object.prototype.hasOwnProperty.call(s,a)&&(i[a]=s[a])}return i},b.apply(this,arguments)}function $(i,e){i.prototype=Object.create(e.prototype),i.prototype.constructor=i,_(i,e)}function _(i,e){return _=Object.setPrototypeOf||function(a,n){return a.__proto__=n,a},_(i,e)}var k=function(i){$(e,i);function e(){var a;return a=i.call(this)||this,a.state={columns:[],childRefs:[],hasDistributed:!1},a}var s=e.prototype;return s.componentDidUpdate=function(){!this.state.hasDistributed&&!this.props.sequential&&this.distributeChildren()},e.getDerivedStateFromProps=function(n,r){var u=n.children,l=n.columnsCount,c=l!==r.columns.length;return r&&u===r.children&&!c?null:b({},e.getEqualCountColumns(u,l),{children:u,hasDistributed:!1})},s.shouldComponentUpdate=function(n){return n.children!==this.state.children||n.columnsCount!==this.props.columnsCount},s.distributeChildren=function(){var n=this,r=this.props,u=r.children,l=r.columnsCount,c=Array(l).fill(0),m=this.state.childRefs.every(function(d){return d.current.getBoundingClientRect().height});if(m){var h=Array.from({length:l},function(){return[]}),v=0;g.Children.forEach(u,function(d){if(d&&g.isValidElement(d)){var p=n.state.childRefs[v].current.getBoundingClientRect().height,C=c.indexOf(Math.min.apply(Math,c));c[C]+=p,h[C].push(d),v++}}),this.setState(function(d){return b({},d,{columns:h,hasDistributed:!0})})}},e.getEqualCountColumns=function(n,r){var u=Array.from({length:r},function(){return[]}),l=0,c=[];return g.Children.forEach(n,function(m){if(m&&g.isValidElement(m)){var h=g.createRef();c.push(h),u[l%r].push(g.createElement("div",{style:{display:"flex",justifyContent:"stretch"},key:l,ref:h},m)),l++}}),{columns:u,childRefs:c}},s.renderColumns=function(){var n=this.props,r=n.gutter,u=n.itemTag,l=n.itemStyle;return this.state.columns.map(function(c,m){return g.createElement(u,{key:m,style:b({display:"flex",flexDirection:"column",justifyContent:"flex-start",alignContent:"stretch",flex:1,width:0,gap:r},l)},c.map(function(h){return h}))})},s.render=function(){var n=this.props,r=n.gutter,u=n.className,l=n.style,c=n.containerTag;return g.createElement(c,{style:b({display:"flex",flexDirection:"row",justifyContent:"center",alignContent:"stretch",boxSizing:"border-box",width:"100%",gap:r},l),className:u},this.renderColumns())},e}(g.Component);k.propTypes={};k.defaultProps={columnsCount:3,gutter:"0",className:null,style:{},containerTag:"div",itemTag:"div",itemStyle:{},sequential:!1};var A=1,F="10px",N=typeof window<"u"?o.useLayoutEffect:o.useEffect,I=function(){var e=o.useState(!1),s=e[0],a=e[1];return N(function(){a(!0)},[]),s},W=function(){var e=I(),s=o.useState(typeof window<"u"?window.innerWidth:0),a=s[0],n=s[1],r=o.useCallback(function(){e&&n(window.innerWidth)},[e]);return N(function(){if(e)return window.addEventListener("resize",r),r(),function(){return window.removeEventListener("resize",r)}},[e,r]),a},R=function(e){var s=e.columnsCountBreakPoints,a=s===void 0?{350:1,750:2,900:3}:s,n=e.gutterBreakPoints,r=n===void 0?{}:n,u=e.children,l=e.className,c=l===void 0?null:l,m=e.style,h=m===void 0?null:m,v=W(),d=o.useCallback(function(x,j){var E=Object.keys(x).sort(function(w,P){return w-P}),S=E.length>0?x[E[0]]:j;return E.forEach(function(w){w<v&&(S=x[w])}),S},[v]),p=o.useMemo(function(){return d(a,A)},[d,a]),C=o.useMemo(function(){return d(r,F)},[d,r]);return g.createElement("div",{className:c,style:h},g.Children.map(u,function(x,j){return g.cloneElement(x,{key:j,columnsCount:p,gutter:C})}))};R.propTypes={};const q=()=>{const{language:i}=o.useContext(D),[e,s]=O(),[a,n]=o.useState([]),[r,u]=o.useState({}),[l,c]=o.useState([]),[m,h]=o.useState(null),[v,d]=o.useState(!1),p=e.get("category")||"",C=parseInt(e.get("page")||"1",10),x={"co-pha":{vi:"Cơ Phá",en:"Break Cue"},"co-nhay":{vi:"Cơ Nhảy",en:"Jump Cue"},"co-danh":{vi:"Cơ Đánh",en:"Billard Cue"},"phu-kien":{vi:"Phụ Kiện",en:"Billiard Accessories"}};o.useEffect(()=>(j(),()=>{}),[p,C,i]),o.useEffect(()=>{E()},[i]);const j=async()=>{try{const t=await B({...p?{category:p}:{},page:C});t.status===200&&(n(t.data.data),u(t.data.meta))}catch(t){console.log("Faild Fetch Galleries: ",t)}},E=async()=>{try{const t=await L();t.status===200&&c(t.data)}catch(t){console.log("Faild Fetch Categories Galleries: ",t)}},S=o.useCallback(t=>{const y=new URLSearchParams(e);p?y.set("category",p):y.delete("category"),y.set("page",t),s(y)},[s,e,p]),w=o.useCallback(t=>{if(t)s({category:t,page:"1"});else{const y=new URLSearchParams(e);y.delete("category"),y.set("page","1"),s(y)}},[s,e]),P=o.useCallback(t=>{h(t),setTimeout(()=>d(!0),10)},[]),M=o.useCallback(()=>{d(!1),setTimeout(()=>h(null),300)},[]),T=o.useCallback(t=>{t.target.classList.contains("modal-overlay")&&M()},[M]);return f.jsx("div",{className:"w-full grid grid-cols-6 gap-[2rem] xs:gap-[1rem] px-[3.2rem] xs:px-[1rem] py-[2rem]",children:f.jsx("main",{className:"w-full col-start-2 col-span-4 flex flex-col gap-[2rem]",children:f.jsxs("section",{className:"w-full flex flex-col gap-[1.6rem] py-[2rem] gallery",children:[f.jsxs("div",{className:"inline-flex gap-[1.6rem] items-stretch w-full",children:[f.jsx("button",{className:`w-full text-sm border border-gray-500 transition duration-200 px-[1rem] py-[0.6rem] rounded-[0.6rem] font-medium hover:border-gray-900 hover:shadow-button ${p?"":"bg-gray-900 text-white"}`,onClick:()=>w(""),children:i==="vi"?"Tất Cả":"All"}),Object.entries(x).map(([t,y])=>f.jsx("button",{className:`w-full text-sm border border-gray-500 transition duration-200 px-[1rem] py-[0.6rem] rounded-[0.6rem] font-medium hover:border-gray-900 hover:shadow-button ${p===t?"bg-gray-900 text-white":""}`,onClick:()=>w(t),children:y[i]},t))]}),f.jsx(R,{columnsCountBreakPoints:{350:1,750:2,900:3},children:f.jsx(k,{gutter:"10px",children:a.map(t=>f.jsx("img",{src:t.image_url,alt:t.title,className:"w-full h-auto rounded-[0.6rem] cursor-pointer mb-[2rem]",onClick:()=>P(t.image_url),loading:"lazy"},t.id))})}),r&&r.last_page>1&&f.jsx(U,{currentPage:C,totalPages:r.last_page,onPageChange:S,pageSize:r.per_page,totalItems:r.total}),m&&f.jsx("div",{className:`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 transition-opacity duration-300 modal-overlay ${v?"opacity-100":"opacity-0"}`,onClick:T,children:f.jsx("div",{className:`relative transform transition-transform duration-300 ${v?"scale-100":"scale-50"}`,children:f.jsx("img",{src:m,alt:"Selected",className:"max-w-full max-h-screen rounded-[0.6rem]"})})})]})})})};export{q as default};
