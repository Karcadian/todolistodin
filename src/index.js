import './styles.css';
import { createProject, createItem, loadProjects } from './todolist';
import { renderProjects, renderItems, renderProjectForm, renderItemForm } from './dom';
import { format, parseISO } from 'date-fns';

document.addEventListener('DOMContentLoaded', () => {
    // Ensure elements exist before adding event listeners
    const newProjectBtn = document.getElementById('new-project');
    const formContainer = document.getElementById('form-container');
    const projectsContainer = document.getElementById('projects-container');
    const newItemBtn = document.getElementById('new-item');

    if (!newProjectBtn || !formContainer || !projectsContainer || !newItemBtn) {
        console.error('One or more required elements are missing from the DOM.');
        return;
    }

    loadProjects();

    // Event Listener for creating a new project
    newProjectBtn.addEventListener('click', () => {
        renderProjectForm();
    });

    // Event Listener for handling project form submission
    formContainer.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const description = e.target.description.value;
        const dueDate = format(parseISO(e.target.dueDate.value), 'yyyy-MM-dd');
        const priority = e.target.priority.value;

        createProject(title, description, dueDate, priority);
        renderProjects();
    });

    // Event Listener for handling project clicks
    projectsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('project-item')) {
            const projectId = e.target.dataset.id;
            renderItems(projectId);
        }
    });

    // Event Listener for creating a new item
    newItemBtn.addEventListener('click', () => {
        renderItemForm();
    });

    // Event Listener for handling item form submission
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
});
