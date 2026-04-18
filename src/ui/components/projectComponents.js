export function getProjectInputField() {
    const projectInput = document.createElement("input");
    projectInput.type = "text";
    projectInput.className = "form-control";
    projectInput.id = "project-input";
    projectInput.placeholder = "New project...";

    return projectInput;
}

export function getProjectsLink(projectName) {
    const projectCard = document.createElement("a");
    projectCard.href = "#";
    projectCard.className = "menu-item";
    projectCard.dataset.name = projectName;
    projectCard.textContent = projectName;

    return projectCard;
}