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
        `;
        projectList.appendChild(projectItem);

        projectItem.querySelector(".upvote").addEventListener("click", () => {
            projects[index].votes++;
            document.getElementById(`votes-${index}`).innerText = projects[index].votes;
        });

        projectItem.querySelector(".downvote").addEventListener("click", () => {
            projects[index].votes--;
            document.getElementById(`votes-${index}`).innerText = projects[index].votes;
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
