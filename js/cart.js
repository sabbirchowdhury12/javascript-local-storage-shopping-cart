const loadData = async () => {
  const response = await fetch("data/data.json");
  const data = await response.json();
  generateShoppingCart(data);
};
