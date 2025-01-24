import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import StatusBar from './StatusBar';
import '@testing-library/jest-dom';

const mockTodos = [
    { id: '1', text: 'Todo 1', completed: true },
    { id: '2', text: 'Todo 2', completed: false },
    { id: '3', text: 'Todo 3', completed: true },
];

describe('StatusBar Component', () => {
    it('should display the correct number of completed todos', () => {        
        render(<StatusBar todos={mockTodos} clearCompleted={vi.fn()} applyStatusFilter={vi.fn()} />);
        expect(screen.getByRole('paragraph', { name: 'todoCount' }).textContent).toBe((mockTodos.length - 1).toString());
    });

    it('should call applyStatusFilter with "All" when All button is clicked', () => {
        const applyStatusFilter = vi.fn();
        render(<StatusBar todos={mockTodos} clearCompleted={vi.fn()} applyStatusFilter={applyStatusFilter} />);
        fireEvent.click(screen.getByText('All'));
        expect(applyStatusFilter).toHaveBeenCalledWith(expect.any(Object), 'All');
    });

    it('should call clearCompleted when Clear complete button is clicked', () => {
        const clearCompleted = vi.fn();
        render(<StatusBar todos={mockTodos} clearCompleted={clearCompleted} applyStatusFilter={vi.fn()} />);
        fireEvent.click(screen.getByRole('button', { name: 'deleteBtn' }));
        expect(clearCompleted).toHaveBeenCalled();
    });
});
