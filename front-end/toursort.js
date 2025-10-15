const priceSort_Asc = document.querySelector("#sortLowHigh");
const priceSort_Des = document.querySelector("#sortHighLow");

priceSort_Asc.addEventListener("click", async () => {
    const listToSort = await fetchTours();
    const sorted = listToSort.sort((a, b) => a.price - b.price);
    displayTours(sorted);
});

priceSort_Des.addEventListener("click", async () => {
    const listToSort = await fetchTours();
    const sorted = listToSort.sort((a, b) => b.price - a.price);
    displayTours(sorted);
});