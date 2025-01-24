import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TodoItem from './TodoItem';
import { TodoItemProps } from '../Interfaces';

describe('TodoItem Component', () => {
    const mockTodo: TodoItemProps['todo'] = {
        id: 1,
        text: 'Test Todo',
        completed: false,
    };

    const mockToggleComplete = vi.fn();

    it('renders the todo item text', () => {
        render(<TodoItem todo={mockTodo} toggleComplete={mockToggleComplete} />);
        expect(screen.getByText('Test Todo')).toBeInTheDocument();
    });

    it('renders the checkbox with the correct checked state', () => {
        render(<TodoItem todo={mockTodo} toggleComplete={mockToggleComplete} />);
        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeInTheDocument();
        expect(checkbox).not.toBeChecked();
    });

    it('calls toggleComplete when checkbox is clicked', () => {
        render(<TodoItem todo={mockTodo} toggleComplete={mockToggleComplete} />);        
        const checkbox = screen.getByRole('checkbox');
        fireEvent.click(checkbox);
        expect(mockToggleComplete).toHaveBeenCalledWith(mockTodo.id);
    });

    it('applies line-through style when todo is completed', () => {
        const completedTodo = { ...mockTodo, completed: true };
        render(<TodoItem todo={completedTodo} toggleComplete={mockToggleComplete} />);
        const todoText = screen.getByText('Test Todo');
        expect(todoText).toHaveStyle('text-decoration: line-through');
    });

    it('does not apply line-through style when todo is not completed', () => {
        render(<TodoItem todo={mockTodo} toggleComplete={mockToggleComplete} />);
        const todoText = screen.getByText('Test Todo');
        expect(todoText).toHaveStyle('text-decoration: none');
    });
});
