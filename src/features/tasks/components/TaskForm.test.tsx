import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from './TaskForm';

describe('TaskForm', () => {
  const mockOnAddTask = vi.fn();

  beforeEach(() => {
    mockOnAddTask.mockClear();
  });

  test('renders an input field and an add button', () => {
    render(<TaskForm onAddTask={mockOnAddTask} />);

    expect(screen.getByPlaceholderText('Add a new task')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument();
  });

  test('calls onAddTask with the input value when submitted', () => {
    render(<TaskForm onAddTask={mockOnAddTask} />);

    const input = screen.getByPlaceholderText('Add a new task');
    const addButton = screen.getByRole('button', { name: /add task/i });

    fireEvent.change(input, { target: { value: 'New Test Task' } });
    fireEvent.click(addButton);

    expect(mockOnAddTask).toHaveBeenCalledTimes(1);
    expect(mockOnAddTask).toHaveBeenCalledWith('New Test Task');
    expect(input).toHaveValue(''); // Input should be cleared after submission
  });

  test('does not call onAddTask if input is empty', () => {
    render(<TaskForm onAddTask={mockOnAddTask} />);

    const addButton = screen.getByRole('button', { name: /add task/i });
    fireEvent.click(addButton); // Click without typing anything

    expect(mockOnAddTask).not.toHaveBeenCalled();
  });

  test('does not call onAddTask if input contains only whitespace', () => {
    render(<TaskForm onAddTask={mockOnAddTask} />);

    const input = screen.getByPlaceholderText('Add a new task');
    const addButton = screen.getByRole('button', { name: /add task/i });

    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(addButton);

    expect(mockOnAddTask).not.toHaveBeenCalled();
  });
});
