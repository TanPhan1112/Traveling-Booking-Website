user = JSON.parse(localStorage.getItem("user")) || {};
const cartList = document.querySelector("#cartList");
const cuxInfo = document.querySelector("#cuxInfo");

async function checkEmail(email) {
    try {
        const response = await fetch(`https://traveling-booking-website.onrender.com/customers?email=${email}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Lỗi Fetch API:", error);
        return null;
    }
}

async function getOrderInfo(orderId) {
    try {
        const response = await fetch(`https://traveling-booking-website.onrender.com/order?user_id=${orderId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
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
            date: booked.date,
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
            <p class="grid-header">Mã đơn hàng: <strong>${items.id}</strong> (${items.date})</p>
            <p class="grid-header">Tổng tiền: <span style="color:red;font-weight:bolder;">${items.total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND', })}</span></p>
            <p class="grid-header">Thanh toán: <strong>${items.payment}</strong></p>
        `;

        items.orders.forEach(item => {
            cartCard.innerHTML += `
                <div><img src="${item.images}" alt="${item.location}"></div>
                    <h4>${item.title}</h4>
                    <p style="color:red;font-weight:bolder;text-align:right;">${item.price.toLocaleString('vi-VN', {
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
        medal = `Thành viên&nbsp;<i>Vàng</i>&nbsp;&nbsp;<img id="gold" width="24" height="24" src="images/gold.svg" alt="gold">`;
    } else if (Object.keys(order).length < 10 && Object.keys(order).length > 3) {
        medal = `Thành viên&nbsp;<i>Bạc</i>&nbsp;&nbsp;<img id="silver" width="24" height="24" src="images/silver.svg" alt="silver">`;
    } else {
        medal = `Thành viên&nbsp;<i>Đồng</i>&nbsp;&nbsp;<img id="bronze" width="24" height="24" src="images/bronze.svg" alt="bronze">`;
    }

    let phone = "";
    let address = "";

    if (user.phone === undefined) {
        phone = `<strong">cập nhật ngay...</strong>`;
    } else {
        phone = user.phone;
    }

    if (user.address === undefined) {
        address = `<strong">cập nhật ngay...</strong>`;
    } else {
        address = user.address;
    }

    cuxCard.innerHTML = `
        <p>Họ tên: ${user.full_name}</p>
        <p>Email: ${user.email}</p>
        <p>Địa chỉ: ${address}</p>
        <p>Số điện thoại: ${phone}</p>
        <p>Số lượng đơn đã đặt: <strong>${Object.keys(order).length}</strong></p>
        <p style="display: flex;flex-direction: row;align-items: center;">Cấp bậc: ${medal}</p>
        <h2>Cập nhật thông tin cá nhân</h2>
        <form id="update">
            <p>Họ tên</p>
            <input id="fullName">
            <p>Email</p>
            <input id="email">
            <p>Địa chỉ</p>
            <input id="address">
            <p>Số điện thoại</p>
            <input id="phone">
            <button type="submit">Cập nhật</button>
        </form>
    `;

    cuxInfo.appendChild(cuxCard);

    const update = document.querySelector("#update");

    update.addEventListener("submit", async (e) => {
        e.preventDefault();

        const fullName = document.querySelector("#fullName");
        const email = document.querySelector("#email");
        const phone = document.querySelector("#phone");
        const address = document.querySelector("#address");

        if (!fullName.value || !email.value || !phone.value || !address.value) {
            alert("Vui lòng không bỏ trống!!!");
        } else {
            const checked = await checkEmail(email.value);

            if (checked.length !== 0 && email.value !== user.email) {
                alert("Email đã được đăng ký!!!");
                return;
            } else if (checked.length !== 0 && email.value === user.email) {
                const customer = { full_name: fullName.value, email: email.value, password: user.password, phone: phone.value, address: address.value };

                try {
                    const response = await fetch(`https://traveling-booking-website.onrender.com/customers/${user.id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(customer)
                    });
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    localStorage.setItem("user", JSON.stringify(data));
                    alert("Đã cập nhật thành công!");
                } catch (error) {
                    alert("Thêm thông tin thất bại!");
                    console.error("Lỗi Fetch API:", error);
                }
            } else {
                const customer = { full_name: fullName.value, email: email.value, password: user.password, phone: phone.value, address: address.value };

                try {
                    const response = await fetch(`https://traveling-booking-website.onrender.com/customers/${user.id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(customer)
                    });
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    const data = await response.json();
                    localStorage.setItem("user", JSON.stringify(data));
                    alert("Đã cập nhật thành công!");
                } catch (error) {
                    alert("Thêm thông tin thất bại!");
                    console.error("Lỗi Fetch API:", error);
                }
            }
        }
    });
}

getOrderInfo(user.id).then((data) => show_order_history(data));