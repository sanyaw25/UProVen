const projects = [
    { title: "Project 1", description: "Description for Project 1", votes: 0 },
    { title: "Project 2", description: "Description for Project 2", votes: 0 },
    // Add more projects here
];

const projectList = document.querySelector(".project-list");

function renderProjects() {
    projectList.innerHTML = '';
    projects.forEach((project, index) => {
        const projectItem = document.createElement("div");
        projectItem.classList.add("project-item");
        projectItem.innerHTML = `
            <div class="project-title">${project.title}</div>
            <div class="project-description">${project.description}</div>
            <div class="project-votes">
                <span class="upvote" data-index="${index}">&#9650;</span>
                <span class="downvote" data-index="${index}">&#9660;</span>
                <span>Votes: <span id="votes-${index}">${project.votes}</span></span>
            </div>
            <div class="message-button">
                <button id="messageButton-${index}">Send a Message</button>
            </div>
            <div class="message-box" id="messageBox-${index}" style="display: none;">
                <textarea id="messageText-${index}" placeholder="Type your message here"></textarea>
                <button id="sendMessage-${index}">Send</button>
            </div>
        `;
        projectList.appendChild(projectItem);

        projectItem.querySelector(".upvote").addEventListener("click", () => {
            projects[index].votes++;
            document.getElementById(votes-${index}).innerText = projects[index].votes;
        });

        projectItem.querySelector(".downvote").addEventListener("click", () => {
            projects[index].votes--;
            document.getElementById(votes-${index}).innerText = projects[index].votes;
        });

        // Add event listeners for message button and message sending
        const messageButton = projectItem.querySelector(#messageButton-${index});
        const messageBox = projectItem.querySelector(#messageBox-${index});
        const messageText = projectItem.querySelector(#messageText-${index});

        messageButton.addEventListener("click", () => {
            messageBox.style.display = messageBox.style.display === "none" ? "block" : "none";
        });

        projectItem.querySelector(#sendMessage-${index}).addEventListener("click", () => {
            const message = messageText.value;
            // Add your code to handle the message for this specific project.
            // You can use the 'index' variable to identify the project.
            // You may also want to clear the messageText area.
        });
    });
}

document.getElementById("search").addEventListener("input", () => {
    const searchTerm = document.getElementById("search").value.toLowerCase();
    const filteredProjects = projects.filter(project => project.title.toLowerCase().includes(searchTerm) || project.description.toLowerCase().includes(searchTerm));
    projects.forEach((project, index) => {
        projectList.children[index].style.display = filteredProjects.includes(project) ? "block" : "none";
    });
});



renderProjects();
// ... (Your existing code above)

document.getElementById("addProjectButton").addEventListener("click", () => {
    const newProjectTitle = prompt("Enter the project title:");
    const newProjectDescription = prompt("Enter the project description:");

    if (newProjectTitle && newProjectDescription) {
        // Create a new project object and add it to the projects array
        projects.push({ title: newProjectTitle, description: newProjectDescription, votes: 0 });

        // Rerender the projects
        renderProjects();
    }
});