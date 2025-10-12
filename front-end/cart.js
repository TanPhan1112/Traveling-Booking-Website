let cartStorage = JSON.parse(localStorage.getItem("cart")) || [];
const cartList = document.querySelector("#cartList");
const checkout = document.querySelector(".checkout");
let errorMsg = document.querySelector("#tourCart");
let numberTour = document.querySelector("#numbertour");
let sum = 0;

function showCartList() {
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
            <h1>Tổng tiền: ${sum.toLocaleString('vi-VN', {
            style: 'currency', currency: 'VND',
        })}</h1>
            <div id="checkoutbtn">
                <button onclick="checkOut()">Thanh toán</button>
            </div>
        `;
    } else {
        sum = cartStorage.reduce((total, item) => {
            return total + item.price;
        }, 0);
        checkout.innerHTML = `
            <h1>Tổng tiền: ${sum.toLocaleString('vi-VN', {
            style: 'currency', currency: 'VND',
        })}</h1>
            <div id="checkoutbtn">
                <button onclick="checkOut()">Thanh toán</button>
            </div>
        `;
        numberTour.innerHTML = `
            ${cartStorage.length}
        `;
        errorMsg = document.querySelector("#tourCart");
        errorMsg.textContent = "Giỏ hàng trống";
    }
}

function deleteTour(id) {
    const newCart = cartStorage.filter((item) => +item.id !== id);
    localStorage.setItem("cart", JSON.stringify(newCart));
    cartList.innerHTML = "";
    showCartList();
}

function checkOut() {
    if (Object.keys(user).length !== 0 && cartStorage.length !== 0) {
        window.location.href = "checkout.html";
    } else if (Object.keys(user).length !== 0 && cartStorage.length === 0) {
        errorMsg = document.querySelector("#tourCart");
        errorMsg.textContent = "Giỏ hàng trống, không thể thanh toán!";
    } else {
        window.location.href = "login.html";
    }
}

showCartList();