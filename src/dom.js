import { getProjects, deleteProject, deleteItem } from './todolist';

export function renderProjects() {
    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer) {
        console.error('Projects container not found');
        return;
    }

    projectsContainer.innerHTML = '';
    const projects = getProjects();

    projects.forEach(project => {
        if (project) { // Check if project exists
            const projectDiv = document.createElement('div');
            projectDiv.className = 'project-item';
            projectDiv.dataset.id = project.id;
            projectDiv.innerHTML = `
                <h3>${project.title || 'Untitled'}</h3>
                <p>${project.description || 'No description'}</p>
                <p>Due: ${project.dueDate || 'No due date'}</p>
                <p>Priority: ${project.priority || 'No priority'}</p>
                <button onclick="deleteProject('${project.id}')">Delete Project</button>
            `;
            projectsContainer.appendChild(projectDiv);
        }
    });
}


export function renderItems(projectId) {
    const project = getProjects().find(project => project.id === projectId);
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';

    if (project) {
        project.items.forEach(item => {
            if (item) { // Ensure no null or undefined items are rendered
                const itemDiv = document.createElement('div');
                itemDiv.className = 'item';
                itemDiv.dataset.id = item.id;
                itemDiv.innerHTML = `
                    <h4>${item.title}</h4>
                    <p>${item.description}</p>
                    <p>Due: ${item.dueDate}</p>
                    <p>Priority: ${item.priority}</p>
                    <button onclick="deleteItem('${projectId}', '${item.id}')">Delete Item</button>
                `;
                contentDiv.appendChild(itemDiv);
            }
        });
    }
}

export function renderProjectForm() {
    const formHtml = `
        <form id="project-form">
            <label>Title: <input type="text" name="title" required /></label>
            <label>Description: <input type="text" name="description" /></label>
            <label>Due Date: <input type="date" name="dueDate" /></label>
            <label>Priority: 
                <select name="priority">
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
            </label>
            <button type="submit">Create Project</button>
        </form>
    `;
    document.getElementById('form-container').innerHTML = formHtml;
}

export function renderItemForm() {
    const projects = getProjects();
    const projectOptions = projects.map(project => `<option value="${project.id}">${project.title}</option>`).join('');

    const formHtml = `
        <form id="item-form">
            <label>Title: <input type="text" name="title" required /></label>
            <label>Description: <input type="text" name="description" /></label>
            <label>Due Date: <input type="date" name="dueDate" /></label>
            <label>Priority: 
                <select name="priority">
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>
            </label>
            <label>Project: 
                <select name="projectId">
                    ${projectOptions}
                </select>
            </label>
            <button type="submit">Create Item</button>
        </form>
    `;
    document.getElementById('form-container').innerHTML = formHtml;
}

window.deleteProject = (projectId) => {
    deleteProject(projectId);
    renderProjects();
};

window.deleteItem = (projectId, itemId) => {
    deleteItem(projectId, itemId);
    renderItems(projectId);
};

