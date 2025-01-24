import React from 'react';
import { ItemsListProps, StatusType } from '../Interfaces';


/**
 * StatusBar component
 * @component
 */
const StatusBar: React.FC<ItemsListProps> = ({ todos, statusType, clearCompleted, applyStatusFilter }) => {
    /**
     * Count completed todos
     * @returns {JSX.Element}
     */
    const countCompleted = (): JSX.Element => {
        return (
            <p aria-label='todoCount' className='font-semibold text-gray-600 inline-block'>
                {todos?.filter(todo => !!todo.completed).length}
            </p>
        );
    };
    const defStyles = {
        className: 'flex-1 bg-violet-500 hover:bg-violet-100 active:bg-violet-200 text-sky-500 focus:outline-none focus:ring focus:ring-violet-300 mr-2',
        activeClassName: ' bg-white border-sky-500',
    };
    const btns: StatusType[] = ['All', 'Active', 'Completed'];

    return (
        <div className='statusBar'>
            <div className='mr-auto text-gray-500'>Completed tasks: {countCompleted()}</div>
            <div className='flex w-full'>
                {btns.map((btn, index) => {
                    return <button className={`${defStyles.className} ${btn === statusType ? defStyles.activeClassName : ''}`} key={index} onClick={(e) => applyStatusFilter(e, btn)}>{btn}</button>
                })}
            </div>
            <button aria-label='deleteBtn' onClick={clearCompleted} className="mr-auto bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow inline-flex items-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
            </button>
        </div>
    )
}

export default StatusBar;
