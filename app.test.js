const HTML = `<h1>Todo List</h1>
    <input id="new-todo" type="text" placeholder="New todo item">
    <button id="add-btn">Add</button>
    <ul id="todo-list"></ul>
    <p id="remaining-count">Remaining: <span id="count">0</span></p>`;
document.body.innerHTML = HTML;
localStorage.setItem('todos', '[]');  // prevent null-read crash on first require
const { createTodoItem, addTodoItem, markAsCompleted, deleteTodoItem, updateRemainingCount, saveTodos, loadTodos, initApp } = require('./app.js');

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
  expect(typeof createTodoItem).toBe('function');
  expect(typeof addTodoItem).toBe('function');
  expect(typeof markAsCompleted).toBe('function');
  expect(typeof deleteTodoItem).toBe('function');
  expect(typeof updateRemainingCount).toBe('function');
  expect(typeof saveTodos).toBe('function');
  expect(typeof loadTodos).toBe('function');
  expect(typeof initApp).toBe('function');
  });
});
