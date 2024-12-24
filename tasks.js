document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const taskCount = document.getElementById('taskCount');
    
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (taskInput.value) {
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.innerHTML = `${taskInput.value} <button class="btn btn-sm btn-danger float-end delete-task">Delete</button>`;
            taskList.appendChild(li);
            taskInput.value = '';
            updateTaskCount();
        }
    });
    
    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-task')) {
            e.target.parentElement.remove();
            updateTaskCount();
        }
    });
    
    function updateTaskCount() {
        taskCount.textContent = `${taskList.children.length} pending tasks`;
    }
});
