import { format, parseISO } from 'date-fns';

export function getNextItemId() {
    const lastId = parseInt(localStorage.getItem('lastItemId')) || 0;
    const nextId = lastId + 1;
    localStorage.setItem('lastItemId', nextId);
    return nextId;
}

class Item {
    constructor(id, title, description, dueDate, priority) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = format(parseISO(dueDate), 'yyyy-MM-dd');
        this.priority = priority;
    }
}

export default Item;
