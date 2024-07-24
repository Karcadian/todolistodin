document.getElementById('item-form').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const title = e.target.title.value;
    const description = e.target.description.value;
    const dueDate = e.target.dueDate.value;
    const priority = e.target.priority.value;
    
    createItem(title, description, dueDate, priority);

    e.target.reset();
});
