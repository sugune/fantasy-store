const cartBtn = document.querySelector('.cart-btn');
const xbtn = document.querySelector('.fa-xmark');

const menuBtn = document.querySelector('.menu-btn');
const navMenu = document.querySelector('.nav-menu')

cartBtn.addEventListener('click', () => {
  cartBtn.classList.add('hide-cart-btn');
  xbtn.classList.add('show-x');
});

xbtn.addEventListener('click', () => {
  cartBtn.classList.remove('hide-cart-btn');
  xbtn.classList.remove('show-x');
});

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('active');
  navMenu.classList.toggle('show-menu')
});







