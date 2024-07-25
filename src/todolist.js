import { renderProjects } from './dom';

let projects = JSON.parse(localStorage.getItem('projects')) || [];

export function createProject(title, description, dueDate, priority) {
    if (projects.some(project => project.title === title)) {
        alert('A project with this title already exists.');
        return;
    }

    const newProject = {
        id: Date.now().toString(),
        title,
        description,
        dueDate,
        priority,
        items: []
    };
    projects.push(newProject);
    saveProjects();
}

export function createItem(title, description, dueDate, priority, projectId) {
    const project = projects.find(project => project.id === projectId);
    if (project) {
        const newItem = {
            id: Date.now().toString(),
            title,
            description,
            dueDate,
            priority
        };
        project.items.push(newItem);
        saveProjects();
    }
}

export function updateProjects() {
    projects = JSON.parse(localStorage.getItem('projects')) || [];
    projects = projects.filter(project => project && project.id); // Filter out invalid projects
}

export function saveProjects() {
    localStorage.setItem('projects', JSON.stringify(projects));
}

export function deleteProject(projectId) {
    projects = projects.filter(project => project.id !== projectId);
    saveProjects();
}

export function deleteItem(projectId, itemId) {
    const project = projects.find(project => project.id === projectId);
    if (project) {
        project.items = project.items.filter(item => item.id !== itemId);
        saveProjects();
    }
}

export function getProjects() {
    return projects;
}
