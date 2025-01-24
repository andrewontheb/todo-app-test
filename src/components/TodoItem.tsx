import React from 'react';
import { TodoItemProps } from '../Interfaces';

/**
 * TodoItem component
 * @component
 */
const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleComplete }) => {
    return (
        <div>
            <label htmlFor={"todoCheckbox" + todo.id} className='flex items-center space-x-3 cursor-pointer'>
                <input
                    id={"todoCheckbox" + todo.id}
                    className='form-checkbox h-5 w-5 bg-white text-blue-600 rounded focus:ring-blue-500 border-gray-300'
                    name="todoCheckbox"
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleComplete(todo.id)}
                />
                <span className={`text-gray-700 font-medium 
                                  ${todo.completed ? 'completed' : 'active'}`} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                    {todo.text}
                </span>
            </label>

        </div>
    );
};

export default TodoItem;
