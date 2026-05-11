function addTodo() {
  const input = document.getElementById('todo-input');
  const todoList = document.getElementById('todo-list');
  const newTodo = document.createElement('li');
  newTodo.textContent = input.value;
  newTodo.addEventListener('click', markAsComplete);
  newTodo.addEventListener('contextmenu', deleteTodo);
  todoList.appendChild(newTodo);
  input.value = '';
  updateRemainingCount();
  saveTodos();
}

function markAsComplete(event) {
  event.target.style.textDecoration = 'line-through';
}

function deleteTodo(event) {
  event.preventDefault();
  event.target.remove();
  updateRemainingCount();
  saveTodos();
}

function updateRemainingCount() {
  const todoList = document.getElementById('todo-list');
  const remainingCount = todoList.children.length;
  document.getElementById('remaining-count').textContent = `Remaining: ${remainingCount}`;
}

function saveTodos() {
  const todoList = document.getElementById('todo-list');
  const todos = Array.from(todoList.children).map(todo => todo.textContent);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
  const storedTodos = localStorage.getItem('todos');
  if (storedTodos) {
    const todoList = document.getElementById('todo-list');
    JSON.parse(storedTodos).forEach(todo => {
      const newTodo = document.createElement('li');
      newTodo.textContent = todo;
      newTodo.addEventListener('click', markAsComplete);
      newTodo.addEventListener('contextmenu', deleteTodo);
      todoList.appendChild(newTodo);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('add-todo-btn').addEventListener('click', addTodo);
  const main = document.getElementsByTagName('main')[0];
  main.style.maxWidth = '375px';
  loadTodos();
});

if (typeof module !== 'undefined') module.exports = { addTodo, markAsComplete, deleteTodo, updateRemainingCount, saveTodos, loadTodos };