const cartBtn = document.querySelector('.cart-btn');
const xbtn = document.querySelector('.fa-xmark');

const menuBtn = document.querySelector('.menu-btn');
const navMenu = document.querySelector('.nav-menu');
const navbar = document.querySelector('.navbar-store');
const links = document.querySelectorAll('.nav-menu a')

const cartUp = document.querySelectorAll('.add-cart');
const cartDown = document.querySelectorAll('.remove-cart');

const weaponsContainer = document.querySelector('.weapons-container');
const landsContainer = document.querySelector('.lands-container');
const familiarsContainer = document.querySelector('.familiars-container');


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

let allGoods = [];

class Goods {
  
  async getWeapons() {
    const res = await fetch('./json/weapons.json');
    const data = await res.json();
    return data.weapons;
  }
  
  async getLands() {
    const res = await fetch('./json/lands.json');
    const data = await res.json();
    return data.lands;
  }
  
  async getFamiliars() {
    try {
      const res = await fetch('./json/familiars.json');
      const data = await res.json();
      return data.familiars;
    } catch (err) {
      console.log('error');
    }
  }
}

class UI {
  
  displayLands(goods) {
    goods.forEach(good => {
      const div = document.createElement('div');
      div.classList.add('land-item');
      div.classList.add('product-item');
      div.innerHTML = `
          <div class="land-img product-img" style="background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 100%), url('${good.img}');">
            <img class="remove-cart" data-id="${good.id}" src="./images/remove-cart.png" alt="">
            <img class="add-cart" data-id="${good.id}" src="./images/add-cart.png" alt="">
            <i data-id="${good.id}" class="fa-solid fa-circle-info"></i>
          </div>
          <div class="land-content product-content">
            <h4>${good.landName}</h4>
            <h5><img src="./images/coin-2.png" alt=""> ${good.price.toLocaleString("en-US")}</h5>
          </div>`;
      landsContainer.appendChild(div);
      allGoods.push(good)
    });
  }
  
  displayFamiliars(goods) {
    goods.forEach(good => {
      const div = document.createElement('div');
      div.classList.add('familiar-item');
      div.classList.add('product-item');
      div.innerHTML = ` 
      <div class="familiar-img product-img" style="background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 100%), url('${good.img}');">
            <img class="remove-cart" data-id="${good.id}" src="./images/remove-cart.png" alt="">
            <img class="add-cart" data-id="${good.id}" src="./images/add-cart.png" alt="">
            <i data-id="${good.id}" class="fa-solid fa-circle-info"></i>
          </div>
          <div class="familiar-content product-content">
            <h4>${good.familiarName}</h4>
            <h5><img src="./images/coin-2.png" alt=""> ${good.price.toLocaleString('en-US')}</h5>
          </div>`;
      familiarsContainer.appendChild(div);
      allGoods.push(good)
    });
  }
  
  displayWeapons(goods) {
    goods.forEach(good => {
      const div = document.createElement('div');
      div.classList.add('product-item');
      div.classList.add('weapon-item');
      div.innerHTML = `
      <div class="weapon-img product-img" style="background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 100%), url('${good.img}');">
            <img class="remove-cart" data-id="${good.id}" src="./images/remove-cart.png" alt="">
            <img class="add-cart" data-id="${good.id}" src="./images/add-cart.png" alt="">
            <i data-id="${good.id}" class="fa-solid fa-circle-info"></i>
          </div>
          <div class="weapon-content product-content">
            <h4>${good.weaponName}</h4>
            <h5><img src="./images/coin-2.png" alt=""> ${good.price.toLocaleString('en-US')}</h5>
          </div>`;
      weaponsContainer.appendChild(div);
      allGoods.push(good);
    });
  }
  
  navFunctionality() {
    const navHeight = navbar.getBoundingClientRect().height;
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > navHeight) {
        navbar.classList.add('sticky-nav');
      } else {
        navbar.classList.remove('sticky-nav')
      }
    });
    this.toggleMenu();
    this.accurateNavigation();
  }
  
  accurateNavigation() {
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const id = link.getAttribute('href');
        const element = document.querySelector(id);
        const navHeight = navbar.getBoundingClientRect().height;
        const destination = element.offsetTop;
        window.scroll({
          top: destination - navHeight
        });
        menuBtn.classList.toggle('active');
        navMenu.classList.toggle('show-menu');
        console.log(element.offsetTop)
      })
    });
  }
  
  toggleMenu() {
    menuBtn.addEventListener('click', () => {
      menuBtn.classList.toggle('active');
      navMenu.classList.toggle('show-menu');
    });
  }
  
}

class Storage {
  
}

window.addEventListener('DOMContentLoaded', () => {
  const ui = new UI();
  const goods = new Goods();
  
  goods.getLands().then((data) => ui.displayLands(data));
  goods.getWeapons().then((data) => ui.displayWeapons(data));
  goods.getFamiliars().then((data) => ui.displayFamiliars(data));
  ui.navFunctionality();
});




