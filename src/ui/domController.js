import * as appController from '../core/appController.js'
import loadMainTemplate from './components/mainTemplate.js'
import createTaskCard from './components/taskCard.js';

function displayTodos(projectName) {
    const todos = appController.getSpecificProject(projectName).todos;
    const taskList = document.querySelector('.task-list');

    todos.forEach(task => {
        const taskCard = createTaskCard(task);
        taskList.appendChild(taskCard);
    });
}

// Change page content by sidebar nav
export function setupUI() {
    const sidebarMenu = document.querySelector(".sidebar-menu");
    const mainContent = document.querySelector('.main-content');
    
    sidebarMenu.addEventListener("click", function(event) {
        const clickedItem = event.target.closest(".menu-item");
    
        if (!clickedItem) return;
    
        event.preventDefault();
        const allItems = sidebarMenu.querySelectorAll('.menu-item');
        allItems.forEach(item => {
            item.classList.remove('active');
            const icon = item.querySelector('.material-symbols-outlined');
            if (icon) icon.classList.remove('filled');
        });
    
        clickedItem.classList.add('active');
        const activeIcon = clickedItem.querySelector('.material-symbols-outlined');
        if (activeIcon) activeIcon.classList.add('filled');
    
        const itemName = clickedItem.dataset.name;
        
        mainContent.textContent = "";
        mainContent.appendChild(loadMainTemplate(itemName));

        // Display the todos of the project
        displayTodos(itemName);
    })
}
