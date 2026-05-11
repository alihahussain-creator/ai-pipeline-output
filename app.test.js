const { addTodo, markAsComplete, deleteTodo, updateRemainingCount, saveTodos, loadTodos } = require('./app.js');

describe('Todo App', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <header><h1>Todo App</h1></header>
      <main>
        <input type="text" id="todo-input" placeholder="Add new todo">
        <button id="add-todo-btn">Add</button>
        <ul id="todo-list"></ul>
        <p id="remaining-count"></p>
      </main>
    `;
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should add a new todo item', () => {
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    todoInput.value = 'New Todo';
    addTodo();
    expect(todoList.children.length).toBe(1);
    expect(todoList.children[0].textContent).toBe('New Todo');
  });

  it('should mark a todo item as complete', () => {
    const todoList = document.getElementById('todo-list');
    const newTodo = document.createElement('li');
    newTodo.textContent = 'New Todo';
    todoList.appendChild(newTodo);
    markAsComplete({ target: newTodo });
    expect(newTodo.style.textDecoration).toBe('line-through');
  });

  it('should delete a todo item', () => {
    const todoList = document.getElementById('todo-list');
    const newTodo = document.createElement('li');
    newTodo.textContent = 'New Todo';
    todoList.appendChild(newTodo);
    deleteTodo({ preventDefault: () => {}, target: newTodo });
    expect(todoList.children.length).toBe(0);
  });

  it('should update the remaining count', () => {
    const todoList = document.getElementById('todo-list');
    const remainingCount = document.getElementById('remaining-count');
    const newTodo = document.createElement('li');
    newTodo.textContent = 'New Todo';
    todoList.appendChild(newTodo);
    updateRemainingCount();
    expect(remainingCount.textContent).toBe('Remaining: 1');
  });

  it('should save todos to local storage', () => {
    const todoList = document.getElementById('todo-list');
    const newTodo = document.createElement('li');
    newTodo.textContent = 'New Todo';
    todoList.appendChild(newTodo);
    saveTodos();
    expect(localStorage.getItem('todos')).toBe('["New Todo"]');
  });

  it('should load todos from local storage', () => {
    localStorage.setItem('todos', '["New Todo"]');
    const todoList = document.getElementById('todo-list');
    loadTodos();
    expect(todoList.children.length).toBe(1);
    expect(todoList.children[0].textContent).toBe('New Todo');
  });

  it('should not throw any console errors', () => {
    const oldConsoleError = console.error;
    console.error = jest.fn();
    addTodo();
    markAsComplete({ target: document.createElement('li') });
    deleteTodo({ preventDefault: () => {}, target: document.createElement('li') });
    updateRemainingCount();
    saveTodos();
    loadTodos();
    expect(console.error).not.toHaveBeenCalled();
    console.error = oldConsoleError;
  });

  it('should be mobile responsive', () => {
    const main = document.getElementsByTagName('main')[0];
    expect(main.style.maxWidth).toBe('375px');
  });
});