let cartStorage = JSON.parse(localStorage.getItem("cart")) || [];
const cartList = document.querySelector("#cartList");
const checkout = document.querySelector(".checkout");
let numberTour = document.querySelector("#numbertour");
let sum = 0;

function showCartLits() {
    cartStorage = JSON.parse(localStorage.getItem("cart")) || [];
    if (cartStorage.length !== 0) {
        numberTour.innerHTML = `
            ${cartStorage.length}
        `;
        for (let item of cartStorage) {
            const cartCard = document.createElement("div");
            cartCard.classList.add("cart-card");

            cartCard.innerHTML = `
                <div><img src="${item.images}" alt="${location}"></div>
                <h4>${item.title}</h4>
                <p style="color:red;font-weight:bolder;">${item.price.toLocaleString('vi-VN', {
                style: 'currency', currency: 'VND',
            })}</p>
                <div id="deletebtn"><button onclick="deleteTour(${item.id})">Xóa tour</button></div>
        `;
            cartList.appendChild(cartCard);
        }
        sum = cartStorage.reduce((total, item) => {
            return total + item.price;
        }, 0);
        checkout.innerHTML = `
            <p style="text-align: center; color: white;">Tổng tiền: ${sum.toLocaleString('vi-VN', {
            style: 'currency', currency: 'VND',
        })}</p>
            <div id="checkoutbtn">
                <button type="submit">Thanh toán</button>
            </div>
        `;
    } else {
        sum = cartStorage.reduce((total, item) => {
            return total + item.price;
        }, 0);
        checkout.innerHTML = `
            <p style="text-align: center; color: white;">Tổng tiền: ${sum.toLocaleString('vi-VN', {
            style: 'currency', currency: 'VND',
        })}</p>
            <div id="checkoutbtn">
                <button type="submit">Thanh toán</button>
            </div>
        `;
        numberTour.innerHTML = `
            ${cartStorage.length}
        `;
        const errorMsg = document.querySelector("#tourCart");
        errorMsg.textContent = "Giỏ hàng trống";
    }
}

function deleteTour(id) {
    const newCart = cartStorage.filter((item) => +item.id !== id);
    localStorage.setItem("cart", JSON.stringify(newCart));
    cartList.innerHTML = "";
    showCartLits();
}

showCartLits();