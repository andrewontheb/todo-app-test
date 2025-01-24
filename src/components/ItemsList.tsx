import React from 'react';
import TodoItem from './TodoItem';
import { ItemsListProps } from '../Interfaces';

/**
 * ItemsList component
 * @component
 */
const ItemsList: React.FC<ItemsListProps> = ({ todos, toggleComplete = () => {} }) => {
    const stubText: JSX.Element = <p className='p-4 text-gray-500 italic'>There is no filtered todos</p>;

    return (
        <div className='flex flex-col flex-wrap gap-5 min-h-32 max-h-40 overflow-y-auto'>
            {todos?.map(todo => (
                <TodoItem key={todo.id} todo={todo} toggleComplete={toggleComplete} />
            ))}
            {!todos.length && stubText}
        </div>
    );
};

export default ItemsList;
