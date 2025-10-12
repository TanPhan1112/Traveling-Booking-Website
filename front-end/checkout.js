let cartStorage = JSON.parse(localStorage.getItem("cart")) || [];
user = JSON.parse(localStorage.getItem("user")) || {};
const cartList = document.querySelector("#cartList");
const cuxInfo = document.querySelector("#cuxInfo");
let numberTour = document.querySelector("#numbertour");
let sum = 0;

function showCartList_checkOut() {
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
        `;
            cartList.appendChild(cartCard);
            sum += item.price;
        }
        const total = document.createElement("div");
        total.classList.add("total");

        total.innerHTML = `
            <h1 class="total">Tổng tiền: ${sum.toLocaleString('vi-VN', {
            style: 'currency', currency: 'VND',
        })}</h1>
        `;
        cartList.appendChild(total);
    }
}

showCartList_checkOut();

async function getUserInfo(user) {
    try {
        const response = await fetch(`http://localhost:3000/customers?id=${user.id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data[0];
    } catch (error) {
        console.error("Lỗi Fetch API:", error);
        return null;
    }
}

function showCuxInfo_checkOut(user) {
    let phoneInput = "";
    const cuxCard = document.createElement("div");
    cuxCard.classList.add("cux-card");

    if (user.phone === undefined) {
        phoneInput = "Thêm số điện thoại..."
    } else {
        phoneInput = user.phone;
    }

    cuxCard.innerHTML = `
        <form id="bookNow">
            <p>Họ tên</p>
            <input id="fullName" value="${user.full_name}">
            <p>Email</p>
            <input id="email" value="${user.email}">
            <p>Số điện thoại</p>
            <input id="phone" value="${phoneInput}">
            <p>Hình thức thanh toán</p>
            <select id="paymentType" name="payment">
                <option value="credit">Credit Card</option>
                <option value="debit">Debit Card</option>
                <option value="paypal">PayPal</option>
                <option value="bank">Bank Transfer</option>
                <option value="cash">Cash on Delivery</option>
                <option value="crypto">Cryptocurrency</option>
                <option value="applepay">Apple Pay</option>
                <option value="googlepay">Google Pay</option>
                <option value="momo">MoMo</option>
                <option value="zalopay">ZaloPay</option>
            </select>
            <button type="submit">Đặt tour</button>
        </form>
    `;

    cuxInfo.appendChild(cuxCard);

    const bookNow = document.querySelector("#bookNow");

    bookNow.addEventListener("submit", (e) => {
        e.preventDefault();

        const fullName = document.querySelector("#fullName");
        const email = document.querySelector("#email");
        const phone = document.querySelector("#phone");
        const paymentType = document.querySelector("#paymentType");
        console.log(fullName.value, email.value, phone.value, paymentType.value);
    });
}

getUserInfo(user).then((data) => showCuxInfo_checkOut(data));