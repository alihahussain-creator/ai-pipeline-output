let todos = JSON.parse(localStorage.getItem('todos')) || [];

let todos;
let count = document.getElementById('remaining');
let todosList = document.getElementById('todos');
let addButton = document.getElementById('add-btn');
let newTodoInput = document.getElementById('new-todo');

function handleAddTodo(event) {
    event.preventDefault();
    const todoText = newTodoInput.value.trim();
    if (todoText) {
        newTodoInput.value = '';
        todos.push(todoText);
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos();
        updateRemainingCount();
    }
}

function handleToggleTodo(event) {
    const parent = event.target.parentElement;
    const isCompleted = parent.classList.contains('completed');
    const todoText = parent.textContent.trim();
    const index = todos.indexOf(todoText);
    if (!isCompleted) {
        todos[index] = `[x] ${todos[index]}`; // [x] text for strikethrough effect
    } else {
        todos[index] = todoText.replace('[x] ', '');
    }
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
    updateRemainingCount();
}

function handleDeleteTodo(event) {
    const parent = event.target.parentElement;
    const todoText = parent.textContent.trim();
    const index = todos.indexOf(todoText);
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodos();
    updateRemainingCount();
}

function renderTodos() {
    const renderedTodos = todos.map((todo, index) => `
        <li class="${!Array.from(todos).slice(index, index + 1).includes('[x]') ? '' : 'completed'}">
            ${todo}
            <button class="toggle-btn">Toggle</button>
            <button class="delete-btn">Delete</button>
        </li>
    `).join('');
    todosList.innerHTML = renderedTodos;
}

function updateRemainingCount() {
    const completedTodos = todos.filter(todo => Array.from(todo).includes('[x]'));
    count.textContent = `Remaining: ${todos.length - completedTodos.length}`;
}

function initApp() {
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    newTodoInput.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
            handleAddTodo(event);
        }
    });
    addButton.addEventListener('click', handleAddTodo);
    todosList.addEventListener('click', event => {
        if (event.target.classList.contains('toggle-btn')) {
            handleToggleTodo(event);
        } else if (event.target.classList.contains('delete-btn')) {
            handleDeleteTodo(event);
        }
    });
    renderTodos();
    updateRemainingCount();
}

if (typeof module !== 'undefined') module.exports = { todos, count, todosList, addButton, newTodoInput, handleAddTodo, handleToggleTodo, handleDeleteTodo, renderTodos, updateRemainingCount, initApp };
if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initApp);
    } else {
        initApp();
    }
}