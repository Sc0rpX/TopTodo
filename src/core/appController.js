import Todo from "../models/todo.js";
import Project from "../models/project.js";
import { isToday, isTomorrow, isThisWeek, parseISO, format } from 'date-fns';
import * as storage from "./storage.js";

// Project holder
let allProjects = storage.loadProjects();

if(!allProjects) {
    allProjects = [];

    // Initial inbox
    let inbox = new Project("Inbox");
    allProjects.push(inbox);

    // Welcome task
    createNewTodo("Welcome to your new Todo App!", "Get started by adding a task.", format(new Date(), "yyyy-MM-dd"), "High", "Inbox");
}

export function getProjects() {
    return allProjects;
}

export function getSpecificProject(projectName) {
    return allProjects.find((project) => project.name === projectName);
}

export function createNewProject(name) {
    const newProject = new Project(name);
    allProjects.push(newProject);

    storage.saveProjects(allProjects);
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

    storage.saveProjects(allProjects);
}

export function createNewTodo(
    title,
    des,
    dueDate,
    priority,
    projectName = "Inbox",
) {
    const newTodo = new Todo(title, des, dueDate, priority, projectName);

    const targetProject = getSpecificProject(projectName);

    if (targetProject) {
        targetProject.addTodo(newTodo);
    } else {
        console.error(`Error: Project "${projectName}" not found.`);
    }

    storage.saveProjects(allProjects);
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

    storage.saveProjects(allProjects);
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

    storage.saveProjects(allProjects);
}


// --- Filter Today, Tomorrow and This week ---
export function getTasksForToday() {
    const tasks = [];

    allProjects.forEach(project => {
        project.todos.forEach(task => {
            if(!task.dueDate) return;

            if(isToday(parseISO(task.dueDate))) {
                tasks.push(task);
            }
        })
    });

    return tasks;
}

export function getTasksForTomorrow() {
    const tasks = [];

    allProjects.forEach(project => {
        project.todos.forEach(task => {
            if(!task.dueDate) return;

            if(isTomorrow(parseISO(task.dueDate))) {
                tasks.push(task);
            }
        })
    });

    return tasks;
}

export function getTasksForThisWeek() {
    const tasks = [];

    allProjects.forEach(project => {
        project.todos.forEach(task => {
            if(!task.dueDate) return;
            
            if(isThisWeek(parseISO(task.dueDate))) {
                tasks.push(task);
            }
        })
    });

    return tasks;
}


