const cartBtn = document.querySelector('.cart-btn');
const xbtn = document.querySelector('.fa-xmark');

const menuBtn = document.querySelector('.menu-btn');
const navMenu = document.querySelector('.nav-menu');

const cartUp = document.querySelectorAll('.add-cart');
const cartDown = document.querySelectorAll('.remove-cart');

cartUp.forEach(add => {
  add.addEventListener('click', () => {
    add.classList.add('hide-cart-up');
    add.previousElementSibling.classList.add('show-cart-down');
  });
})

cartDown.forEach(remove => {
  remove.addEventListener('click', () => {
    remove.classList.remove('show-cart-down');
    remove.nextElementSibling.classList.remove('hide-cart-up');
  });
})

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
  navMenu.classList.toggle('show-menu');
});


window.addEventListener('DOMContentLoaded', () => {
  
});




