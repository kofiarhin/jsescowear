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

  let linksMarkup = "";

  categories.forEach((item) => {
    linksMarkup += `<a href="store.html?category=${item}"> ${item}</a>`;
  });
  linksMarkup += `<a href="cart.html"> Cart </a>`;
  linksMarkup += `<div class="close">
                    <i class="fa fa-window-close"></i>
                </div>`;

  domLinks.innerHTML = linksMarkup;
}

async function init() {
  handleNavigation();
  handleNavLinks();
}

init();