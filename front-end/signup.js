const signUp = document.querySelector("#signup");

function simpleHash(str) {
    let hash = 0;

    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash |= 0; // Convert to 32-bit integer
    }

    return hash.toString(16); // Return as hex string
}

async function checkEmail(email) {
    try {
        const response = await fetch(`http://localhost:3000/customers?email=${email}`);
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

async function postAccount(user) {
    fetch('http://localhost:3000/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    })
        .then(response => response.json())
        .then(data => console.log(data));
}

signUp.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fullName = document.querySelector("#fullName");
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");
    const passwordMatch = document.querySelector("#passwordMatch");
    const error = document.querySelector("#error");

    const inputFullName = fullName.value;
    const inputEmail = email.value;
    const inputPassword = password.value;
    const inputPasswordMatch = passwordMatch.value;

    if (!inputFullName || !inputEmail || !inputPassword || !inputPasswordMatch) {
        error.innerHTML = "Vui lòng không bỏ trống!!!";
    } else if (inputPassword !== inputPasswordMatch) {
        error.innerHTML = "Password không khớp!!!";
    } else if (inputPassword.length < 8) {
        error.innerHTML = "Password không đủ 8 ký tự!!!";
    } else {
        const checked = await checkEmail(inputEmail);

        if (checked.length !== 0) {
            error.innerHTML = "Email đã được đăng ký!!!";
            return;
        }

        let hashed = simpleHash(inputPassword);

        const user = { full_name: inputFullName, email: inputEmail, password: hashed };

        postAccount(user);
        window.location.href = "login.html";
    }
});