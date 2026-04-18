import "../../styles/newTaskDialog.css";
import { getProjects } from "../../core/appController.js";

export default function getNewTaskDialog() {
    // 1. Create the dialog element
    const dialog = document.createElement("dialog");
    dialog.className = "modal-window";
    dialog.id = "taskDialog";

    // --- Header Section ---
    const header = document.createElement("div");
    header.className = "modal-header";

    const title = document.createElement("h1");
    title.className = "modal-title";
    title.textContent = "Create New Task";

    const subtitle = document.createElement("p");
    subtitle.className = "modal-subtitle";
    subtitle.textContent = "Capture your thoughts and organize your day.";

    header.appendChild(title);
    header.appendChild(subtitle);
    dialog.appendChild(header);

    // --- Form Element ---
    const form = document.createElement("form");
    form.className = "modal-form";
    form.setAttribute("method", "dialog");

    // --- Task Title Field ---
    const titleGroup = document.createElement("div");
    titleGroup.className = "form-group";

    const titleLabel = document.createElement("label");
    titleLabel.className = "form-label";
    titleLabel.textContent = "Task Title";

    const titleWrapper = document.createElement("div");
    titleWrapper.className = "input-wrapper";

    const titleInput = document.createElement("input");
    titleInput.className = "form-control";
    titleInput.id = "task-title"
    titleInput.type = "text";
    titleInput.placeholder = "What needs to be done?";
    titleInput.maxLength = 100;

    titleWrapper.appendChild(titleInput);
    titleGroup.appendChild(titleLabel);
    titleGroup.appendChild(titleWrapper);
    form.appendChild(titleGroup);

    // --- Description Field ---
    const descGroup = document.createElement("div");
    descGroup.className = "form-group";

    const descLabel = document.createElement("label");
    descLabel.className = "form-label";
    descLabel.textContent = "Description";

    const descWrapper = document.createElement("div");
    descWrapper.className = "input-wrapper";

    const descInput = document.createElement("textarea");
    descInput.className = "form-control";
    descInput.id = "task-desc"
    descInput.rows = 3;
    descInput.placeholder = "Add more details about this task...";
    descInput.maxLength = 350;

    descWrapper.appendChild(descInput);
    descGroup.appendChild(descLabel);
    descGroup.appendChild(descWrapper);
    form.appendChild(descGroup);

    // --- Input Grid (Project & Due Date) ---
    const inputGrid = document.createElement("div");
    inputGrid.className = "input-grid";

    // Project Dropdown
    const projectGroup = document.createElement("div");
    projectGroup.className = "form-group";

    const projectLabel = document.createElement("label");
    projectLabel.className = "form-label";
    projectLabel.textContent = "Project";

    const projectWrapper = document.createElement("div");
    projectWrapper.className = "input-wrapper";

    const projectSelect = document.createElement("select");
    projectSelect.className = "form-control";
    projectSelect.id = "task-project"

    const projects = getProjects();

    projects.forEach((proj) => {
        const option = document.createElement("option");
        option.value = proj.name;
        option.textContent = proj.name;
        if (proj.name === "Inbox") option.selected = true;
        projectSelect.appendChild(option);
    });

    const projectIcon = document.createElement("span");
    projectIcon.className = "material-symbols-outlined input-icon";
    projectIcon.textContent = "expand_more";

    projectWrapper.appendChild(projectSelect);
    projectWrapper.appendChild(projectIcon);
    projectGroup.appendChild(projectLabel);
    projectGroup.appendChild(projectWrapper);
    inputGrid.appendChild(projectGroup);

    // Due Date Input
    const dateGroup = document.createElement("div");
    dateGroup.className = "form-group";

    const dateLabel = document.createElement("label");
    dateLabel.className = "form-label";
    dateLabel.textContent = "Due Date";

    const dateWrapper = document.createElement("div");
    dateWrapper.className = "input-wrapper";

    const dateInput = document.createElement("input");
    dateInput.className = "form-control";
    dateInput.id = "task-date"
    dateInput.type = "date";

    dateWrapper.appendChild(dateInput);
    dateGroup.appendChild(dateLabel);
    dateGroup.appendChild(dateWrapper);
    inputGrid.appendChild(dateGroup);

    // Append grid to form
    form.appendChild(inputGrid);

    // --- Priority Field (Updated to Native Radios) ---
    const priorityGroup = document.createElement("div");
    priorityGroup.className = "form-group";

    const priorityLabel = document.createElement("label");
    priorityLabel.className = "form-label";
    priorityLabel.textContent = "Priority";

    const priorityToggle = document.createElement("div");
    priorityToggle.className = "priority-toggle";

    // Helper function to create radio inputs + labels easily
    const createPriorityOption = (id, text, isChecked) => {
        // Hidden Radio Input
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.id = id;
        radio.name = "priority"; 
        radio.value = text;
        radio.className = "visually-hidden";
        if (isChecked) radio.checked = true;

        // Visible Label (Acts as the button)
        const label = document.createElement("label");
        label.htmlFor = id; 
        label.className = "priority-btn";
        label.textContent = text;

        priorityToggle.appendChild(radio);
        priorityToggle.appendChild(label);
    };

    // Create the 3 options (Low is checked by default)
    createPriorityOption("priority-low", "Low", true);
    createPriorityOption("priority-medium", "Medium", false);
    createPriorityOption("priority-high", "High", false);

    priorityGroup.appendChild(priorityLabel);
    priorityGroup.appendChild(priorityToggle);
    form.appendChild(priorityGroup);

    // --- Form Actions ---
    const formActions = document.createElement("div");
    formActions.className = "form-actions";

    const btnCancel = document.createElement("button");
    btnCancel.type = "submit";
    btnCancel.formMethod = "dialog";
    btnCancel.className = "btn-cancel";
    btnCancel.textContent = "Cancel";

    const btnSubmit = document.createElement("button");
    btnSubmit.type = "submit";
    btnSubmit.className = "btn-submit";
    btnSubmit.textContent = "Create Task";

    formActions.appendChild(btnCancel);
    formActions.appendChild(btnSubmit);
    form.appendChild(formActions);

    // Append form to dialog
    dialog.appendChild(form);

    return dialog;
}
