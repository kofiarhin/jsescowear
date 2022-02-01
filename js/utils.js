// handle navigation
function handleNavigation() {
  const menu = document.querySelector(".menu");
  const close = document.querySelector(".close");
  const links = document.querySelector(".links");

  menu.addEventListener("click", function () {
    links.classList.add("active");
  });

  close.addEventListener("click", function () {
    links.classList.remove("active");
  });
}
function inti() {
  handleNavigation();
}

inti();
