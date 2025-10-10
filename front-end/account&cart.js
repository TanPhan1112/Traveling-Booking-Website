const user = JSON.parse(localStorage.getItem("user")) || {};
const loggedIn = document.querySelector("#loggedin");

if (Object.keys(user).length !== 0) {
    loggedIn.innerHTML = `
        <a href="profile.html">${user.full_name}</a>
        <div class="dropdown-content">
            <a href="#">Hồ sơ</a>
            <button onclick="logOut()">Đăng xuất</button>
        </div>
    `;
}

const cart = JSON.parse(localStorage.getItem("cart")) || [];
numberTour = document.querySelector("#numbertour");

numberTour.innerHTML = `
    ${cart.length}
`;

function logOut() {
    localStorage.removeItem("user");
    window.location.href = "index.html";
}