const { addTodo, deleteTodo, toggleTodo, getTodos, saveTodos, renderTodos } = require('./app.js');

describe('addTodo function', () => {
  it('adds a new todo to the list', () => {
    const input = document.createElement('input');
    input.id = 'todo-input';
    input.value = 'New Todo';
    document.body.appendChild(input);
    addTodo();
    const todos = getTodos();
    expect(todos.length).toBe(1);
    expect(todos[0].text).toBe('New Todo');
    document.body.removeChild(input);
  });
});

describe('deleteTodo function', () => {
  it('deletes a todo from the list', () => {
    saveTodos([{ text: 'Todo 1', completed: false }, { text: 'Todo 2', completed: false }]);
    deleteTodo(0);
    const todos = getTodos();
    expect(todos.length).toBe(1);
    expect(todos[0].text).toBe('Todo 2');
  });
});

describe('toggleTodo function', () => {
  it('toggles the completed status of a todo', () => {
    saveTodos([{ text: 'Todo 1', completed: false }, { text: 'Todo 2', completed: false }]);
    toggleTodo(0);
    const todos = getTodos();
    expect(todos[0].completed).toBe(true);
  });
});

describe('getTodos function', () => {
  it('returns the list of todos from local storage', () => {
    saveTodos([{ text: 'Todo 1', completed: false }, { text: 'Todo 2', completed: false }]);
    const todos = getTodos();
    expect(todos.length).toBe(2);
    expect(todos[0].text).toBe('Todo 1');
    expect(todos[1].text).toBe('Todo 2');
  });
});

describe('saveTodos function', () => {
  it('saves the list of todos to local storage', () => {
    const todos = [{ text: 'Todo 1', completed: false }, { text: 'Todo 2', completed: false }];
    saveTodos(todos);
    const storedTodos = getTodos();
    expect(storedTodos.length).toBe(2);
    expect(storedTodos[0].text).toBe('Todo 1');
    expect(storedTodos[1].text).toBe('Todo 2');
  });
});

describe('renderTodos function', () => {
  it('renders the list of todos to the page', () => {
    const ul = document.createElement('ul');
    ul.id = 'todo-list';
    document.body.appendChild(ul);
    const todos = [{ text: 'Todo 1', completed: false }, { text: 'Todo 2', completed: false }];
    renderTodos(todos);
    const lis = ul.children;
    expect(lis.length).toBe(2);
    expect(lis[0].textContent).toContain('Todo 1');
    expect(lis[1].textContent).toContain('Todo 2');
    document.body.removeChild(ul);
  });
});

describe(' Mobile responsiveness', () => {
  it('should render correctly on a 375px wide screen', () => {
    const viewport = { width: 375, height: 667 };
    const event = { target: { innerWidth: viewport.width, innerHeight: viewport.height } };
    window.dispatchEvent(new Event('resize', event));
    expect(document.body.style.width).not.toBeNull();
    expect(document.getElementById('todo-list')).not.toBeNull();
    expect(document.getElementById('todo-input')).not.toBeNull();
    expect(document.getElementById('add-todo')).not.toBeNull();
  });
});

describe('No console errors', () => {
  it('should not throw any console errors', () => {
    const oldConsoleError = console.error;
    console.error = jest.fn();
    const todos = [{ text: 'Todo 1', completed: false }, { text: 'Todo 2', completed: false }];
    renderTodos(todos);
    expect(console.error).not.toHaveBeenCalled();
    console.error = oldConsoleError;
  });
});