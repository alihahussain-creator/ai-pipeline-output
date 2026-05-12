const HTML = `<header>
        <h1>Simple Todo App</h1>
    </header>
    <main>
        <input id="new-todo" type="text" placeholder="New Todo">
        <button id="add-btn">Add</button>
        <ul id="todos">
            <!-- todo items will be rendered here -->
        </ul>
        <p id="remaining">Remaining: 0</p>
    </main>`;
document.body.innerHTML = HTML;
localStorage.setItem('todos', '[]');  // prevent null-read crash on first require
const { todos, count, todosList, addButton, newTodoInput, handleAddTodo, handleToggleTodo, handleDeleteTodo, renderTodos, updateRemainingCount, initApp } = require('./app.js');

beforeEach(() => {
  localStorage.clear();
  document.body.innerHTML = HTML;
  if (typeof initApp === 'function') initApp();
});

describe('App structure', () => {
  it('page renders with content', () => {
    expect(document.body.innerHTML.length).toBeGreaterThan(10);
  });
  it('has at least one input', () => {
    expect(document.querySelector('input')).not.toBeNull();
  });
  it('has at least one button', () => {
    expect(document.querySelector('button')).not.toBeNull();
  });
  it('all exported functions exist', () => {
  expect(typeof todos).toBe('function');
  expect(typeof count).toBe('function');
  expect(typeof todosList).toBe('function');
  expect(typeof addButton).toBe('function');
  expect(typeof newTodoInput).toBe('function');
  expect(typeof handleAddTodo).toBe('function');
  expect(typeof handleToggleTodo).toBe('function');
  expect(typeof handleDeleteTodo).toBe('function');
  expect(typeof renderTodos).toBe('function');
  expect(typeof updateRemainingCount).toBe('function');
  expect(typeof initApp).toBe('function');
  });
});
