const shopping_cart = document.getElementById("shopping_cart");
const productCartQuantity = document.getElementById("cartAmount");
const totalAmount = document.getElementById("total_amount");
let shoppingCart = JSON.parse(localStorage.getItem("shopping_cart")) || [];

let calculation = () => {
  productCartQuantity.innerHTML = shoppingCart.length;
};

const loadData = async () => {
  const response = await fetch("data/data.json");
  const data = await response.json();
  generateCartItems(data);
  totalMoney(data);
  calculation();
};
loadData();

const generateCartItems = (products) => {
  if (shoppingCart.length !== 0) {
    return (shopping_cart.innerHTML = shoppingCart
      .sort((a, b) => a.id - b.id)
      .map((cart) => {
        const { id, item } = cart;
        const myCart = products.find((product) => product.id === id);

        return `
    <div class="cart-item">
        <img width="100" src=${myCart?.img} alt="" />
        <div class="details">

          <div class="title-price-x">
              <h4 class="title-price">
                <p>${myCart?.name}</p>
                <p class="cart-item-price">$ ${myCart?.price}</p>
              </h4>
          </div>

          <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">${item}</div>
              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
          </div>

          <h3>$ ${item * myCart?.price}</h3>
          <button class='remove_cart' onClick= "removeCart(${id})"> Remove from cart </button>
        </div>
      </div>
      `;
      })
      .join(""));
  } else {
    shopping_cart.innerHTML = ``;
    label.innerHTML = `
  <h2>Cart is Empty</h2>
  <a href="index.html">
    <button class="HomeBtn">Back to home</button>
  </a>
  `;
  }
};

const removeCart = (id) => {
  const agree = confirm("are you to remove this cart");
  if (agree) {
    shoppingCart = shoppingCart.filter((x) => x.id !== id);
    localStorage.setItem("shopping_cart", JSON.stringify(shoppingCart));
    loadData();
  }
};

const increment = (id) => {
  let exitProduct = shoppingCart.find((cart) => cart.id === id);

  if (exitProduct) {
    exitProduct.item = exitProduct.item + 1;
  }

  const filteredCart = shoppingCart.filter((cart) => cart.id !== id);
  const newCart = [...filteredCart, exitProduct];
  update(id);
  loadData();
  localStorage.setItem("shopping_cart", JSON.stringify(newCart));
};
const decrement = (id) => {
  let exitProduct = shoppingCart.find((cart) => cart.id === id);

  if (exitProduct && exitProduct.item < 1) {
    return;
  } else {
    exitProduct.item = exitProduct.item - 1;
  }

  const filteredCart = shoppingCart.filter((cart) => cart.id !== id);
  const newCart = [...filteredCart, exitProduct];
  update(id);
  loadData();
  localStorage.setItem("shopping_cart", JSON.stringify(newCart));
};

const update = (id) => {
  const search = shoppingCart.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
};

const totalMoney = (products) => {
  if (shoppingCart.length !== 0) {
    let amount = shoppingCart
      .map((x) => {
        let { item, id } = x;
        let search = products.find((y) => y.id === id) || [];

        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);

    label.innerHTML = `
    <h2>Total Bill : $ ${amount}</h2>
    <button class="checkout">Checkout</button>
    <button onclick="clearCart()" class="removeAll">Clear Cart</button>
    `;
  } else return;
};

const clearCart = () => {
  const agree = confirm("are you sure to clear all cart");
  if (agree) {
    shoppingCart = [];
    loadData();

    localStorage.setItem("shopping_cart", JSON.stringify(shoppingCart));
  }
};
