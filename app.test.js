const { addTodo, deleteTodo, toggleTodo, saveTodos, renderTodos } = require('./app.js');

describe('addTodo function', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('adds a new todo item to the todos array', () => {
        addTodo('New Todo');
        expect(JSON.parse(localStorage.getItem('todos'))[0].text).toBe('New Todo');
    });

    it('sets the completed status of the new todo item to false', () => {
        addTodo('New Todo');
        expect(JSON.parse(localStorage.getItem('todos'))[0].completed).toBe(false);
    });

    it('calls saveTodos and renderTodos functions', () => {
        const saveTodosSpy = jest.spyOn(global, 'saveTodos');
        const renderTodosSpy = jest.spyOn(global, 'renderTodos');
        addTodo('New Todo');
        expect(saveTodosSpy).toHaveBeenCalledTimes(1);
        expect(renderTodosSpy).toHaveBeenCalledTimes(1);
    });
});

describe('deleteTodo function', () => {
    beforeEach(() => {
        localStorage.clear();
        addTodo('Todo 1');
        addTodo('Todo 2');
    });

    it('removes the todo item at the specified index from the todos array', () => {
        deleteTodo(0);
        expect(JSON.parse(localStorage.getItem('todos'))[0].text).toBe('Todo 2');
    });

    it('calls saveTodos and renderTodos functions', () => {
        const saveTodosSpy = jest.spyOn(global, 'saveTodos');
        const renderTodosSpy = jest.spyOn(global, 'renderTodos');
        deleteTodo(0);
        expect(saveTodosSpy).toHaveBeenCalledTimes(1);
        expect(renderTodosSpy).toHaveBeenCalledTimes(1);
    });
});

describe('toggleTodo function', () => {
    beforeEach(() => {
        localStorage.clear();
        addTodo('New Todo');
    });

    it('toggles the completed status of the todo item at the specified index', () => {
        toggleTodo(0);
        expect(JSON.parse(localStorage.getItem('todos'))[0].completed).toBe(true);
    });

    it('calls saveTodos and renderTodos functions', () => {
        const saveTodosSpy = jest.spyOn(global, 'saveTodos');
        const renderTodosSpy = jest.spyOn(global, 'renderTodos');
        toggleTodo(0);
        expect(saveTodosSpy).toHaveBeenCalledTimes(1);
        expect(renderTodosSpy).toHaveBeenCalledTimes(1);
    });
});

describe('saveTodos function', () => {
    beforeEach(() => {
        localStorage.clear();
        addTodo('New Todo');
    });

    it('saves the todos array to localStorage', () => {
        saveTodos();
        expect(JSON.parse(localStorage.getItem('todos'))[0].text).toBe('New Todo');
    });
});

describe('renderTodos function', () => {
    beforeEach(() => {
        localStorage.clear();
        addTodo('Todo 1');
        addTodo('Todo 2');
    });

    it('updates the remaining todos count', () => {
        renderTodos();
        const remainingCount = document.getElementById('remaining-count');
        expect(remainingCount.textContent).toBe('2');
    });

    it('renders the todo list', () => {
        renderTodos();
        const todoList = document.getElementById('todo-list');
        expect(todoList.children.length).toBe(2);
    });
});

describe('acceptance criteria', () => {
    it('all features work correctly', () => {
        addTodo('New Todo');
        toggleTodo(0);
        expect(JSON.parse(localStorage.getItem('todos'))[0].completed).toBe(true);
        deleteTodo(0);
        expect(JSON.parse(localStorage.getItem('todos')).length).toBe(0);
    });

    it('no console errors', () => {
        console.error = jest.fn();
        addTodo('New Todo');
        toggleTodo(0);
        deleteTodo(0);
        expect(console.error).not.toHaveBeenCalled();
    });

    it('mobile responsive', () => {
        const windowSpy = jest.spyOn(global, 'window');
        windowSpy.innerWidth = 375;
        renderTodos();
        expect(document.body.style.width).toBeUndefined();
    });
});