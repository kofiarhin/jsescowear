// get store data
async function getStoreData(category = "hoodies") {
  const res = await fetch("../../data/data.json");
  const data = await res.json();

  const dataToFormat = data[category];

  return dataToFormat.map((item) => {
    return { ...item, category };
  });
}

// get store item
async function getItem(category, name) {
  const data = await getStoreData(category);

  // find item
  return data.find((item) => item.name === name);
}
