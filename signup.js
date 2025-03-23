document.getElementById("signupForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form from submitting normally

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Fetch existing users
    let response = await fetch("https://api.jsonbin.io/v3/b/67e06cfd8561e97a50f17582", {
        method: "GET",
        headers: {
            "X-Master-Key": "$2a$10$hD20YlzI1bEJMqaE.tDxd.imtTczoppQFIcla6eeIb41HJAHJZ1wK",
        },
    });

    let data = await response.json();
    let users = data.record.users || [];

    // Check if username exists
    if (users.some(user => user.username === username)) {
        alert("Username already exists! Try a different one.");
        return;
    }

    // Add new user
    users.push({ username, password, plans: [] });

    // Save updated user list
    await fetch("https://api.jsonbin.io/v3/b/67e06cfd8561e97a50f17582", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "X-Master-Key": "$2a$10$hD20YlzI1bEJMqaE.tDxd.imtTczoppQFIcla6eeIb41HJAHJZ1wK",
        },
        body: JSON.stringify({ users }),
    });

    // Store session & Redirect to homepage
    localStorage.setItem("loggedInUser", username);
    window.location.href = "index.html"; // Redirect after signup
});
