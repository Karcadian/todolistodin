import { format, parseISO } from 'date-fns';
import Item from './item';

class Project {
    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.items = []; // Array to store items
    }

    addItem(title, description, dueDate, priority) {
        const newItem = new Item(title, description, dueDate, priority);
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
