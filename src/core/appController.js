import Todo from "../models/todo.js";
import Project from "../models/project.js";

// Project holder
let allProjects = [];

// Initial inboxs
let inbox = new Project("Inbox");
let today = new Project("Today");
let tomorrow = new Project("Tomorrow");
let thisWeek = new Project("This week");
allProjects.push(inbox, today, tomorrow, thisWeek);

export function getProjects() {
    return allProjects;
}

export function getSpecificProject(projectName) {
    return allProjects.find((project) => project.name === projectName);
}

export function createNewProject(name) {
    const newProject = new Project(name);
    allProjects.push(newProject);
}

export function deleteProject(projectName) {
    const targetProject = getSpecificProject(projectName);

    if (targetProject.name === "Inbox") {
        return "Inbox can't be deleted";
    } else if (targetProject) {
        const targetProjectIndex = allProjects.findIndex(
            (project) => project.name === projectName,
        );
        allProjects.splice(targetProjectIndex, 1);
    } else {
        console.error(`Error: Project "${projectName}" not found.`);
    }
}

export function createNewTodo(
    title,
    des,
    dueDate,
    priority,
    projectName = "Inbox",
) {
    const newTodo = new Todo(title, des, dueDate, priority);

    const targetProject = getSpecificProject(projectName);

    if (targetProject) {
        targetProject.addTodo(newTodo);
    } else {
        console.error(`Error: Project "${projectName}" not found.`);
    }
}

export function deleteTodo(todoTitle, projectName) {
    const targetProject = getSpecificProject(projectName);

    if (targetProject) {
        const todoIndex = targetProject.todos.findIndex(
            (todo) => todo.title === todoTitle,
        );
        
        targetProject.deleteTodo(todoIndex);
    } else {
        console.error(`Error: "${projectName}" project not found.`);
    }
}

export function toggleTodoStatus(todoTitle, projectName) {
    const targetProject = getSpecificProject(projectName);

    if (targetProject) {
        const targetTodo = targetProject.todos.find(
            (todo) => todo.title === todoTitle,
        );

        if (targetTodo) {
            targetTodo.toggleStatus();
        } else {
            console.error(`Error: Todo task "${todoTitle}" not found.`);
        }
    } else {
        console.error(`Error: "${projectName}" project not found.`);
    }
}




