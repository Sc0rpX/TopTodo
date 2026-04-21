import Project from "../models/project.js";
import Todo from "../models/todo.js";

const LOCAL_STORAGE_KEY = "topTodo";

export function saveProjects(projectsArray) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projectsArray));
}

export function loadProjects() {
    const rawData = localStorage.getItem(LOCAL_STORAGE_KEY);

    if(!rawData) return null;

    const parsedData = JSON.parse(rawData);

    // Rehydration Process
    const rehydratedProjects = [];

    parsedData.forEach(rawProject => {
        const newProject = new Project(rawProject.name);

        rawProject.todos.forEach(rawTodo => {
            const newTodo = new Todo(rawTodo.title, rawTodo.description, rawTodo.dueDate, rawTodo.priority, rawTodo.projectName);

            if(rawTodo.completed) {
                newTodo.completed = true;
            }

            newProject.todos.push(newTodo);
        })

        rehydratedProjects.push(newProject);
    });

    return rehydratedProjects;
}

