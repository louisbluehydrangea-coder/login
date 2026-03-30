let isLogin = true;

/* Load saved theme */
window.onload = function () {
    const savedTheme = localStorage.getItem("theme") || "dark";
    document.body.classList.add(savedTheme);
};

/* Toggle dark/light */
function toggleTheme() {
    const body = document.body;
    const toggle = document.querySelector(".theme-toggle");

    if (body.classList.contains("dark")) {
        body.classList.replace("dark", "light");
        localStorage.setItem("theme", "light");
        toggle.textContent = "☀️";
    } else {
        body.classList.replace("light", "dark");
        localStorage.setItem("theme", "dark");
        toggle.textContent = "🌙";
    }
}

/* Switch login/register */
function toggleForm() {
    const title = document.getElementById("title");
    const button = document.querySelector("button");

    if (isLogin) {
        title.innerText = "Register";
        button.innerText = "Register";
    } else {
        title.innerText = "Login";
        button.innerText = "Login";
    }

    isLogin = !isLogin;
}

/* Login/Register logic */
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!username || !password) {
        alert("Please fill all fields");
        return;
    }

    if (isLogin) {
        const storedUser = localStorage.getItem(username);

        if (!storedUser) {
            alert("User not found");
            return;
        }

        const userData = JSON.parse(storedUser);

        if (userData.password === password) {
            alert("Login successful");
            window.location.href = "dashboard.html";
        } else {
            alert("Wrong password");
        }

    } else {
        const userData = {
            username: username,
            password: password
        };

        localStorage.setItem(username, JSON.stringify(userData));
        alert("Registration successful");
        toggleForm();
    }
}