// Initialize tasks as empty arrays
let pendingTasks = [];
let completedTasks = [];
function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const task = {
        text: taskText,
        date: new Date().toLocaleString(),
    };

    pendingTasks.push(task);
    taskInput.value = ''; 
    displayTasks();
}
function displayTasks() {
    const pendingTasksList = document.getElementById('pending-tasks');
    const completedTasksList = document.getElementById('completed-tasks');
    pendingTasksList.innerHTML = '';
    completedTasksList.innerHTML = '';
    pendingTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${task.text} (${task.date})
            <button onclick="completeTask(${index})">Complete</button>
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="deleteTask(${index}, 'pending')">Delete</button>
        `;
        pendingTasksList.appendChild(li);
    });

    completedTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${task.text} (${task.date})
            <button onclick="deleteTask(${index}, 'completed')">Delete</button>
        `;
        completedTasksList.appendChild(li);
    });
}

function completeTask(index) {
    const task = pendingTasks.splice(index, 1)[0];
    task.date = new Date().toLocaleString(); 
    completedTasks.push(task);
    displayTasks();
}

function editTask(index) {
    const newTaskText = prompt('Edit task:', pendingTasks[index].text);
    if (newTaskText !== null) {
        pendingTasks[index].text = newTaskText;
        displayTasks();
    }
}

function deleteTask(index, listType) {
    if (listType === 'pending') {
        pendingTasks.splice(index, 1);
    } else if (listType === 'completed') {
        completedTasks.splice(index, 1);
    }
    displayTasks();
}

displayTasks();
