const user = JSON.parse(localStorage.getItem("user")) || {};
const loggedIn = document.querySelector("#loggedin");

if (Object.keys(user).length !== 0) {
    loggedIn.innerHTML = `
        <a href="profile.html">${user.full_name}</a>
        <div class="dropdown-content">
            <a href="#">Profile</a>
            <a href="cart.html">My cart</a>
            <a href="logout.html">Đăng xuất</a>
        </div>
    `;
}

const cart = JSON.parse(localStorage.getItem("cart")) || [];
const numberTour = document.querySelector("#numbertour");

if (cart.length !== 0) {
    numberTour.innerHTML = `
        ${cart.length}
    `;
}