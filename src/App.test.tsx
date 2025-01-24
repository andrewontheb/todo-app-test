import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import App from './App';

describe('App Component', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('adds a new todo item', () => {
        render(<App />);
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'test todo task' } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
        expect(screen.getByText('test todo task')).toBeInTheDocument();
    });

    it('toggles a todo item as completed', () => {
        render(<App />);
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'New Todo' } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
        const todoItem = screen.getByText('New Todo');
        fireEvent.click(todoItem);
        expect(todoItem).toHaveClass('completed');
    });

    it('filters completed todos', () => {
        render(<App />);
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'New Todo' } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
        const todoItem = screen.getByText('New Todo');
        fireEvent.click(todoItem);
        const completedFilter = screen.getByText('Completed');
        fireEvent.click(completedFilter);
        expect(todoItem).toBeInTheDocument();
    });

    it('clears completed todos', () => {
        render(<App />);
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'New Todo' } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
        const todoItem = screen.getByText('New Todo');
        fireEvent.click(todoItem);
        const clearCompletedButton = screen.getByRole('button', { name: 'deleteBtn' });
        fireEvent.click(clearCompletedButton);
        expect(todoItem).not.toBeInTheDocument();
    });
});
