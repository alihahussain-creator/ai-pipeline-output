function createTodoItem(text) {
    const element = document.createElement('li');
    element.classList.add('todo-item');
    const textElement = document.createElement('span');
    textElement.textContent = text;
    element.appendChild(textElement);
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = false;
    checkbox.addEventListener('change', markAsCompleted);
    element.appendChild(checkbox);
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', deleteTodoItem);
    element.appendChild(deleteBtn);
    return element;
}

function addTodoItem() {
    const text = document.getElementById('new-todo').value;
    const todoItem = createTodoItem(text);
    const list = document.getElementById('todo-list');
    list.appendChild(todoItem);
    document.getElementById('new-todo').value = '';
    updateRemainingCount();
    saveTodos();
}

function markAsCompleted(event) {
    const checkbox = event.target;
    const textDecoration = checkbox.checked ? 'line-through' : '';
    checkbox.parentNode.children[0].style.textDecoration = textDecoration;
}

function deleteTodoItem(event) {
    const item = event.target.parentNode;
    const list = document.getElementById('todo-list');
    list.removeChild(item);
    updateRemainingCount();
    saveTodos();
}

function updateRemainingCount() {
    const list = document.getElementById('todo-list');
    const count = Array.prototype.filter.call(list.children, (el) => el.children[1].checked === false).length;
    document.getElementById('count').textContent = count;
}

function saveTodos() {
    const todos = Array.prototype.map.call(document.getElementById('todo-list').children, (el) => {
        const checkbox = el.children[1];
        return {
            text: el.children[0].textContent,
            completed: checkbox.checked
        };
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    return todos;
}

function initApp() {
    const newTodoInput = document.getElementById('new-todo');
    document.getElementById('add-btn').addEventListener('click', addTodoItem);
    newTodoInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTodoItem();
        }
    });
    const todos = loadTodos();
    todos.forEach((todo) => {
        const item = createTodoItem(todo.text);
        item.children[1].checked = todo.completed;
        document.getElementById('todo-list').appendChild(item);
    });
    updateRemainingCount();
}

if (typeof module !== 'undefined') module.exports = { createTodoItem, addTodoItem, markAsCompleted, deleteTodoItem, updateRemainingCount, saveTodos, loadTodos, initApp };
if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initApp);
    } else {
        initApp();
    }
}