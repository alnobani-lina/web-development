document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
  });

  function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    const taskText = taskInput.value.trim();
    if (taskText === '') {
      alert('Please enter a task');
      return;
    }

    
    const taskItem = document.createElement('li');
    taskItem.className = 'taskItem';
    taskItem.innerHTML = `
      <span class="taskText">${taskText}</span>
      <button onclick="editTask(this)">Edit</button>
      <button onclick="toggleCompleted(this)">Toggle Completed</button>
      <button onclick="deleteTask(this)">Delete</button>
    `;

    taskList.appendChild(taskItem);

    saveTasks();

    taskInput.value = '';
  }

  function editTask(button) {
    const taskTextElement = button.parentElement.querySelector('.taskText');
    const newText = prompt('Edit task:', taskTextElement.textContent);

    if (newText !== null) {
      taskTextElement.textContent = newText;

      saveTasks();
    }
  }

  function toggleCompleted(button) {
    const taskItem = button.parentElement;
    taskItem.classList.toggle('completed');

    saveTasks();
  }

  function deleteTask(button) {
    const taskItem = button.parentElement;
    taskItem.remove();

    saveTasks();
  }

  function saveTasks() {
    const taskList = document.getElementById('taskList');
    const tasks = Array.from(taskList.children).map(taskItem => {
      return {
        text: taskItem.querySelector('.taskText').textContent,
        completed: taskItem.classList.contains('completed')
      };
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function loadTasks() {
    const taskList = document.getElementById('taskList');
    const storedTasks = localStorage.getItem('tasks');

    if (storedTasks) {
      const tasks = JSON.parse(storedTasks);
      tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = `taskItem ${task.completed ? 'completed' : ''}`;
        taskItem.innerHTML = `
          <span class="taskText">${task.text}</span>
          <button onclick="editTask(this)">Edit</button>
          <button onclick="toggleCompleted(this)">Toggle Completed</button>
          <button onclick="deleteTask(this)">Delete</button>
        `;
        taskList.appendChild(taskItem);
      });
    }
  }