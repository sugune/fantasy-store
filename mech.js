const cartBtn = document.querySelector('.cart-btn');
const xbtn = document.querySelector('.fa-xmark');
const cartShopping = document.querySelector('.fa-cart-shopping');
const cartOverlay = document.querySelector('.cart-overlay');
const cart = document.querySelector('.cart');
const cartContainer = document.querySelector('.cart-container');
const cartReceipt = document.querySelector('.cart-receipt');
const cartTotalAmount = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.total');
const cartTotalContainer = document.querySelector('.cart-total');
const cartEmpty = document.querySelector('.empty');

const menuBtn = document.querySelector('.menu-btn');
const navMenu = document.querySelector('.nav-menu');
const navbar = document.querySelector('.navbar-store');
const links = [...document.querySelectorAll('.nav-menu a')].slice(0, -1);

const weaponsContainer = document.querySelector('.weapons-container');
const landsContainer = document.querySelector('.lands-container');
const familiarsContainer = document.querySelector('.familiars-container');




let allGoods = [];
let allCart = [];

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
      <div class="land-img product-img" style="background-image: linear-gradient(to top, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%), url('${good.img}');">
      <img class="remove-cart" data-id="${good.id}" src="./images/remove-cart.png" alt="">
      <img class="add-cart" data-id="${good.id}" src="./images/add-cart.png" alt="">
      <i data-id="${good.id}" class="fa-solid fa-circle-info"></i>
      </div>
      <div class="land-content product-content">
      <h4>${good.name}</h4>
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
      <div class="familiar-img product-img" style="background-image: linear-gradient(to top, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%), url('${good.img}');">
      <img class="remove-cart" data-id="${good.id}" src="./images/remove-cart.png" alt="">
      <img class="add-cart" data-id="${good.id}" src="./images/add-cart.png" alt="">
      <i data-id="${good.id}" class="fa-solid fa-circle-info"></i>
      </div>
      <div class="familiar-content product-content">
      <h4>${good.name}</h4>
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
      <div class="weapon-img product-img" style="background-image: linear-gradient(to top, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%), url('${good.img}');">
      <img class="remove-cart" data-id="${good.id}" src="./images/remove-cart.png" alt="">
      <img class="add-cart" data-id="${good.id}" src="./images/add-cart.png" alt="">
      <i data-id="${good.id}" class="fa-solid fa-circle-info"></i>
      </div>
      <div class="weapon-content product-content">
      <h4>${good.name}</h4>
      <h5><img src="./images/coin-2.png" alt=""> ${good.price.toLocaleString('en-US')}</h5>
      </div>`;
      weaponsContainer.appendChild(div);
      allGoods.push(good);
    });
  }

  navFunctionality() {
    const navHeight = navbar.getBoundingClientRect().height;
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > navHeight / 1.7) {
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
      })
    });
  }

  toggleMenu() {
    menuBtn.addEventListener('click',
      () => {
        menuBtn.classList.toggle('active');
        navMenu.classList.toggle('show-menu');
      });
  }

  infoFunctionality() {
    const infos = document.querySelectorAll('.fa-circle-info');
    infos.forEach((info) => {
      const idInfo = info.dataset.id;
      info.addEventListener('click', () => {
        const data = allGoods.find(good => good.id === idInfo);
        this.showInfo(data);
      });
    });
  }

  showInfo(data) {
    const div = document.createElement('div');
    div.classList.add('info');
    div.innerHTML = `
    <div class="info-container">
    <h5>${data.name}</h5>
    <p>
    <span>cyrus:</span> "${data.info}"
    </p>
    <i class="fa-solid fa-xmark"></i>
    <img src="./images/close.png" alt="" class="x-icon">
    </div>`;
    const infoX = div.querySelector('.x-icon');
    const infoContainer = div.querySelector('.info-container');
    document.body.appendChild(div);
    this.infoAnimation(infoX,
      div,
      infoContainer);

  }

  infoAnimation(x,
    div,
    infoContainer) {
    setTimeout(() => {
      div.classList.add('show-info');
      infoContainer.classList.add('show-info-container');
    },
      1);

    x.addEventListener('click',
      () => {
        div.classList.remove('show-info');
        infoContainer.classList.remove('show-info-container');
        setTimeout(() => {
          document.body.removeChild(div);
        }, 300);
      });
  }

  cartFunctionality() {
    allGoods = allGoods.map(good => {
      good.amount = 1;
      return good;
    })
    const cartUp = document.querySelectorAll('.add-cart');
    const cartDown = document.querySelectorAll('.remove-cart');
    this.cartBtnsToggle();
    this.cartShowHide();
    this.swapAddRemove();

    cartUp.forEach(addCart => {
      addCart.addEventListener('click', () => {
        const id = addCart.dataset.id;
        const object = allGoods.find(good => good.id === id);
        allCart.push(object)
        if(allCart.length > 0) {
          cartTotalContainer.classList.add('total-visible');
          cartEmpty.classList.add('hide-empty');
          cartTotalAmount.classList.add('item-flex');
        }
        Storage.save(allCart);
        this.displayCartItems(allCart);
        this.displayCartReceipt(allCart);
        this.displayCartValue(allCart);
        addCart.classList.add('cart-unclick');
      });
    });
    
    cartDown.forEach(remove => {
      remove.addEventListener('click', () => {
        const id = remove.dataset.id;
        allCart = allCart.filter(item => item.id !== id);
        if(allCart.length <= 0) {
          cartTotalContainer.classList.remove('total-visible');
          cartEmpty.classList.remove('hide-empty');
          cartTotalAmount.classList.remove('item-flex');
        }
        cartUp.forEach(cart => {
          if (cart.dataset.id === id) {
            cart.classList.remove('cart-unclick')
          }
        });
        this.displayCartItems(allCart);
        this.displayCartValue(allCart);
        this.displayCartReceipt(allCart);
      });
    });
    
  }

  displayCartItems(cart) {
    let items = [];
    cart.forEach(item => {
      const element = ` 
          <div class="cart-item">
          <div class="cart-img" style="background-image: linear-gradient(to top, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.5) 100%), url('${item.img}');">
          <i data-id="${item.id}" class="fa-solid fa-trash-can remove"></i>
          <p class="item-name">${item.name}</p>
          <h5 class="amount">${item.amount}</h5>
          <div class="chevrons">
          <i data-id="${item.id}" class="fa-solid fa-chevron-left"></i>
          <i data-id="${item.id}" class="fa-solid fa-chevron-right"></i>
          </div>
          </div>
          <h5 class="item-price"><img src="./images/coin-2.png" alt=""> <span class="price" >${item.price.toLocaleString('en-US')}</span></h5>
          </div>`;
      items.push(element);
    })
    cartContainer.innerHTML = items.join('');
    const remove = cartContainer.querySelectorAll('.remove');
    this.removeFunctionality(remove);
  }
  
  removeFunctionality(remove) {
    const cartDown = document.querySelectorAll('.remove-cart');
    const cartUp = document.querySelectorAll('.add-cart');
    remove.forEach(rem => {
      rem.addEventListener('click', () => {
        const id = rem.dataset.id;
        allCart = allCart.filter(item => item.id !== id);
        if(allCart.length <= 0) {
          cartTotalContainer.classList.remove('total-visible');
          cartEmpty.classList.remove('hide-empty');
          cartTotalAmount.classList.remove('item-flex');
        }
        this.displayCartItems(allCart);
        this.displayCartValue(allCart);
        this.displayCartReceipt(allCart);
        
        cartDown.forEach(cartRemove => {
          if(cartRemove.dataset.id === id) {
            cartRemove.classList.remove('show-cart-down');
            cartRemove.nextElementSibling.classList.remove('hide-cart-up');
          }
        });
        cartUp.forEach(cart => {
          if (cart.dataset.id === id) {
            cart.classList.remove('cart-unclick')
          }
        })
      });
    });
  }
  
  displayCartReceipt(cart) {
    let items = [];
    cart.forEach(item => {
      const element = `              
          <h5 class="receipt-name">--<span>${item.name}</span></h5>
          <h5 class="receipt-amount">${item.amount}</h5>
          <h5 class="receipt-price"><img src="./images/coin-2.png" alt=""> <span class="rec-price">${item.price.toLocaleString('en-US')}</span></h5>`;
      items.push(element);
    });
    cartReceipt.innerHTML = items.join('');
  }
  
  displayCartValue(cart) {
    let tempAmount = 0;
    let tempTotal = 0;
    cart.forEach(item => {
      tempAmount += item.amount;
      tempTotal += item.price * item.amount;
    });
    cartTotalAmount.innerHTML = tempAmount.toLocaleString('en-US');
    cartTotal.innerHTML = tempTotal.toLocaleString('en-US');
  }

  swapAddRemove() {
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
    });
  }

  cartShowHide() {
    cartBtn.addEventListener('click',
      () => {
        cartOverlay.classList.add('show-cart-overlay');
        setTimeout(() => {
          cart.classList.add('show-cart');
        }, 1)
      })
    xbtn.addEventListener('click',
      () => {
        cart.classList.remove('show-cart');
        setTimeout(() => {
          cartOverlay.classList.remove('show-cart-overlay');
        }, 500);
      });
  }

  cartBtnsToggle() {
    cartBtn.addEventListener('click',
      () => {
        cartBtn.classList.add('hide-cart-btn');
        xbtn.classList.add('show-x');
        menuBtn.classList.remove('active');
        navMenu.classList.remove('show-menu');

        //enuBtn.classList.add('menu-btn-unclick');
      });

    xbtn.addEventListener('click',
      () => {
        cartBtn.classList.remove('hide-cart-btn');
        xbtn.classList.remove('show-x');
        //menuBtn.classList.remove('menu-btn-unclick');
      });
  }

}

class Storage {
  static save(cart) {
    localStorage.setItem('cart',
      JSON.stringify(cart));
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const ui = new UI();
  const goods = new Goods();

  goods.getLands().then((data) => ui.displayLands(data));
  goods.getWeapons().then((data) => ui.displayWeapons(data));
  goods.getFamiliars().then((data) => ui.displayFamiliars(data)).then(() => {
    ui.navFunctionality();
    ui.infoFunctionality();
    ui.cartFunctionality();
  });
});