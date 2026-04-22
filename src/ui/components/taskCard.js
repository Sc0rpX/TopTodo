import { format, parseISO, isToday, isTomorrow } from "date-fns";

export default function createTaskCard(todo) {
    // 1. Create main container
    const taskCard = document.createElement('div');
    taskCard.className = 'task-card';
    taskCard.dataset.title = todo.title;
    taskCard.dataset.project = todo.projectName;

    if(todo.completed) {
        taskCard.classList.add('completed');
    }

    // 2. Create Task Info section
    const taskInfo = document.createElement('div');
    taskInfo.className = 'task-info';

    // Create Checkbox
    const checkboxContainer = document.createElement('div');
    checkboxContainer.className = 'checkbox-container';

    if(todo.completed) {
        checkboxContainer.classList.add('checked')

        const checkIcon = document.createElement('span');
        checkIcon.classList.add('material-symbols-outlined', 'check-icon');
        checkIcon.textContent = 'check';

        checkboxContainer.appendChild(checkIcon);
    }
    else {
        const checkboxInner = document.createElement('div');
        checkboxInner.className = 'checkbox-inner';
        
        checkboxContainer.appendChild(checkboxInner);
    }
    

    // Create Title
    const taskTitle = document.createElement('h3');
    taskTitle.className = 'task-title';
    taskTitle.textContent = todo.title;

    // Append checkbox and title to task info
    taskInfo.appendChild(checkboxContainer);
    taskInfo.appendChild(taskTitle);

    // 3. Create Task Meta section
    const taskMeta = document.createElement('div');
    taskMeta.className = 'task-meta';

    // Create Time badge
    const timeBadge = document.createElement('span');
    timeBadge.className = 'badge badge-time';

    if(todo.completed) {
        if(timeBadge.classList.contains("no-due-date")) {
            timeBadge.classList.remove("no-due-date");
        }
        timeBadge.textContent = 'Completed'
    }
    else{
        if(!todo.dueDate) {
            timeBadge.textContent = "No Due Date";
            timeBadge.classList.add("no-due-date");
        }
        else if(isToday(parseISO(todo.dueDate))) {
            timeBadge.textContent = "Today";
        }
        else if(isTomorrow(parseISO(todo.dueDate))) {
            timeBadge.textContent = "Tomorrow";
        }
        else {
            timeBadge.textContent = format(parseISO(todo.dueDate), 	'E, MMM d');
        }
    }

    // Create Priority badge
    const priorityBadge = document.createElement('span');
    // Dynamically set the class name based on the priority (e.g., "badge-medium")
    priorityBadge.className = `badge badge-${todo.priority.toLowerCase()}`;
    priorityBadge.textContent = todo.priority;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";

    const deleteIcon = document.createElement("span");
    deleteIcon.className = "material-symbols-outlined";
    deleteIcon.textContent = "delete";

    deleteBtn.appendChild(deleteIcon);

    // Append badges to meta section
    taskMeta.appendChild(timeBadge);
    taskMeta.appendChild(priorityBadge);
    taskMeta.appendChild(deleteBtn);

    // 4. Assemble the final card
    taskCard.appendChild(taskInfo);
    taskCard.appendChild(taskMeta);

    return taskCard;
}