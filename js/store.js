// render items
function renderItems(data) {
  const domContainer = document.querySelector("#store .container");
  const title = document.querySelector("#store .title");

  let markup = "";

  data.forEach((item) => {
    const { name, price, category } = item;
    title.textContent = category.toUpperCase();
    markup += `
      <a class="thumb-unit" href="item.html?category=${category}&&name=${name}">
                <img src="../images/${category}/${name}/1.jpg" alt="">
                <div class="text-wrapper">
                    <p class="name">${name}</p>
                    <p class="price">£${price.toFixed(2)}</p>
                </div>
            </a>
     
     `;
  });

  domContainer.innerHTML = markup;
}

async function handleCategorySearch() {
  const search = new URLSearchParams(window.location.search);

  const category = search.get("category");

  const data = category ? await getStoreData(category) : await getStoreData();

  if (data && data.length > 0) {
    renderItems(data);
  }
}
async function init() {
  // check for category

  // check if there is any search result
  const searchData = sessionStorage.getItem("searchData");

  if (searchData) {
    const data = JSON.parse(searchData);
    const search = sessionStorage.getItem("search");

    console.log(search);

    renderSearchResult(search, data);

    // clear session
    sessionStorage.removeItem("searchData");
    sessionStorage.removeItem("search");
  } else {
    handleCategorySearch();
  }
}

init();
