function renderItem(item) {
  console.log("xxxx", item);
}

async function init() {
  // get url params
  const search = new URLSearchParams(window.location.search);
  const category = search.get("category");
  const name = search.get("name");

  if (name && category) {
    const item = await getItem(category, name);

    if (item) {
      renderItem(item);
    }
  } else {
    console.log("error");
  }
}

init();
