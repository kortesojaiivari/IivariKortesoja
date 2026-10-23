/* TikTok-karuselli – käyttö:
   <div class="ttk" data-videos="a.mp4, b.mp4, c.mp4"></div>
   <script src="KOMPONENTIT/tiktok-karuselli/tiktok-karuselli.js"></script>
   Toimii usealla karusellilla samalla sivulla. Videot pyörivät mykistettyinä,
   keskimmäisessä on ohjaimet. Kun käyttäjä laittaa äänen päälle,
   jokainen keskelle tuleva video soi siitä eteenpäin äänen kanssa. */
(function(){
  function init(root){
    if(root.dataset.ttkReady)return; root.dataset.ttkReady=1;
    var src=(root.dataset.videos||"").split(",").map(function(s){return s.trim()}).filter(Boolean);
    var prev=mk("button","ttk-nav","‹"),next=mk("button","ttk-nav","›"),stage=mk("div","ttk-stage"),dots=mk("div","ttk-dots");
    prev.setAttribute("aria-label","Edellinen");next.setAttribute("aria-label","Seuraava");
    var v=src.map(function(s,j){var x=document.createElement("video");x.className="ttk-v";x.src=s;x.muted=true;x.loop=true;x.autoplay=true;x.playsInline=true;x.setAttribute("playsinline","");x.preload="metadata";
      x.addEventListener("click",function(e){if(j!==i){e.preventDefault();go(j)}});stage.appendChild(x);
      var b=mk("button");b.onclick=function(){go(j)};dots.appendChild(b);return x});
    root.innerHTML="";root.appendChild(prev);root.appendChild(stage);root.appendChild(next);if(root.dataset.dots==="true")root.parentNode.insertBefore(dots,root.nextSibling);
    var i=0,n=v.length,sound=false,vol=parseFloat(root.dataset.volume||"0.35"),busy=false;
    v.forEach(function(x,k){x.volume=vol;x.addEventListener("volumechange",function(){if(busy||k!==i)return;sound=!x.muted&&x.volume>0;if(x.volume>0)vol=x.volume})});
    function go(k){i=(k+n)%n;busy=true;v.forEach(function(x,j){var p=(j-i+n)%n;x.className="ttk-v "+(p===0?"c":p===1?"r":p===n-1?"l":"h");x.controls=p===0;x.volume=vol;x.muted=p===0?!sound:true;x.play().catch(function(){})});
      [].forEach.call(dots.children,function(b,j){b.classList.toggle("on",j===i)});setTimeout(function(){busy=false},0)}
    prev.onclick=function(){go(i-1)};next.onclick=function(){go(i+1)};go(0);
  }
  function mk(t,c,txt){var e=document.createElement(t);if(c)e.className=c;if(txt)e.textContent=txt;return e}
  function all(){[].forEach.call(document.querySelectorAll(".ttk"),init)}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",all);else all();
  window.TikTokKaruselli={init:init};
})();
