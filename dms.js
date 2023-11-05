document.addEventListener("DOMContentLoaded", function() {
    // Sample user data
    const users = [
        "User1",
        "User2",
        "User3",
        "User4",
    ];

    const userList = document.getElementById("users");
    const chatPreview = document.querySelector(".chat-preview");
    const chatWindow = document.querySelector(".chat-window");

    // Populate user list
    users.forEach((user) => {
        const userItem = document.createElement("li");
        userItem.textContent = user;
        userList.appendChild(userItem);

        userItem.addEventListener("click", () => {
            // Open chat preview
            const preview = document.createElement("div");
            preview.classList.add("chat-preview-item");
            preview.textContent = user;
            chatPreview.appendChild(preview);

            // Open chat window
            const window = document.createElement("div");
            window.classList.add("chat-window-item");
            window.textContent = user;
            chatWindow.appendChild(window);
        });
    });

    // User search
    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        users.forEach((user, index) => {
            const userItem = userList.children[index];
            if (user.toLowerCase().includes(query)) {
                userItem.style.display = "block";
            } else {
                userItem.style.display = "none";
            }
        });
    });
});
