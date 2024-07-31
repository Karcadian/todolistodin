import Item from './item';

// Separate function for generating the next project ID
export function getNextProjectId() {
    const lastId = parseInt(localStorage.getItem('lastProjectId')) || 0;
    const nextId = lastId + 1;
    localStorage.setItem('lastProjectId', nextId);
    // console.log(typeof localStorage.getItem('lastProjectId'));
    // console.log(typeof nextId);
    return nextId;
}

class Project {
    constructor(id, title, description, items = []) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.items = items.map(itemData => new Item(itemData.id, itemData.title, itemData.description, itemData.dueDate, itemData.priority)); // Create instances of Item
    }

    addItem(id, title, description, dueDate, priority) {
        const newItem = new Item(id, title, description, dueDate, priority);
        this.items.push(newItem);
    }

    removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
    }

    getItems() {
        return this.items;
    }
}

export default Project;
