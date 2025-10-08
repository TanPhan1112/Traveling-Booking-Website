const cartStorage = JSON.parse(localStorage.getItem("cart")) || [];
const cartList = document.querySelector("#cartList");

if (cartStorage.length !== 0) {
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
}

const mastercard = document.querySelector("#mastercard");
const visa = document.querySelector("#visa");
const amex = document.querySelector("#amex");
const paypal = document.querySelector("paypal");
const paymentDetail = document.querySelector(".paymentdetail");

document.addEventListener('DOMContentLoaded', function () {
    paymentDetail.innerHTML = `
        <form id="checkout">
            <p>Tên thẻ</p>
            <input type="text" id="fullName">
            <p>Số thẻ</p>
            <input type="text" id="number">
            <p>Ngày hết hạn</p>
            <input type="date" id="date">
            <p>CVV</p>
            <input type="text" id="number">
            <div id="checkoutbtn">
                <button type="submit">Thanh toán</button>
            </div>
        </form>
    `;
});

mastercard.addEventListener("click", () => {
    paymentDetail.innerHTML = `
        <form id="checkout">
            <p>Tên thẻ</p>
            <input type="text" id="fullName">
            <p>Số thẻ</p>
            <input type="text" id="number">
            <p>Ngày hết hạn</p>
            <input type="date" id="date">
            <p>CVV</p>
            <input type="text" id="number">
            <div id="checkoutbtn">
                <button type="submit">Thanh toán</button>
            </div>
        </form>
    `;
});

function deleteTour(id) {
    const newCart = cartStorage.filter((item) => item.id !== id);


}
