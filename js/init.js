// handle navigation
function handleNavigation() {
  const menu = document.querySelector(".menu");
  const close = document.querySelector(".close");
  const links = document.querySelector(".links");

  menu.addEventListener("click", function () {
    links.classList.add("active");
  });
}

// handle nav links
async function handleNavLinks() {
  const domLinks = document.querySelector("header .links");
  const data = await getStoreData();

  domLinks.addEventListener("click", function (e) {
    if (e.target.parentNode.classList.contains("close")) {
      domLinks.classList.remove("active");
    }
  });

  const categories = await fetch("../data/data.json")
    .then((response) => response.json())
    .then((result) => Object.keys(result));

  let linksMarkup = `
 <div class="form-wrapper">  
 
  <form action="">
                    <div class="search">
                        <input type="text" placeholder="search product">
                    </div>
                </form>
 </div>
  `;

  categories.forEach((item) => {
    linksMarkup += `<a href="store.html?category=${item}"> ${item}</a>`;
  });
  linksMarkup += `<a href="cart.html"> Cart </a>`;
  linksMarkup += `<div class="close">
                    <i class="fa fa-window-close"></i>
                </div>`;

  domLinks.innerHTML = linksMarkup;
}

async function getAllStoreData() {
  const data = await fetch("../data/data.json").then((response) =>
    response.json()
  );

  const categories = Object.keys(data);

  let dataToReturn = [];
  const formattedData = categories.forEach((cat) => {
    data[cat].forEach((item) => dataToReturn.push({ ...item, category: cat }));
  });

  return dataToReturn;
}

// render details --- refactor later
function renderDetails(data) {
  const domContainer = document.querySelector("#store .container");
  const title = document.querySelector("#store .title");

  let markup = "";

  data.forEach((item) => {
    const { name, price, category } = item;
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
// render Search result
function renderSearchResult(search, data) {
  const title = document.querySelector("#store .title");

  title.textContent = `Search result for: ${search}`;

  // render details

  renderDetails(data);
}
// handle search
function handleSearch() {
  document.addEventListener("keypress", async (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      // get input value from input field
      // perform search
      const search = document.querySelector("#navigation input").value;

      // get store data
      const allStoreData = await getAllStoreData();

      const searchResult = allStoreData.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );

      if (window.location.pathname !== "/store.html") {
        sessionStorage.setItem("searchData", JSON.stringify(searchResult));
        sessionStorage.setItem("search", JSON.stringify(search));
        window.location.href = "store.html";
      } else {
        renderSearchResult(search, searchResult);
      }
    }
  });
}

// initialize function
async function init() {
  handleNavigation();
  handleNavLinks();

  handleSearch();
}

init();
