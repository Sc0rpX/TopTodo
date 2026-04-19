export function getProjectInputField() {
    const projectInput = document.createElement("input");
    projectInput.type = "text";
    projectInput.className = "form-control";
    projectInput.id = "project-input";
    projectInput.placeholder = "New project...";

    return projectInput;
}

export function createProjectMenuItem(projectName) {
    const menuItem = document.createElement('a');
    menuItem.href = '#';
    menuItem.className = 'menu-item';
    menuItem.dataset.name = projectName;

    const nameSpan = document.createElement('span');
    nameSpan.className = 'project-name';
    nameSpan.textContent = projectName;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';

    const iconSpan = document.createElement('span');
    iconSpan.className = 'material-symbols-outlined';
    iconSpan.textContent = 'delete';

    deleteBtn.appendChild(iconSpan);
    menuItem.appendChild(nameSpan);
    menuItem.appendChild(deleteBtn);

    return menuItem;
}