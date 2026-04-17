import * as appController from '../core/appController.js'
import loadMainTemplate from './components/mainTemplate.js'
import createTaskCard from './components/taskCard.js';
import getNewTaskDialog from './components/newTaskDialog.js';

const sidebarMenu = document.querySelector(".sidebar-menu");
const mainContent = document.querySelector('.main-content');

function displayTodos(projectName) {
    const todos = appController.getSpecificProject(projectName).todos;
    const taskList = document.querySelector('.task-list');

    todos.forEach(task => {
        const taskCard = createTaskCard(task);
        taskList.appendChild(taskCard);
    });
}

function refreshMainContaent(projectName) {
    mainContent.textContent = "";
    mainContent.appendChild(loadMainTemplate(projectName));

    // Display the todos of the project
    displayTodos(projectName);
}

// Change page content by sidebar nav
export function setupUI() {
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
        
        refreshMainContaent(itemName);
    })

    // Mark todos as complete
    mainContent.addEventListener("click", function(event) {
        if(event.target.classList.contains('checkbox-container')) {
            const taskCard = event.target.closest('.task-card');
            const taskTitle = taskCard.dataset.title;
            console.log(taskTitle);
            const currentProject = sidebarMenu.querySelector('.active').dataset.name

            appController.toggleTodoStatus(taskTitle, currentProject);

            refreshMainContaent(currentProject);
        }
    })

    // New task button
    const newTaskBtn = document.querySelector('.new-task-btn');
    newTaskBtn.addEventListener("click", function(){
        const newTaskDialog = getNewTaskDialog();
        mainContent.appendChild(newTaskDialog);

        newTaskDialog.showModal();

        newTaskDialog.addEventListener('close', () => {
            newTaskDialog.remove();
        })

        const createTaskBtn = newTaskDialog.querySelector('.btn-submit');
        createTaskBtn.addEventListener("click", () => {
            const title = newTaskDialog.querySelector('#task-title').value;
            const desc = newTaskDialog.querySelector('#task-desc').value;
            const date = newTaskDialog.querySelector('#task-date').value;
            const priority = newTaskDialog.querySelector('input[name="priority"]:checked').value;
            const project = newTaskDialog.querySelector('#task-project').value;

            appController.createNewTodo(title, desc, date, priority, project);
            refreshMainContaent(project);
        })
    })
}
