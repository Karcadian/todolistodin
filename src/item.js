import { format, parseISO } from 'date-fns';

class Item {
    constructor(title, description, dueDate, priority) {
        this.id = Date.now(); // Unique ID based on current timestamp
        this.title = title;
        this.description = description;
        this.dueDate = format(parseISO(dueDate), 'yyyy-MM-dd'); // Format the date
        this.priority = priority;
    }
}

export default Item;
