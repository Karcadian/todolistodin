import './styles.css';
import { updateProjects } from './todolist';
import { renderProjects, renderProjectForm } from './dom';

document.addEventListener('DOMContentLoaded', () => {
    updateProjects();
    renderProjects();
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = "Make a to-do list by creating a project and adding items to your project!";

    // Event Listener for Home tab
    const homeTab = document.getElementById('home-tab');
    if (homeTab) {
        homeTab.addEventListener('click', () => {
            updateProjects();
            renderProjects();
            const contentDiv = document.getElementById('content');
            contentDiv.innerHTML = "Make a to-do list by creating a project and adding items to your project!";
        });
    }

    // Event Listener for creating a new project
    const newProjectBtn = document.getElementById('new-project');
    if (newProjectBtn) {
        newProjectBtn.addEventListener('click', () => {
            renderProjectForm();
        });
    }
});
