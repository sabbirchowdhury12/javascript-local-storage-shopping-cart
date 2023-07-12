const shopping_cart = document.getElementById("shopping_cart");
let shoppingCart = JSON.parse(localStorage.getItem("shopping_cart")) || [];
const productCartQuantity = document.getElementById("cartAmount");

let calculation = () => {
  productCartQuantity.innerHTML = shoppingCart.length;
};

calculation();

const loadData = async () => {
  const response = await fetch("data/data.json");
  const data = await response.json();
  generateShoppingCart(data);
};

loadData();

const generateShoppingCart = (products) => {
  shopping_cart.innerHTML = products
    .map((product) => {
      const { img, desc, name, id, price } = product;
      return `<div class="container page-wrapper">
      <div class="page-inner">
        <div class="row">
          <div class="el-wrapper">
            <div class="box-up">
              <img
                class="img"
                src=${img}
                alt=""
              />
              <div class="img-info">
                <div class="info-inner">
                  <span class="p-name">${name}</span>
                  <span class="p-company">Yeezy</span>
                </div>
                <div class="a-size">
                  Available sizes : <span class="size">S , M , L , XL</span>
                </div>
              </div>
            </div>

            <div class="box-down">
              <div class="h-bg">
                <div class="h-bg-inner"></div>
              </div>

              <span class="cart" href="#">
                <span class="price">${price}</span>
                <span class="add-to-cart">
                  <button onClick="addToCart(${id})" class="btn">Add in cart</button>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>`;
    })
    .join("");
};

const addToCart = (id) => {
  const exitProduct = shoppingCart.find((product) => product.id === id);
  if (exitProduct) {
    alert("already you added this product");
    return;
  }

  const cart = {
    id: id,
    item: 1,
  };

  shoppingCart = [...shoppingCart, cart];
  localStorage.setItem("shopping_cart", JSON.stringify(shoppingCart));
  calculation();
  alert("added succesfully");
};
