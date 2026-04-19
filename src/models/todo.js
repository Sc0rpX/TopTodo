export default class Todo {
    constructor(title, description, dueDate, priority, projectName) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.projectName = projectName;
        this.completed = false;
    }

    toggleStatus(){
        this.completed = !this.completed;
    }
}