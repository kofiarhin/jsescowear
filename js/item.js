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
function renderItem(item, category) {
  // render text details
  const name = document.querySelector(".name");
  const price = document.querySelector(".price span");

  price.textContent = item.price.toFixed(2);
  name.textContent = item.name;
  // render main thumb
  const thumb = document.querySelector(".main-thumb img");
  const thumbUrl = `/images/${category}/${item.name}/1.jpg`;
  thumb.src = thumbUrl;

  // render thumb nails
  const thumbWrapper = document.querySelector(".thumb-wrapper");
  let thumbWrapperMarkup = "";

  // build thumb wrapper markup
  for (let i = 1; i < 4; i++) {
    const url = `/images/${category}/${item.name}/${i}.jpg`;
    const img = `<img src="${url}" />`;
    thumbWrapperMarkup += `<div class="thumb-unit"> ${img}</div>`;
  }

  thumbWrapper.innerHTML = thumbWrapperMarkup;

  // handle pointer events with thumbname

  handleThumb();

  // render sizes

  const { sizes } = item;

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

async function renderDetails() {
  console.log("Render details");

  const search = new URLSearchParams(window.location.search);
  const category = search.get("category");
  const name = search.get("name");

  if (name && category) {
    const item = await getItem(category, name);
    renderTitle(item);

    if (item) {
      renderItem(item, category);
    }
  } else {
    console.log("error");
  }
}
async function init() {
  renderDetails();
  // get url params
}

init();
