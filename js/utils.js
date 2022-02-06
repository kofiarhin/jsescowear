// get store data
async function getStoreData(category = "hoodies") {
  const res = await fetch("../../data/data.json");
  const data = await res.json();

  const dataToFormat = data[category];

  return dataToFormat.map((item) => {
    return { ...item, category };
  });
}
