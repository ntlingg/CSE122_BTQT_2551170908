const newTaskInput = document.getElementById('new-task');
const addTaskBtn = document.getElementById('add-task');
const taskList = document.querySelector('.task-list');
const footerCount = document.getElementById('footerCount');

function updateCount() {
    const allTasks = document.querySelectorAll('.task-item');
    const uncompletedTasks = document.querySelectorAll('.task-item:not(.completed)');
    
    if (allTasks.length === 0) {
        footerCount.textContent = "Không có công việc nào cần làm";
    } else {
        footerCount.textContent = `Còn ${uncompletedTasks.length} việc chưa hoàn thành`;
    }
}

function createTaskElement(text) {
    const li = document.createElement('li');
    li.className = 'task-item';

    const taskLeft = document.createElement('div');
    taskLeft.className = 'task-left';

    const checkbox = document.createElement('div');
    checkbox.className = 'checkbox';

    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = text;

    taskLeft.appendChild(checkbox);
    taskLeft.appendChild(span);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn-delete';
    deleteBtn.textContent = 'Xoá';

    li.appendChild(taskLeft);
    li.appendChild(deleteBtn);

    taskLeft.addEventListener('click', function() {
        li.classList.toggle('completed');
        updateCount();
    });

    deleteBtn.addEventListener('click', function() {
        li.remove();
        updateCount();
    });

    return li;
}

addTaskBtn.addEventListener('click', function() {
    const taskText = newTaskInput.value.trim();
    if (taskText !== '') {
        const newTask = createTaskElement(taskText);
        taskList.appendChild(newTask);
        newTaskInput.value = ''; 
        updateCount();
    } else {
        alert('Vui lòng nhập nội dung công việc!');
    }
});

newTaskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTaskBtn.click();
    }
});

document.querySelectorAll('.task-item').forEach(item => {
    const taskLeft = item.querySelector('.task-left');
    const deleteBtn = item.querySelector('.btn-delete');

    taskLeft.addEventListener('click', function() {
        item.classList.toggle('completed');
        updateCount();
    });

    deleteBtn.addEventListener('click', function() {
        item.remove();
        updateCount();
    });
});

updateCount();
