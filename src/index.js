import './styles/style.css';
import * as appController from './core/appController.js';
import { setupUI } from './ui/domController.js';

window.appController = appController;

appController.createNewTodo("Wash the car", "Use the good wax", "2026-04-20", "High");
appController.createNewTodo("Buy groceries", "Milk and eggs", "2026-04-15", "Medium");

document.addEventListener('DOMContentLoaded', () => {
    setupUI();
    
    const defaultTab = document.querySelector('[data-name="Inbox"]');
    if (defaultTab) {
        defaultTab.click(); 
    }
});