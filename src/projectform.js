document.getElementById('project-form').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const title = e.target.title.value;
    const description = e.target.description.value;
    
    createProject(title, description);

    e.target.reset();
});
