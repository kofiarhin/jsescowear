// get store item
async function getItem(category, name) {
  const data = await getStoreData(category);

  // find item
  return data.find((item) => item.name === name);
}

// render title
const renderTitle = (item) => {
  const title = document.querySelector("title");

  title.textContent = item.name.toLowerCase();
};

// handle thumb when thumb nail is clicked
const handleThumb = () => {
  const thumbWrapper = document.querySelector(".thumb-wrapper");

  thumbWrapper.addEventListener("click", function (e) {
    const mainThumb = document.querySelector(".main-thumb img");

    if (e.target.parentNode.classList.contains("thumb-unit")) {
      mainThumb.src = e.target.src;
    }
  });
};
// render item
function renderItem(item) {
  const { category, name, price, sizes } = item;
  // render text details
  const domName = document.querySelector(".name");
  const domPrice = document.querySelector(".price span");

  domPrice.textContent = price.toFixed(2);
  domName.textContent = name;
  // render main thumb
  const thumb = document.querySelector(".main-thumb img");
  const thumbUrl = `/images/${category}/${name}/1.jpg`;
  thumb.src = thumbUrl;

  // render thumb nails
  const thumbWrapper = document.querySelector(".thumb-wrapper");
  let thumbWrapperMarkup = "";

  // build thumb wrapper markup
  for (let i = 1; i < 4; i++) {
    const url = `/images/${category}/${name}/${i}.jpg`;
    const img = `<img src="${url}" />`;
    thumbWrapperMarkup += `<div class="thumb-unit"> ${img}</div>`;
  }

  thumbWrapper.innerHTML = thumbWrapperMarkup;

  // handle pointer events with thumbname

  handleThumb();

  // render sizes

  // const { sizes } = item;

  const selectWrapper = document.querySelector(".select-wrapper");

  let optionsMarkup = "";

  sizes.forEach((size) => {
    let markup = `<option value=${size}>${size.toUpperCase()}</option>`;
    optionsMarkup += markup;
  });

  const selectMarkup = `
      <label> Select Size </label>
      <select> ${optionsMarkup}  </select>
  `;

  selectWrapper.innerHTML = selectMarkup;
}

async function renderDetails(item) {
  // render details
  renderTitle(item);
  renderItem(item);
}

// add item

function addItem(item) {
  // get checkout button
  const domCheckout = document.querySelector(".button-wrapper a");

  console.log(domCheckout);
  let cartData = [];

  const check = sessionStorage.getItem("cartData");

  if (!check) {
    cartData.push(item);

    const dataToSubmit = JSON.stringify(cartData);

    sessionStorage.setItem("cartData", dataToSubmit);
    domCheckout.classList.add("active");
  } else {
    cartData = sessionStorage.getItem("cartData");

    const data = JSON.parse(cartData);
    const newData = [item, ...data];
    // data.push(item);

    const dataToSubmit = JSON.stringify(newData);

    sessionStorage.setItem("cartData", dataToSubmit);

    const checks = JSON.parse(sessionStorage.getItem("cartData"));

    domCheckout.classList.add("active");
  }
}
// handle add item
function handleAddItem(item) {
  const btn = document.querySelector(".button-wrapper button");

  btn.addEventListener("click", function () {
    // get item size
    const size = document.querySelector("select").value;

    item.size = size;

    // add item to cart

    addItem(item);
  });
}

// initialize app
async function init() {
  const search = new URLSearchParams(window.location.search);
  const name = search.get("name");
  const category = search.get("category");

  const item = await getItem(category, name);

  //format item details by adding category
  const formattedItem = { ...item, category };

  renderDetails(formattedItem);

  // handle add item
  handleAddItem(item);
}

init();
