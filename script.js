// NAV SCROLL
window.addEventListener("scroll",()=>{
  document.querySelector(".navbar")
  .classList.toggle("scrolled",window.scrollY>50);
});

// MOBILE MENU
const btn = document.querySelector(".mobile-menu-btn");
const nav = document.querySelector(".nav-links");

btn.addEventListener("click",()=>{
  nav.classList.toggle("active");
});
