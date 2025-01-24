import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ItemsList from './ItemsList';
import { ITemsListProps } from '../Interfaces';

describe('ItemsList Component', () => {
    const mockTodos = [
        { id: '1', text: 'Test Todo 1', completed: false },
        { id: '2', text: 'Test Todo 2', completed: true },
    ];

    const mockToggleComplete = vi.fn();

    const renderComponent = (props: Partial<ITemsListProps> = {}) => {
        const defaultProps: ITemsListProps = {
            todos: mockTodos,
            toggleComplete: mockToggleComplete,
            ...props,
        };
        return render(<ItemsList {...defaultProps} />);
    };

    it('should render the correct number of TodoItem components', () => {
        renderComponent();
        const todoItems = screen.getAllByRole('checkbox');
        expect(todoItems).toHaveLength(mockTodos.length);
    });

    it('should display the correct text for each TodoItem', () => {
        renderComponent();
        mockTodos.forEach(todo => {
            expect(screen.getByText(todo.text)).toBeInTheDocument();
        });
    });

    it('should call toggleComplete when a TodoItem is clicked', () => {
        renderComponent();
        const todoItem = screen.getByText(mockTodos[0].text);
        todoItem.click();
        expect(mockToggleComplete).toHaveBeenCalledWith(mockTodos[0].id);
    });
});
