import Todo from "../models/todo.js";
import Project from "../models/project.js";
import { isToday, isTomorrow, isThisWeek, parseISO } from 'date-fns';

// Project holder
let allProjects = [];

// Initial inbox
let inbox = new Project("Inbox");
allProjects.push(inbox);

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
    const newTodo = new Todo(title, des, dueDate, priority, projectName);

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


// --- Filter Today, Tomorrow and This week ---
export function getTasksForToday() {
    const tasks = [];

    allProjects.forEach(project => {
        project.todos.forEach(task => {
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
            if(isThisWeek(parseISO(task.dueDate))) {
                tasks.push(task);
            }
        })
    });

    return tasks;
}


