import React from 'react';
export type StatusType = 'All' | 'Completed' | 'Active';


/**
 * @typedef ItemsListProps
 * @property {Todo[]} todos Task list
 * @property {function(id: string | undefined): void} toggleComplete Switch task status
 * @property {function(): React.MouseEventHandler<HTMLButtonElement>} clearCompleted Clear completed tasks
 * @property {function(event: React.MouseEvent<HTMLButtonElement>, status: StatusType): void} applyStatusFilter Apply status filter
 * @property {StatusType} statusType Type of status
 */
export type ItemsListProps = {
    todos: Todo[];
    toggleComplete?: (id: string) => void;
    clearCompleted?: React.MouseEventHandler<HTMLButtonElement>;
    applyStatusFilter?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, status: StatusType) => void;
    statusType?: StatusType;
}

/**
 * @typedef TodoItemProps
 * @property {Todo[]} todos Task list
 * @property {function(id: string | undefined): void} toggleComplete Switch task status
 */
export type TodoItemProps = {
    todo: Todo;
    toggleComplete: (id: string) => void;
}

/**
 * @typedef Todo
 * @property {Todo[]} id 
 * @property {string} text todo text
 * @property {boolean} completed completed status
 */
export type Todo = {
    id: string;
    text: string;
    completed: boolean;
}
