const BIN_ID = "67e06cfd8561e97a50f17582";
const API_KEY = "$2a$10$hD20YlzI1bEJMqaE.tDxd.imtTczoppQFIcla6eeIb41HJAHJZ1wK";
const API_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

async function fetchUsers() {
    let response = await fetch(API_URL, {
        method: "GET",
        headers: { "X-Master-Key": API_KEY }
    });
    let data = await response.json();
    return data.record.users || [];
}

async function signUp(username, password, nickname, bio) {
    let users = await fetchUsers();
    if (users.some(user => user.username === username)) {
        alert("Username already exists!");
        return;
    }

    users.push({ username, password, nickname, bio });

    await fetch(API_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "X-Master-Key": API_KEY },
        body: JSON.stringify({ users })
    });

    localStorage.setItem("loggedInUser", JSON.stringify({ username }));
    window.location.href = "index.html";
}

function checkUser() {
    let user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
        document.getElementById("username-display").textContent = user.username;
        document.getElementById("auth-section").style.display = "none";
        document.getElementById("user-info").style.display = "block";
    }
}

function toggleMenu() {
    document.getElementById("dropdown-menu").style.display = "block";
}

async function deleteAccount() {
    let users = await fetchUsers();
    let user = JSON.parse(localStorage.getItem("loggedInUser"));
    users = users.filter(u => u.username !== user.username);

    await fetch(API_URL, {
        method: "PUT",
        headers: { "Content-Type": "application/json", "X-Master-Key": API_KEY },
        body: JSON.stringify({ users })
    });

    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
}

function logout() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
}
