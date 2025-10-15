user = JSON.parse(localStorage.getItem("user")) || {};
const cartList = document.querySelector("#cartList");
const cuxInfo = document.querySelector("#cuxInfo");

async function getOrderInfo(orderId) {
    try {
        const response = await fetch(`http://localhost:3000/order?user_id=${orderId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Lỗi Fetch API:", error);
        return null;
    }
}

function show_order_history(order) {
    const allItems = order.reduce((items, booked) => {
        items.push({
            id: booked.id,
            orders: booked.items,
            total: booked.total,
            payment: booked.payment_type
        });
        return items;
    }, []);

    allItems.forEach(items => {
        const cartCard = document.createElement("div");
        cartCard.classList.add("cart-card");

        cartCard.innerHTML = `
            <p>Mã đơn hàng <strong>${items.id}</strong></p>
            <p style="color:red;font-weight:bolder;">Tổng tiền: ${items.total.toLocaleString('vi-VN', {
            style: 'currency', currency: 'VND',
        })}</p>
            <p>Thanh toán: <strong>${items.payment}</strong></p>
        `;

        items.orders.forEach(item => {
            cartCard.innerHTML += `
                <div><img src="${item.images}" alt="${item.location}"></div>
                    <h4>${item.title}</h4>
                    <p style="color:red;font-weight:bolder;">${item.price.toLocaleString('vi-VN', {
                style: 'currency', currency: 'VND',
            })}</p>
            `;
        });
        cartList.appendChild(cartCard);
    });

    const cuxCard = document.createElement("div");
    cuxCard.classList.add("cux-card");
    let medal = "";

    if (Object.keys(order).length > 10) {
        medal = `Thành viên&nbsp;<i>Vàng</i>&nbsp;<img id="gold" width="16" height="16" fill="white" src="images/gold.svg" alt="gold">`;
    } else if (Object.keys(order).length < 10 && Object.keys(order).length > 3) {
        medal = `Thành viên&nbsp;<i>Bạc</i>&nbsp;<img id="silver" width="16" height="16" fill="white" src="images/silver.svg" alt="silver">`;
    } else {
        medal = `Thành viên&nbsp;<i>Đồng</i>&nbsp;<img id="bronze" width="16" height="16" fill="white" src="images/bronze.svg" alt="bronze">`;
    }

    let phone = "";

    if (user.phone === undefined) {
        phone = `<strong style="color: red;">cập nhật...</strong>`;
    } else {
        phone = user.phone;
    }

    cuxCard.innerHTML = `
        <p>Họ tên: ${user.full_name}</p>
        <p>Email: ${user.email}</p>
        <p>Số điện thoại: ${phone}</p>
        <p>Số lượng tour đã đặt: <strong>${Object.keys(order).length}</strong></p>
        <p style="display: flex;flex-direction: row;align-items: center;">Cấp bậc: ${medal}</p>

        <h3>Cập nhật hồ sơ</h3>
        <p>Họ tên</p>
        <input id="fullName">
        <p>Email</p>
        <input id="email">
        <p>Số điện thoại</p>
        <input id="phone">
        <button onclick="update()">Cập nhật</button>
    `;

    cuxInfo.appendChild(cuxCard);
}

getOrderInfo(user.id).then((data) => show_order_history(data));