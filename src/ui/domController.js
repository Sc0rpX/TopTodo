import * as appController from "../core/appController.js";
import loadMainTemplate from "./components/mainTemplate.js";
import createTaskCard from "./components/taskCard.js";
import getNewTaskDialog from "./components/newTaskDialog.js";
import {
    getProjectInputField,
    createProjectMenuItem,
} from "./components/projectComponents.js";
import createTaskDetailsDialog from "./components/taskDialog.js";

const sidebarMenu = document.querySelector(".sidebar-menu");
const mainContent = document.querySelector(".main-content");
const projectWrapper = sidebarMenu.querySelector(".project-wrapper");

// Function to create task card from given task array and display it in the main content section
function displayTodos(todoArray) {
    const taskList = document.querySelector(".task-list");

    if (!todoArray || todoArray.length === 0) {
        return;
    }

    todoArray.forEach((task) => {
        const taskCard = createTaskCard(task);
        taskList.appendChild(taskCard);
    });
}

// Function to refresh the main content of the ui
function refreshMainContent(projectName, todoArray) {
    mainContent.textContent = "";
    mainContent.appendChild(loadMainTemplate(projectName));

    // Display the todos of the project
    displayTodos(todoArray);
}

// Function to refresh the project section of sidebar
function refreshPojects() {
    projectWrapper.textContent = "";

    const allProjects = appController.getProjects();
    allProjects.forEach((project) => {
        if (project.name === "Inbox") return;

        const projectCard = createProjectMenuItem(project.name);

        projectWrapper.appendChild(projectCard);
    });
}

// It figures out which tasks to show based on the active sidebar tab
function getTasksForCurrentView(viewName) {
    if (viewName === "Today") return appController.getTasksForToday();
    if (viewName === "Tomorrow") return appController.getTasksForTomorrow();
    if (viewName === "This week") return appController.getTasksForThisWeek();

    // If it's not a time filter, it must be a real project
    const project = appController.getSpecificProject(viewName);
    return project.todos;
}

// Change page content by sidebar nav
export function setupUI() {
    //--- Switch sidebar menus ---
    sidebarMenu.addEventListener("click", function (event) {
        const clickedItem = event.target.closest(".menu-item");

        if (!clickedItem) return;
        event.preventDefault();

        // Remove active class and filled class from previous menu item
        const allItems = sidebarMenu.querySelectorAll(".menu-item");
        allItems.forEach((item) => {
            item.classList.remove("active");
            const icon = item.querySelector(".material-symbols-outlined");
            if (icon) icon.classList.remove("filled");
        });

        clickedItem.classList.add("active");
        const activeIcon = clickedItem.querySelector(".material-symbols-outlined");

        if (activeIcon.textContent !== "delete") {
            if (activeIcon) activeIcon.classList.add("filled");
        }

        const itemName = clickedItem.dataset.name;

        let tasksToDisplay = getTasksForCurrentView(itemName);

        refreshMainContent(itemName, tasksToDisplay);
    });

    mainContent.addEventListener("click", function (event) {
        const currentTabName = sidebarMenu.querySelector(".active").dataset.name;

        // --- Mark todos as complete ---
        if (event.target.classList.contains("checkbox-container")) {
            const taskCard = event.target.closest(".task-card");
            const taskTitle = taskCard.dataset.title;
            const realProjectName = taskCard.dataset.project;

            appController.toggleTodoStatus(taskTitle, realProjectName);

            const tasksToDisplay = getTasksForCurrentView(currentTabName);
            refreshMainContent(currentTabName, tasksToDisplay);
        }

        // --- Delete task ---
        if (event.target.closest(".delete-btn")) {
            event.preventDefault();
            event.stopPropagation();

            const targetTaskCard = event.target.closest(".task-card");
            const targetTaskTitle = targetTaskCard.dataset.title;
            const realProjectName = targetTaskCard.dataset.project;

            appController.deleteTodo(targetTaskTitle, realProjectName);

            const tasksToDisplay = getTasksForCurrentView(currentTabName);
            refreshMainContent(currentTabName, tasksToDisplay);
        }

        // Show description dialog
        if (event.target.closest(".task-card")) {
            if (
                event.target.closest(".checkbox-container") ||
                event.target.closest(".delete-btn")
            ) {
                return;
            }

            event.preventDefault();

            const targetTaskCard = event.target.closest(".task-card");
            const targetTaskTitle = targetTaskCard.dataset.title;
            const targetTaskProject = targetTaskCard.dataset.project;
            const projectTodos =
                appController.getSpecificProject(targetTaskProject).todos;

            const todo = projectTodos.find((todo) => todo.title === targetTaskTitle);

            const taskDialog = createTaskDetailsDialog(todo);

            mainContent.appendChild(taskDialog);
            taskDialog.showModal();

            taskDialog.addEventListener("close", () => {
                taskDialog.remove();
            });
        }
    });

    // New task button
    const newTaskBtn = document.querySelector(".new-task-btn");
    newTaskBtn.addEventListener("click", function () {
        const newTaskDialog = getNewTaskDialog();
        mainContent.appendChild(newTaskDialog);

        newTaskDialog.showModal();

        newTaskDialog.addEventListener("close", () => {
            newTaskDialog.remove();
        });

        // Submit Button event
        const createTaskBtn = newTaskDialog.querySelector(".btn-submit");
        createTaskBtn.addEventListener("click", () => {
            const title = newTaskDialog.querySelector("#task-title").value;
            const desc = newTaskDialog.querySelector("#task-desc").value;
            const date = newTaskDialog.querySelector("#task-date").value;
            const priority = newTaskDialog.querySelector(
                'input[name="priority"]:checked',
            ).value;
            const project = newTaskDialog.querySelector("#task-project").value;

            appController.createNewTodo(title, desc, date, priority, project);

            const currentProject =
                sidebarMenu.querySelector(".menu-item.active").dataset.name;
            if (currentProject === project) {
                const todos = appController.getSpecificProject(currentProject).todos;
                refreshMainContent(project, todos);
            }
        });
    });

    // --- Create new Projects ---
    const newProjectBtn = sidebarMenu.querySelector(".add-btn");
    newProjectBtn.addEventListener("click", () => {
        const projectInputField = getProjectInputField();
        projectWrapper.prepend(projectInputField);
        projectInputField.focus();

        // Input taker
        projectInputField.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                appController.createNewProject(projectInputField.value);
                refreshPojects();
            }
        });

        // Remove field if not focused
        projectInputField.addEventListener("blur", () => {
            projectInputField.remove();
        });
    });

    // --- Delete project ---
    projectWrapper.addEventListener("click", (event) => {
        if (event.target.closest(".delete-btn")) {
            event.preventDefault();
            event.stopPropagation();

            const targetProject = event.target.closest(".menu-item");
            const targetProjectName = targetProject.dataset.name;

            if (targetProject.classList.contains("active")) {
                const inbox = sidebarMenu.querySelector(
                    '.menu-item[data-name="Inbox"]',
                );
                inbox.click();
            }
            appController.deleteProject(targetProjectName);
            refreshPojects();
        }
    });
}
