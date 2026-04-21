import './styles/style.css';
import * as appController from './core/appController.js';
import { setupUI } from './ui/domController.js';
import { saveProjects, loadProjects } from './core/storage.js';

document.addEventListener('DOMContentLoaded', () => {
    setupUI();
    
    const defaultTab = document.querySelector('[data-name="Inbox"]');
    if (defaultTab) {
        defaultTab.click(); 
    }
});