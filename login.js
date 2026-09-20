document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const message = document.getElementById("loginMessage");

    // User "Structs"
    const users = [
        {
            username: "Admin",
            password: "AdminEnter",
            redirect: "users/admin.html"
        },
        {
            username: "Owner",
            password: "Ceo2Word",
            redirect: "users/ceo.html"
        },
        {
            username: "Temporary",
            password: "tempPass",
            redirect: "users/temp_user.html"
        }
    ];

    // Find matching user
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        message.style.color = "lightgreen";
        message.textContent = "Login successful! Redirecting...";

        setTimeout(() => {
            window.location.href = user.redirect;
        }, 1000);

    } else {
        message.style.color = "red";
        message.textContent = "Invalid username or password.";
    }
});
