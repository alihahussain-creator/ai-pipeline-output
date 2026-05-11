const { addTodo, saveTodos, renderTodos } = require('./app.js');

describe('addTodo function', () => {
    beforeEach(() => {
        todos = [];
        todoInput.value = 'New Todo';
    });

    afterEach(() => {
        localStorage.clear();
    });

    it('should add new todo to the list', () => {
        addTodo();
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe('New Todo');
    });

    it('should save new todo to local storage', () => {
        addTodo();
        const storedTodos = JSON.parse(localStorage.getItem('todos'));
        expect(storedTodos.length).toBe(1);
        expect(storedTodos[0].text).toBe('New Todo');
    });
});

describe('saveTodos function', () => {
    beforeEach(() => {
        todos = [];
        localStorage.clear();
    });

    afterEach(() => {
        localStorage.clear();
    });

    it('should save todos to local storage', () => {
        todos.push({ text: 'Todo 1', completed: false });
        saveTodos();
        const storedTodos = JSON.parse(localStorage.getItem('todos'));
        expect(storedTodos.length).toBe(1);
        expect(storedTodos[0].text).toBe('Todo 1');
    });
});

describe('renderTodos function', () => {
    beforeEach(() => {
        todos = [];
        todoList.innerHTML = '';
        remainingCount.innerText = '';
    });

    afterEach(() => {
        localStorage.clear();
        todoList.innerHTML = '';
        remainingCount.innerText = '';
    });

    it('should render todos in the list', () => {
        todos.push({ text: 'Todo 1', completed: false });
        todos.push({ text: 'Todo 2', completed: false });
        renderTodos();
        const todoItems = todoList.children;
        expect(todoItems.length).toBe(2);
        expect(todoItems[0].textContent).toBe('Todo 1');
        expect(todoItems[1].textContent).toBe('Todo 2');
    });

    it('should update remaining count', () => {
        todos.push({ text: 'Todo 1', completed: false });
        todos.push({ text: 'Todo 2', completed: false });
        renderTodos();
        expect(remainingCount.innerText).toBe('2 remaining');
    });

    it('should mark completed todos as completed', () => {
        todos.push({ text: 'Todo 1', completed: true });
        renderTodos();
        const todoItem = todoList.children[0];
        expect(todoItem.style.textDecoration).toBe('line-through');
    });
});

describe('mobile responsiveness', () => {
    it('should render correctly on mobile screen', () => {
        const mockWindow = {
            innerWidth: 375,
        };

        // Mock window.innerWidth to simulate mobile screen
        const originalInnerWidth = global.innerWidth;
        global.innerWidth = mockWindow.innerWidth;

        renderTodos();
        expect(todoInput.style.width).toBe('');
        expect(addTodoButton.style.height).toBe('30px');
        expect(todoList.style.listStyle).toBe('none');

        // Restore original innerWidth
        global.innerWidth = originalInnerWidth;
    });
});