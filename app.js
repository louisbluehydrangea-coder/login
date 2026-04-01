const currentUser = localStorage.getItem("currentUser");

if (!currentUser) {
  window.location.href = "index.html";
}

document.getElementById("welcome").innerText = "Hello, " + currentUser;

// Load users
let users = JSON.parse(localStorage.getItem("users")) || {};
let todos = users[currentUser].tasks || [];

function saveData() {
  users[currentUser].tasks = todos;
  localStorage.setItem("users", JSON.stringify(users));
}

function addTask() {
  const input = document.getElementById("input");

  if (input.value.trim() === "") return;

  todos.push({
    text: input.value,
    completed: false
  });

  input.value = "";
  saveData();
  render();
}

function deleteTask(index) {
  todos.splice(index, 1);
  saveData();
  render();
}

function toggleTask(index) {
  todos[index].completed = !todos[index].completed;
  saveData();
  render();
}

function render() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");

    li.className = todo.completed ? "completed" : "";

    li.innerHTML = `
      <span onclick="toggleTask(${index})">${todo.text}</span>
      <button onclick="deleteTask(${index})">X</button>
    `;

    list.appendChild(li);
  });
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}

// Initial render
render();