(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{5301:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return t(5075)}])},5075:function(e,n,t){"use strict";t.r(n);var o=t(5893),i=t(9008),a=t(7294),r=t(9477);n.default=function(){return(0,a.useEffect)((function(){var e,n,t,o,i,a,s=!1,d=0,c=0,u=[["/images/01.jpg",[["points","to"],["points","to"]]],["/images/02.jpg",[["points","to"],["points","to"]]],["/images/03.jpg",[["points","to"],["points","to"]]],["/images/04.jpg",[["points","to"],["points","to"]]],["/images/05.jpg",[["points","to"],["points","to"]]],["/images/06.jpg",[["points","to"],["points","to"]]]],l=0,p=new r.CP7;p.setPixelRatio(window.devicePixelRatio),p.setSize(window.innerWidth,window.innerHeight),(null===(e=document.querySelector("main"))||void 0===e?void 0:e.children)&&(document.querySelector("main").innerHTML=""),null===(n=document.querySelector("main"))||void 0===n||n.append(p.domElement);var m=new r.xsS,w=new r.cPb(75,window.innerWidth/window.innerHeight,1,1e3);w.target=new r.Pa4(0,0,0);var g=new r.xo$(100,100,40);g.applyMatrix4((new r.yGw).makeScale(-1,1,1));var h=new r.vBJ;h.map=r.PpQ.loadTexture(u[l][0]);var f=new r.Kj0(g,h);m.add(f),document.addEventListener("mousedown",(function(e){e.preventDefault(),document.body.style.cursor="grabbing",s=!0,t=e.clientX,o=e.clientY,i=d,a=c,x=!1}),!1),document.addEventListener("mousemove",(function(e){s&&(x=!0,d=.1*(t-e.clientX)+i,c=.1*(e.clientY-o)+a)}),!1),document.addEventListener("mouseup",(function(e){if(document.body.style.cursor="",s=!1,!x){v.x=e.clientX/window.innerWidth*2-1,v.y=e.clientY/window.innerHeight*2+1,y.setFromCamera(v,w);var n=new r.jyi(M);n.scale.set(20,20,1),n.name="marker"+k,y.ray.at(210,n.position),m.add(n),j.push(n),k++,console.log(m)}console.log(x?"drag":"click"),x=!1}),!1);var v=new r.Pa4;!function e(){requestAnimationFrame(e),c=Math.max(-85,Math.min(85,c)),w.target.x=500*Math.sin(r.M8C.degToRad(90-c))*Math.cos(r.M8C.degToRad(d)),w.target.y=500*Math.cos(r.M8C.degToRad(90-c)),w.target.z=500*Math.sin(r.M8C.degToRad(90-c))*Math.sin(r.M8C.degToRad(d)),w.lookAt(w.target),p.render(m,w)}();var x=!1,y=new r.iMs,M=new r.xeV({map:(new r.dpR).load("https://cywarr.github.io/small-shop/Marker.png")}),j=[],k=0;document.onkeyup=function(e){var n={ArrowLeft:function(){l=0!=l?l-1:u.length-1},ArrowRight:function(){l=(l+1)%u.length}}[e.key];null===n||void 0===n||n(),h.map=r.PpQ.loadTexture(u[l][0])}}),[]),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(i.default,{children:[(0,o.jsx)("title",{children:"ThreeJS"}),(0,o.jsx)("meta",{name:"description",content:"Three.js prototype"}),(0,o.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,o.jsx)("main",{})]})}},9008:function(e,n,t){e.exports=t(5443)}},function(e){e.O(0,[737,774,888,179],(function(){return n=5301,e(e.s=n);var n}));var n=e.O();_N_E=n}]);