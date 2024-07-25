import './styles.css';
import { createProject, createItem, updateProjects } from './todolist';
import { renderProjects, renderItems, renderProjectForm, renderItemForm } from './dom';
import { format, parseISO } from 'date-fns';

document.addEventListener('DOMContentLoaded', () => {
    updateProjects();
    renderProjects();

    // Event Listener for Home tab
    const homeTab = document.getElementById('home-tab');
    if (homeTab) {
        homeTab.addEventListener('click', () => {
            // Want to display projects
            updateProjects();
            renderProjects();
        });
    }

    // Event Listener for creating a new project
    const newProjectBtn = document.getElementById('new-project');
    if (newProjectBtn) {
        newProjectBtn.addEventListener('click', () => {
            renderProjectForm();
        });
    }

    // Event Listener for handling project clicks
    const projectsList = document.getElementById('projects-list');
    if (projectsList) {
        projectsList.addEventListener('click', (e) => {
            if (e.target.classList.contains('project-item')) {
                const projectId = e.target.dataset.id;
                renderItems(projectId);
            }
        });
    }

    // Event Listener for creating a new item
    const newItemBtn = document.getElementById('new-item');
    if (newItemBtn) {
        newItemBtn.addEventListener('click', () => {
            renderItemForm();
        });
    }

    // Event Listener for handling item form submission
    const formContainer = document.getElementById('form-container');
    if (formContainer) {
        formContainer.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = e.target.title.value;
            const description = e.target.description.value;
            const dueDate = format(parseISO(e.target.dueDate.value), 'yyyy-MM-dd');
            const priority = e.target.priority.value;
            const projectId = e.target.projectId.value;

            createItem(title, description, dueDate, priority, projectId);
            renderItems(projectId);
        });
    }
});
