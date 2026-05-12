const { renderTodos, addTodo, deleteTodo, toggleTodo, renderRemainingCount, saveTodos } = require('./app.js');

describe('renderTodos function', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <h1>Todo App</h1>
      <input id="todo-input" type="text" placeholder="Add new todo">
      <button id="add-todo-btn">Add</button>
      <ul id="todo-list"></ul>
      <p id="remaining-count"></p>
    `;
  });

  it('renders todos from localStorage', () => {
    localStorage.setItem('todos', JSON.stringify([{ text: 'Test todo', completed: false }]));
    renderTodos();
    expect(document.getElementById('todo-list').children.length).toBe(1);
  });

  it('renders no todos when localStorage is empty', () => {
    localStorage.removeItem('todos');
    renderTodos();
    expect(document.getElementById('todo-list').children.length).toBe(0);
  });
});

describe('addTodo function', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <h1>Todo App</h1>
      <input id="todo-input" type="text" placeholder="Add new todo">
      <button id="add-todo-btn">Add</button>
      <ul id="todo-list"></ul>
      <p id="remaining-count"></p>
    `;
    const todoInput = document.getElementById('todo-input');
    todoInput.value = 'New todo';
  });

  it('adds new todo to the list', () => {
    addTodo();
    expect(document.getElementById('todo-list').children.length).toBe(1);
  });

  it('saves new todo to localStorage', () => {
    addTodo();
    expect(localStorage.getItem('todos')).not.toBeNull();
  });

  it('clears the input field after adding a todo', () => {
    addTodo();
    expect(document.getElementById('todo-input').value).toBe('');
  });
});

describe('deleteTodo function', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <h1>Todo App</h1>
      <input id="todo-input" type="text" placeholder="Add new todo">
      <button id="add-todo-btn">Add</button>
      <ul id="todo-list"></ul>
      <p id="remaining-count"></p>
    `;
    const todoInput = document.getElementById('todo-input');
    todoInput.value = 'New todo';
    addTodo();
  });

  it('removes the todo from the list', () => {
    deleteTodo(0);
    expect(document.getElementById('todo-list').children.length).toBe(0);
  });

  it('removes the todo from localStorage', () => {
    deleteTodo(0);
    expect(localStorage.getItem('todos')).toBe('[]');
  });
});

describe('toggleTodo function', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <h1>Todo App</h1>
      <input id="todo-input" type="text" placeholder="Add new todo">
      <button id="add-todo-btn">Add</button>
      <ul id="todo-list"></ul>
      <p id="remaining-count"></p>
    `;
    const todoInput = document.getElementById('todo-input');
    todoInput.value = 'New todo';
    addTodo();
  });

  it('toggles the completed state of the todo', () => {
    expect(JSON.parse(localStorage.getItem('todos'))[0].completed).toBe(false);
    toggleTodo(0);
    expect(JSON.parse(localStorage.getItem('todos'))[0].completed).toBe(true);
  });

  it('updates the todo in localStorage', () => {
    toggleTodo(0);
    expect(JSON.parse(localStorage.getItem('todos'))[0].completed).toBe(true);
  });
});

describe('renderRemainingCount function', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <h1>Todo App</h1>
      <input id="todo-input" type="text" placeholder="Add new todo">
      <button id="add-todo-btn">Add</button>
      <ul id="todo-list"></ul>
      <p id="remaining-count"></p>
    `;
    const todoInput = document.getElementById('todo-input');
    todoInput.value = 'New todo';
    addTodo();
  });

  it('renders the correct remaining count', () => {
    renderRemainingCount();
    expect(document.getElementById('remaining-count').textContent).toBe('1 items remaining');
  });

  it('updates the remaining count after adding a todo', () => {
    addTodo();
    renderRemainingCount();
    expect(document.getElementById('remaining-count').textContent).toBe('2 items remaining');
  });

  it('updates the remaining count after completing a todo', () => {
    toggleTodo(0);
    renderRemainingCount();
    expect(document.getElementById('remaining-count').textContent).toBe('1 items remaining');
  });
});

describe('saveTodos function', () => {
  it('saves todos to localStorage', () => {
    const todos = [{ text: 'Test todo', completed: false }];
    saveTodos();
    expect(localStorage.getItem('todos')).toBe(JSON.stringify(todos));
  });
});

describe('Mobile responsiveness', () => {
  it('renders correctly on mobile devices', () => {
    const style = document.createElement('style');
    style.innerHTML = `
      @media only screen and (max-width: 375px) {
        body {
          margin: 10px;
        }
      }
    `;
    document.head.appendChild(style);
    expect(document.body.style.margin).toBe('10px');
  });
});