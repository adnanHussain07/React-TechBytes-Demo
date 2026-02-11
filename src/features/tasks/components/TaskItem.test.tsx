import { render, screen, fireEvent } from '@testing-library/react';
import TaskItem from './TaskItem';
import { Task } from '../types';

describe('TaskItem', () => {
  const mockTask: Task = {
    id: '1',
    title: 'Test Task',
    completed: false,
  };

  const mockOnToggle = vi.fn();
  const mockOnDelete = vi.fn();

  beforeEach(() => {
    mockOnToggle.mockClear();
    mockOnDelete.mockClear();
  });

  test('renders task title and checkbox', () => {
    render(<TaskItem task={mockTask} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

    expect(screen.getByText('Test Task')).toBeInTheDocument();
    const checkbox = screen.getByLabelText('Test Task') as HTMLInputElement;
    expect(checkbox).not.toBeChecked();
  });

  test('checkbox reflects completed status', () => {
    const completedTask = { ...mockTask, completed: true };
    render(<TaskItem task={completedTask} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

    const checkbox = screen.getByLabelText('Test Task') as HTMLInputElement;
    expect(checkbox).toBeChecked();
    expect(screen.getByText('Test Task')).toHaveStyle('text-decoration: line-through');
  });

  test('calls onToggle when checkbox is clicked', () => {
    render(<TaskItem task={mockTask} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

    const checkbox = screen.getByLabelText('Test Task');
    fireEvent.click(checkbox);

    expect(mockOnToggle).toHaveBeenCalledTimes(1);
    expect(mockOnToggle).toHaveBeenCalledWith(mockTask.id);
  });

  test('calls onDelete when delete button is clicked', () => {
    render(<TaskItem task={mockTask} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledWith(mockTask.id);
  });
});
