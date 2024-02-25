import{a as f,i as n,S as g}from"./assets/vendor-64b55ca9.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();function h(a,r=!0){const o=document.querySelector(".gallery"),s=a.map(e=>`
      <div class="photo-card">
        <a href="${e.largeImageURL}" target="_blank">
          <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
        </a>
        <div class="info">
          <p><i class="img-text">Likes </i><span>${e.likes}</span></p>
          <p><i class="img-text">Views </i><span>${e.views}</span></p>
          <p><i class="img-text">Comments </i><span>${e.comments}</span></p>
          <p><i class="img-text">Downloads </i><span>${e.downloads}</span></p>
        </div>
      </div>
    `).join("");r?o.insertAdjacentHTML("beforeend",s):o.innerHTML=s,m.refresh()}const b="42560540-fd525388af9cdf4135c592592";let d=0,u=0;function S(a,r){let o;return function(...s){const e=this;clearTimeout(o),o=setTimeout(()=>a.apply(e,s),r)}}function q(){const r=document.querySelector(".photo-card").getBoundingClientRect().height;window.scrollBy({top:r*2,behavior:"smooth"})}const v=S(q,100);async function y(a,r){const o=document.querySelector(".loader"),s=document.querySelector("#load-more");s.style.display="none",o.style.display="block";try{const t=await f.get(`https://pixabay.com/api/?key=${b}&q=${encodeURIComponent(a)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=15&page=${r}`);d=t.data.totalHits,u+=t.data.hits.length,console.log(t.data),o.style.display="none",t.data.hits.length===0?d===0?n.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}):u>=d&&n.info({message:"We are sorry, but you have reached the end of search results.",position:"center"}):(h(t.data.hits),m.refresh(),v(),s.style.display="block")}catch(e){console.error("Error fetching images:",e),o.style.display="none",n.error({message:"Failed to fetch images. Please try again later."})}}const m=new g(".gallery a"),L=document.querySelector("#search-form"),p=document.querySelector("#search-input");let l="",i=1;L.addEventListener("submit",a=>{const r=document.querySelector(".gallery");r.innerHTML="",a.preventDefault(),l=p.value.trim(),i=1;const o=document.querySelector(".loader");if(o.style.display="block",!l){o.style.display="none",n.warning({message:"Please enter a search query"});return}setTimeout(()=>{y(l,i),p.value=""},200)});document.querySelector("#load-more").addEventListener("click",()=>{i+=1,y(l,i)});
//# sourceMappingURL=commonHelpers.js.map