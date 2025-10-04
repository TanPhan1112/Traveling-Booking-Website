const cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartList = document.querySelector("#cartList");

if (cart.length !== 0) {
    for (let item of cart) {
        let cartDiv = document.createElement("div");

        cartDiv.innerHTML = `
            <h4>${item.title}</h4>
            <p>${item.price.toLocaleString('vi-VN', {
            style: 'currency', currency: 'VND',
        })}</p>
            <button onclick="deleteTour(${item.id})">Xóa tour</button>
        `;
        cartList.appendChild(cartDiv);
    }

}

function deleteTour(id) {
    const newCart = cart.filter((item) => item.id !== id);

    
}
