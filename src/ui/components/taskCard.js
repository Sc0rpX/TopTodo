export default function createTaskCard(todo) {
    // 1. Create main container
    const taskCard = document.createElement('div');
    taskCard.className = 'task-card';

    // 2. Create Task Info section
    const taskInfo = document.createElement('div');
    taskInfo.className = 'task-info';

    // Create Checkbox
    const checkboxContainer = document.createElement('div');
    checkboxContainer.className = 'checkbox-container';
    
    const checkboxInner = document.createElement('div');
    checkboxInner.className = 'checkbox-inner';
    
    checkboxContainer.appendChild(checkboxInner);

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
    timeBadge.textContent = todo.dueDate;

    // Create Priority badge
    const priorityBadge = document.createElement('span');
    // Dynamically set the class name based on the priority (e.g., "badge-medium")
    priorityBadge.className = `badge badge-${todo.priority.toLowerCase()}`;
    priorityBadge.textContent = todo.priority;

    // Append badges to meta section
    taskMeta.appendChild(timeBadge);
    taskMeta.appendChild(priorityBadge);

    // 4. Assemble the final card
    taskCard.appendChild(taskInfo);
    taskCard.appendChild(taskMeta);

    return taskCard;
}