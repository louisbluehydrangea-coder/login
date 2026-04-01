let isLogin = true;

function toggleMode() {
  isLogin = !isLogin;

  document.getElementById("formTitle").innerText = isLogin ? "Login" : "Register";

  document.querySelector("button").innerText = isLogin ? "Login" : "Register";

  document.querySelector(".switch").innerText =
    isLogin ? "Don't have an account? Register" : "Already have an account? Login";
}

function handleAuth() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  let users = JSON.parse(localStorage.getItem("users")) || {};

  if (isLogin) {
    if (users[username] && users[username].password === password) {
      localStorage.setItem("currentUser", username);
      window.location.href = "dashboard.html";
    } else {
      alert("Invalid credentials");
    }
  } else {
    if (users[username]) {
      alert("User already exists");
      return;
    }

    users[username] = {
      password: password,
      tasks: []
    };

    localStorage.setItem("users", JSON.stringify(users));
    alert("Registered! Now login.");
    toggleMode();
  }
}