let cartStorage = JSON.parse(localStorage.getItem("cart")) || [];
user = JSON.parse(localStorage.getItem("user")) || {};
const cartList = document.querySelector("#cartList");
const cuxInfo = document.querySelector("#cuxInfo");
let numberTour = document.querySelector("#numbertour");
let sum = 0;

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
            <h1 class="total">Tổng tiền: <span style="color:red;font-weight:bolder;">${sum.toLocaleString('vi-VN', { style: 'currency', currency: 'VND', })}</span></h1>
        `;
        cartList.appendChild(total);
    }
}

showCartList_checkOut();

async function getUserInfo(user) {
    try {
        const response = await fetch(`https://traveling-booking-website.onrender.com/customers?id=${user.id}`);
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
    const cuxCard = document.createElement("div");
    cuxCard.classList.add("cux-card");

    let phone = "";
    let address = "";

    if (user.phone === undefined) {
        phone = "";
    } else {
        phone = user.phone;
    }

    if (user.address === undefined) {
        address = "";
    } else {
        address = user.address;
    }

    cuxCard.innerHTML = `
        <form id="bookNow">
            <p>Họ tên</p>
            <input id="fullName" value="${user.full_name}">
            <p>Email</p>
            <input id="email" value="${user.email}">
            <p>Số điện thoại</p>
            <input id="phone" value="${phone}">
            <p>Địa chỉ</p>
            <input id="address" value="${address}">
            <p>Số lượng người</p>
            <input id="people" value="">
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
            <button type="submit">Đặt tour bây giờ</button>
        </form>
    `;

    cuxInfo.appendChild(cuxCard);

    const bookNow = document.querySelector("#bookNow");

    bookNow.addEventListener("submit", async (e) => {
        e.preventDefault();

        const fullName = document.querySelector("#fullName");
        const email = document.querySelector("#email");
        const phone = document.querySelector("#phone");
        const address = document.querySelector("#address");
        const people = document.querySelector("#people");
        const paymentType = document.querySelector("#paymentType");

        if (!fullName.value || !email.value || !phone.value || !address.value || !people.value || !paymentType.value) {
            alert("Vui lòng không bỏ trống!!!");
        } else {
            const checked = await checkEmail(email.value);

            if (checked.length !== 0 && email.value !== user.email) {
                alert("Email đã được đăng ký!!!");
                return;
            } else if (checked.length !== 0 && email.value === user.email) {
                const currentDate = new Date();
                const options = {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                };
                const formattedDate = currentDate.toLocaleDateString('vi-VN', options);

                const order = { user_id: user.id, full_name: fullName.value, email: email.value, phone: phone.value, people: people.value, payment_type: paymentType.value, total: sum, date: formattedDate, items: cartStorage };
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
                } catch (error) {
                    alert("Thêm thông tin thất bại!");
                    console.error("Lỗi Fetch API:", error);
                }

                try {
                    const response = await fetch(`https://traveling-booking-website.onrender.com/order`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(order)
                    });

                    const data = await response.json();
                    localStorage.setItem("id_order", data.id);

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    window.location.href = "confirm.html";
                } catch (error) {
                    alert("Đặt tour thất bại!");
                    console.error("Lỗi Fetch API:", error);
                }
            } else {
                const currentDate = new Date();
                const options = {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                };
                const formattedDate = currentDate.toLocaleDateString('vi-VN', options);

                const order = { user_id: user.id, full_name: fullName.value, email: email.value, phone: phone.value, people: people.value, payment_type: paymentType.value, total: sum, date: formattedDate, items: cartStorage };
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
                } catch (error) {
                    alert("Thêm thông tin thất bại!");
                    console.error("Lỗi Fetch API:", error);
                }

                try {
                    const response = await fetch(`https://traveling-booking-website.onrender.com/order`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(order)
                    });

                    const data = await response.json();
                    localStorage.setItem("id_order", data.id);

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    window.location.href = "confirm.html";
                } catch (error) {
                    alert("Đặt tour thất bại!");
                    console.error("Lỗi Fetch API:", error);
                }
            }
        }
    });
}

getUserInfo(user).then((data) => showCuxInfo_checkOut(data));