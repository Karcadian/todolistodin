import Project from './project';
import Item from './item';

// Load projects from local storage and convert to Project instances
export function loadProjects() {
    const storedProjects = JSON.parse(localStorage.getItem('projects')) || [];
    return storedProjects.map(proj => {
        // Convert items to instances of Item
        const items = proj.items.map(itemData => new Item(itemData.id, itemData.title, itemData.description, itemData.dueDate, itemData.priority));
        return new Project(proj.id, proj.title, proj.description, items);
    });
}

// Save projects to local storage
export function saveProjects() {
    const projectData = projects.map(proj => ({
        id: proj.id,
        title: proj.title,
        description: proj.description,
        items: proj.items.map(item => ({
            id: item.id,
            title: item.title,
            description: item.description,
            dueDate: item.dueDate,
            priority: item.priority,
        })) // Convert each item to a plain object
    }));
    localStorage.setItem('projects', JSON.stringify(projectData));
}

// Initialize projects
let projects = loadProjects();

export function createProject(id, title, description) {
    const newProject = new Project(id, title, description);
    projects.push(newProject);
    saveProjects();
}

export function updateProjects() {
    projects = loadProjects();
}

export function deleteProject(projectId) {
    const projectIntId = projectId;
    projects = projects.filter(project => project.id !== projectIntId);
    saveProjects();
}

export function getProjects() {
    return projects;
}

export function getProject(projectId) {
    return projects.find(project => project.id === projectId);
}
