import {fireEvent, render, screen} from '@testing-library/react';
import App from './App';
import Counter from "./Counter";
import React from "react";

test('increments count', () => {
    render(<Counter />);
    const button = screen.getByText(/increment/i);
    fireEvent.click(button);
    expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
});

test('decrements count', () => {
    render(<Counter />);
    const incrementButton = screen.getByText(/increment/i);
    const decrementButton = screen.getByText(/decrement/i);
    fireEvent.click(incrementButton);
    fireEvent.click(decrementButton);
    expect(screen.getByText(/count: 0/i)).toBeInTheDocument();
});