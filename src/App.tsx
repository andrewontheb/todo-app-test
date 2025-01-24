import React, { MouseEvent, useState, useEffect } from 'react';
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
 * App component
 * @component
 */
const App: React.FC = () => {
    const storedItems = localStorage.getItem('items');
    const [todos, setTodos] = useState<Todo[]>(storedItems?.length ? JSON.parse(storedItems) : MOCK_TODOS);
    const [filteredTodos, setFilteredTodos] = useState<{ id: string; text: string; completed: boolean }[]>([]);
    const [statusType, setStatusType] = useState<StatusType>('All');
    useEffect(() => {
        if (todos.length) {
            localStorage.setItem('items', JSON.stringify(todos));
        } else {
            localStorage.removeItem('items');
        }
    }, [todos]);

    /**
     * Add new todo
     * @param {void} text - todo text
     * @returns {void}
     */
    const addTodo = (text: string) => {
        const newTodos = [...todos, { id: Date.now().toString(), text, completed: false }];
        setTodos(newTodos);
        if (statusType !== 'Completed') {
            setFilteredTodos(newTodos.filter(todo => !todo.completed));
        }
    };

    /**
     * Toggle todo complete status
     * @param {string} id - todo id
     * @returns {void}
     */
    const toggleComplete = (id: string) => {
        const newTodos = todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(newTodos);
        if (statusType !== 'All') {
            setFilteredTodos(newTodos.filter(todo => statusType === 'Completed' ?
                todo.completed : !todo.completed));
        }
    };

    /**
     * Change status filter
     * @param {MouseEventHandler<HTMLButtonElement>} event - event
     * @param {StatusTypeefined} filterType - status type
     * @returns {void}
     */
    const applyStatusFilter = (event: MouseEvent<HTMLButtonElement>, filterType: StatusType) => {
        setStatusType(filterType);
        setFilteredTodos(todos.filter(todo => filterType === 'Completed' ?
            todo.completed : filterType === 'All' ? todo : !todo.completed));
    };

    /**
     * Clear completed todos
     * @returns {void}
     */
    const clearCompleted = () => {
        const updatedTodos = todos.filter(todo => !todo.completed);
        setTodos(updatedTodos);
        if (statusType === 'Completed') {
            setFilteredTodos([]);
        }
    }

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
            <ItemsList todos={statusType === 'All' ? todos : filteredTodos} toggleComplete={toggleComplete} />
            <StatusBar todos={todos}
                statusType={statusType}
                applyStatusFilter={applyStatusFilter}
                clearCompleted={clearCompleted} />
        </div>
    );
};

export default App;
