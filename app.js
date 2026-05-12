let todos = JSON.parse(localStorage.getItem('todos')) || ];

function renderTodos() {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';
  todos.forEach((todo, index) => {
    const todoItem = document.createElement('li');
    todoItem.innerHTML = `<span style="text-decoration: ${todo.completed ? 'line-through' : 'none'}">${todo.text}</span> <button class="delete-btn">Delete</button>`;
    todoList.appendChild(todoItem);
    const deleteBtn = todoItem.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => {
      deleteTodo(index);
    });
    todoItem.addEventListener('click', (e) => {
      if (e.target.tagName === 'LI') {
        toggleTodo(index);
      }
    });
  });
  renderRemainingCount();
}

function addTodo() {
  const todoInput = document.getElementById('todo-input');
  const newTodo = { text: todoInput.value, completed: false };
  todos.push(newTodo);
  todoInput.value = '';
  saveTodos();
  renderTodos();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}

function toggleTodo(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos();
  renderTodos();
}

function renderRemainingCount() {
  const remainingCount = document.getElementById('remaining-count');
  const count = todos.filter(todo => !todo.completed).length;
  remainingCount.innerText = `${count} items remaining`;
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function init() {
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('add-todo-btn').addEventListener('click', addTodo);
    renderTodos();
  });
}

init();