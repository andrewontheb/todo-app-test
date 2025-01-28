import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { StatusType, Todo } from './Interfaces';
import ItemsList from './components/ItemsList';
import StatusBar from './components/StatusBar';
import './App.css';

const MOCK_TODOS: Todo[] = [
    { id: '1', text: 'Do the test task', completed: true },
    { id: '2', text: 'Public on GithubPages', completed: true },
    { id: '3', text: 'Send to review', completed: true },
    { id: '4', text: 'Wait for response', completed: false }
];

/**
 * Custom hook to use local storage
 * @param {string} key - storage key
 * @param {Todo[]} initialValue - initial value
 * @returns {[Todo[], (value: Todo[]) => void]} A tuple containing the current value and a function to update it.
 */
const useLocalStorage = (key: string, initialValue: Todo[]) => {
    const [storedValue, setStoredValue] = useState<Todo[]>(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    useEffect(() => {
        if (storedValue.length) {
            localStorage.setItem(key, JSON.stringify(storedValue));
        } else {
            localStorage.removeItem(key);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue] as const;
};

/**
 * App component
 * @component
 */
const App: React.FC = () => {
    const [todos, setTodos] = useLocalStorage('items', MOCK_TODOS);
    const [statusType, setStatusType] = useState<StatusType>('All');

    /**
     * Add new todo
     * @param {string} text - todo text
     * @returns {void}
     */
    const addTodo = useCallback((text: string) => {
        setTodos(prevTodos => [...prevTodos, { id: Date.now().toString(), text, completed: false }]);
    }, [setTodos]);

    /**
     * Toggle todo complete status
     * @param {string} id - todo id
     * @returns {void}
     */
    const toggleComplete = useCallback((id: string) => {
        setTodos(prevTodos => prevTodos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    }, [setTodos]);

    /**
     * Change status filter
     * @param {MouseEventHandler<HTMLButtonElement>} event - event
     * @param {StatusTypeefined} filterType - status type
     * @returns {void}
     */
    const applyStatusFilter = useCallback((event: React.MouseEvent<HTMLButtonElement>, filterType: StatusType) => {
        setStatusType(filterType);
    }, []);

    /**
     * Clear completed todos
     * @returns {void}
     */
    const clearCompleted = useCallback(() => {
        setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
    }, [setTodos]);

    const filteredTodos = useMemo(() => {
        switch (statusType) {
            case 'Completed':
                return todos.filter(todo => todo.completed);
            case 'Active':
                return todos.filter(todo => !todo.completed);
            default:
                return todos;
        }
    }, [todos, statusType]);

    return (
        <div className='card card border-indigo-200 border-2
                                      flex p-5  my-5 shadow-xl shadow-indigo-500/40 bg-white rounded-md text-black'>
            <h1 className='text-5xl font-extrabold text-center text-violet-500 leading-tight'>What To-Do List</h1>
            <input placeholder='Lets do some great things today' className='w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow' type="text" onKeyDown={(e) => {
                if (e.key === 'Enter' && e.currentTarget.value) {
                    addTodo(e.currentTarget.value);
                    e.currentTarget.value = '';
                }
            }} />
            <ItemsList todos={filteredTodos} toggleComplete={toggleComplete} />
            <StatusBar todos={todos}
                statusType={statusType}
                applyStatusFilter={applyStatusFilter}
                clearCompleted={clearCompleted} />
        </div>
    );
};

export default App;
