let orderId = localStorage.getItem("id_order");
user = JSON.parse(localStorage.getItem("user")) || {};
const cartList = document.querySelector("#cartList");
const cuxInfo = document.querySelector("#cuxInfo");
let sum = 0;

async function getOrderInfo(orderId) {
    try {
        const response = await fetch(`http://localhost:3000/order?id=${orderId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data[0]);
        return data[0];
    } catch (error) {
        console.error("Lỗi Fetch API:", error);
        return null;
    }
}

function show_confirm(order) {
    if (order.id.length !== 0) {
        for (let item of order.items) {
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

        const cuxCard = document.createElement("div");
        cuxCard.classList.add("cux-card");

        cuxCard.innerHTML = `
            <p>Mã đơn hàng ${order.id}</p>
            <p>Họ tên ${order.full_name}</p>
            <p>Email ${order.email}</p>
            <p>Số điện thoại ${order.phone}</p>
            <p>Hình thức thanh toán ${order.payment_type}</p>
            <p>Ngày đặt ${order.date}</p>
            <p>Tổng tiền ${order.total}</p>
        `;

        cuxInfo.appendChild(cuxCard);
    }
}

getOrderInfo(orderId).then((data) => show_confirm(data));