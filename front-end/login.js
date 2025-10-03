const logIn = document.querySelector("#login");

async function checkAccount(email, password) {
    try {
        const response = await fetch(`http://localhost:3000/customers?email=${email}&password=${password}`);
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

logIn.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.querySelector("#email");
    const password = document.querySelector("#password");
    const error = document.querySelector("#error");

    const inputEmail = email.value;
    const inputPassword = password.value;

    if (!inputEmail || !inputPassword) {
        error.innerHTML = "Vui lòng không bỏ trống!!!";
    }

    const checked = await checkAccount(inputEmail, inputPassword);

    if (checked.length !== 0) {
        console.log(checked[0]);
        error.innerHTML = "Đăng nhập thành công!!!";
        localStorage.setItem("user", JSON.stringify(checked[0]));
        window.location.href = "index.html";
    } else {
        error.innerHTML = "Sai email hoặc password!!!";
        return;
    }
});