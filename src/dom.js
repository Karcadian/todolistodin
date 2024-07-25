import { getProjects } from './todolist';

export function renderProjects() {
    const projectsList = document.getElementById('projects-list');
    projectsList.innerHTML = ''; // Clear the list first
    const projects = getProjects();

    projects.forEach(project => {
        const projectDiv = document.createElement('div');
        projectDiv.className = 'project-item';
        projectDiv.dataset.id = project.id;
        projectDiv.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <p>Due: ${project.dueDate}</p>
            <p>Priority: ${project.priority}</p>
            <button onclick="deleteProject('${project.id}')">Delete Project</button>
        `;
        projectsList.appendChild(projectDiv);
    });
}

export function renderItems(projectId) {
    const project = getProjects().find(project => project.id === projectId);
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';

    if (project) {
        project.items.forEach(item => {
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
        });
    }
}

export function renderProjectForm() {   
    const formContainer = document.getElementById('form-container');
    formContainer.innerHTML = `
        <div id="project-form-container" class="form-popup">
            <div class="form-header">
                <h2>New Project Form</h2>
            </div>
            <form id="project-form">
                <div class="form-row">
                    <label for="title">Title:</label>
                    <input type="text" name="title" required>
                </div>
                <div class="form-row">
                    <label for="description">Description:</label>
                    <input type="text" name="description">
                </div>
                <button type="submit">Create Project</button>
                <button type="button" class="btn cancel" id="cancel-form-btn">Cancel</button>
            </form>
        </div>
    `;
    formContainer.style.display = 'block';

    // Add close button functionality
    document.getElementById('cancel-form-btn').addEventListener('click', () => {
        formContainer.style.display = 'none';
    });

    // Event Listener for handling project form submission
    document.getElementById('project-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const description = e.target.description.value;
        const dueDate = format(parseISO(e.target.dueDate.value), 'yyyy-MM-dd');
        const priority = e.target.priority.value;

        createProject(title, description, dueDate, priority);
        formContainer.style.display = 'none';
        renderProjects();
    });
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
    document.getElementById('form-container').style.display = 'block';
}
