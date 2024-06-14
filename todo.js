const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

todoForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const newTask = todoInput.value;
  if (newTask === '') {
      alert('Please enter a task!');
      return;
  }
  todoInput.value = '';
  addTask(newTask);
});

function addTask(task) {
  const listItem = document.createElement('li');
  const taskText = document.createElement('span');
  taskText.textContent = task;
  listItem.appendChild(taskText);
  const checkBox = document.createElement('input');
  checkBox.setAttribute('type', 'checkbox');
  checkBox.style.marginLeft="30px"
  listItem.appendChild(checkBox);
  const editButton = document.createElement('button');
  editButton.textContent = '\u270E'; // Edit icon
  editButton.style.marginLeft="30px"
  listItem.appendChild(editButton);
  const deleteButton = document.createElement('button');
  deleteButton.textContent = '\u2716'; // Delete icon
  deleteButton.style.marginLeft="30px"
  listItem.appendChild(deleteButton);
  todoList.appendChild(listItem);
  checkBox.addEventListener('change', function() {
      if (this.checked) {
          taskText.style.textDecoration = 'line-through';
      } else {
          taskText.style.textDecoration = 'none';
      }
  });
  deleteButton.addEventListener('click', function() {
      todoList.removeChild(listItem);
      saveTasksToLocalStorage();
  });
  editButton.addEventListener('click', function() {
      const isEditing = listItem.classList.contains('editing');
      if (isEditing) {
          taskText.textContent = this.previousSibling.value;
          listItem.classList.remove('editing');
          editButton.textContent = '\u270E'; // Edit icon
      } else {
          const input = document.createElement('input');
          input.type = 'text';
          input.value = taskText.textContent;
          listItem.insertBefore(input, taskText);
          listItem.removeChild(taskText);
          listItem.classList.add('editing');
          editButton.textContent = '\u270E'; // Edit icon
      }
  });
  saveTasksToLocalStorage();
}

function saveTasksToLocalStorage() {
  const tasks = [];
  document.querySelectorAll('#todo-list li').forEach(task => {
      const taskText = task.querySelector('span').textContent;
      const isCompleted = task.classList.contains('completed');
      tasks.push({ text: taskText, completed: isCompleted });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

document.addEventListener('DOMContentLoaded', function() {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  todoList.innerHTML = ''; // Clear the todoList before adding new tasks
  savedTasks.forEach(task => {
      addTask(task.text);
  });
});