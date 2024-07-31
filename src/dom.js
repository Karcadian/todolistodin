import { getProjects, createProject, deleteProject, saveProjects, getProject } from './todolist';
import { getNextProjectId } from './project';
import { getNextItemId } from './item';
import { format, parseISO } from 'date-fns';

// Render the projects in the sidebar
export function renderProjects() {
    const projectsList = document.getElementById('projects-list');
    projectsList.innerHTML = '';
    const projects = getProjects();

    projects.forEach(project => {
        const projectDiv = document.createElement('div');
        projectDiv.className = 'project-item';
        projectDiv.dataset.id = project.id;
        projectDiv.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <button class="delete-project-btn" data-id="${project.id}">Delete Project</button>
        `;
        projectsList.appendChild(projectDiv);

        // Add event listener for project item click
        projectDiv.addEventListener('click', (e) => {
            // Check if the target is not the delete button
            if (!e.target.classList.contains('delete-project-btn')) {
                const projectId = parseInt(projectDiv.dataset.id);
                renderItems(projectId);
            }
        });

        // Add event listener for the delete button
        const deleteButton = projectDiv.querySelector('.delete-project-btn');
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent the click event from bubbling up
            const projectId = parseInt(e.target.dataset.id);
            deleteProject(projectId);
            saveProjects();
            renderProjects(); // Re-render projects after deletion
        });
    });
}

// Render the items of a specific project
export function renderItems(projectId) {
    const project = getProject(projectId);
    const contentDiv = document.getElementById('content');
    contentDiv.innerHTML = '';

    if (project) {
        // Add "Add Todo" button
        const addTodoButton = document.createElement('button');
        addTodoButton.textContent = 'Add Todo';
        addTodoButton.id = 'add-todo-btn';
        addTodoButton.addEventListener('click', () => {
            renderItemForm(projectId);
        });
        contentDiv.appendChild(addTodoButton);

        // Render project items in a scrollable format
        const itemsContainer = document.createElement('div');
        itemsContainer.className = 'items-container';
        contentDiv.appendChild(itemsContainer);

        project.items.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)).forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'item';
            itemDiv.dataset.id = item.id;
            itemDiv.innerHTML = `
                <h4>${item.title}</h4>
                <p>${item.description}</p>
                <p>Due: ${item.dueDate}</p>
                <p>Priority: ${item.priority}</p>
                <div class="item-controls">
                    <input type="checkbox" class="item-checkbox" ${item.completed ? 'checked' : ''} />
                    <button class="delete-item-btn" data-project-id="${projectId}" data-item-id="${item.id}">Delete Item</button>
                </div>
            `;
            itemsContainer.appendChild(itemDiv);
            
            // Add event listener for the checkbox
            itemDiv.querySelector('.item-checkbox').addEventListener('change', (e) => {
                item.completed = e.target.checked;
                itemDiv.classList.toggle('completed', item.completed);
                saveProjects(); // Save changes to localStorage
            });
        
            // Add event listener for the delete button
            itemDiv.querySelector('.delete-item-btn').addEventListener('click', (e) => {
                const itemId = parseInt(e.target.dataset.itemId);
                project.removeItem(itemId);
                saveProjects(); // Save changes to localStorage
                renderItems(projectId); // Re-render items after deletion
            });
        });        
    }
}

// Render the form for adding a new project
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
                <div id="button-container">
                    <button type="submit">Create Project</button>
                    <button type="button" class="btn cancel" id="cancel-form-btn">Cancel</button>
                </div>
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

        const id = getNextProjectId();
        const title = e.target.title.value;
        const description = e.target.description.value;

        if (getProjects().some(project => project.title === title)) {
            alert('A project with this title already exists.');
            return;
        }

        createProject(id, title, description);
        saveProjects();
        formContainer.style.display = 'none';
        renderProjects();
    });
}

// Render the form for adding a new item
export function renderItemForm(projectId) {
    const project = getProject(projectId);
    const formContainer = document.getElementById('form-container');
    formContainer.innerHTML = `
        <div id="item-form-container" class="form-popup">
            <div class="form-header">
                <h2>New Item Form</h2>
            </div>
            <form id="item-form">
                <div class="form-row">
                    <label for="title">Title:</label>
                    <input type="text" name="title" required>
                </div>
                <div class="form-row">
                    <label for="description">Description:</label>
                    <input type="text" name="description">
                </div>
                <div class="form-row">
                    <label for="dueDate">Due Date:</label>
                    <input type="date" name="dueDate" required>
                </div>
                <div class="form-row">
                    <label for="priority">Priority:</label>
                    <select name="priority">
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>
                <div id="button-container">
                    <button type="submit">Add Item</button>
                    <button type="button" class="btn cancel" id="cancel-item-form-btn">Cancel</button>
                </div>
            </form>
        </div>
    `;
    formContainer.style.display = 'block';

    // Add close button functionality
    document.getElementById('cancel-item-form-btn').addEventListener('click', () => {
        formContainer.style.display = 'none';
    });

    // Event Listener for handling item form submission
    document.getElementById('item-form').addEventListener('submit', (e) => {
        e.preventDefault();

        const id = getNextItemId();
        const title = e.target.title.value;
        const description = e.target.description.value;
        const dueDate = format(parseISO(e.target.dueDate.value), 'yyyy-MM-dd');
        const priority = e.target.priority.value;

        project.addItem(id, title, description, dueDate, priority);
        formContainer.style.display = 'none';
        renderItems(projectId);
        saveProjects();
    });
}