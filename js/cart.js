// check for items in cart
const domCart = document.querySelector("#cart .container");
let cartData = sessionStorage.getItem("cartData");
// clear cart

// render total
const renderTotal = (data) => {
  let sum = 0;
  data.forEach((item) => {
    sum += parseInt(item.price);
  });
  return sum.toFixed(2);
};

// clear cart
const clearCart = () => {
  sessionStorage.removeItem("cartData");
  domCart.innerHTML = `<h2 class="title">Cart is Empty </h2>`;
};

// render cart
const renderCart = (data) => {
  let domMarkup = "";

  data.forEach((item, index) => {
    const { name, price, category } = item;
    let markup = `<div class="cart-unit" id="item-${index}">
                    <img src="../images/${category}/${name}/1.jpg" alt="">
                    <div class="text-wrapper">
                        <p class="name">${name}</p>
                        <p class="price">£${price.toFixed(2)}</p>
                        <i class="fa fa-window-close remove"></i>
                    </div>
                </div>`;

    domMarkup += markup;
  });

  domCart.innerHTML = `<div>
    
                <div class="cart-unit-wrapper">
                    ${domMarkup}
                </div>

                <div class="total"> 
                    <h2> Total: £${renderTotal(data)} </h2>
                </div>

                <div class="button-wrapper"> 
                      <button class="clear-cart">Clear Cart </button>
                </div>
    </div>`;
};

if (cartData) {
  const data = JSON.parse(cartData);

  renderCart(data);

  // cart dom events
  domCart.addEventListener("click", function (e) {
    // clear cart
    if (e.target.classList.contains("clear-cart")) {
      clearCart();
    }

    // remove item from cart
    if (e.target.classList.contains("remove")) {
      // get data from sesison
      cartData = sessionStorage.getItem("cartData");

      if (cartData) {
        const data = JSON.parse(cartData);
        // get id of item
        const strId = e.target.parentNode.parentNode.id;
        const id = parseInt(strId.split("-")[1]);

        const item = data[id];

        const filteredData = data.filter((i, index) => id !== index);

        if (filteredData.length > 0) {
          renderCart(filteredData);
          sessionStorage.setItem("cartData", JSON.stringify(filteredData));
        } else {
          clearCart();
        }
      } else {
        console.log("there are no items in cart");
      }
    }
  });
} else {
  domCart.innerHTML = `<h2 class="title">Cart is Empty</h2>`;
}
