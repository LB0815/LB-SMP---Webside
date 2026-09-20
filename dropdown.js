// Alle Dropdowns finden
const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach(drop => {
    const btn = drop.querySelector(".dropdown-btn");

    btn.addEventListener("click", () => {
        // Toggle für diesen Dropdown
        drop.classList.toggle("open");
        btn.classList.toggle("active");
    });
});
