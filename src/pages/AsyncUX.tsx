import React from 'react';
import TaskForm from '../features/tasks/components/TaskForm';
import TaskList from '../features/tasks/components/TaskList';
import NetworkSimulator from '../features/tasks/components/NetworkSimulator';
import { useTasks } from '../features/tasks/hooks/useTasks';
import { Task as _Task } from '../features/tasks/types';

const AsyncUX: React.FC = () => {
  const { tasks, isLoading, isError, error, addTask, updateTask, deleteTask } = useTasks();

  const handleAddTask = (title: string) => {
    addTask(title);
  };

  const handleToggleTask = (id: string) => {
    const taskToUpdate = tasks?.find((task) => task.id === id);
    if (taskToUpdate) {
      updateTask({ ...taskToUpdate, completed: !taskToUpdate.completed });
    }
  };

  const handleDeleteTask = (id: string) => {
    deleteTask(id);
  };

  return (
    <div>
      <h2>Async UI/UX</h2>
      <p>Demonstrates loading/error/retry, optimistic updates, and simulated latency.</p>

      <NetworkSimulator />

      <hr />

      <h3>Task Management (Optimistic Updates)</h3>
      <TaskForm onAddTask={handleAddTask} />

      {isLoading && <p>Loading tasks...</p>}

      {isError && (
        <>
          <p style={{ color: 'red' }}>Error: {error?.message}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </>
      )}

      {!isLoading && !isError && tasks && tasks.length > 0 && (
        <TaskList tasks={tasks} onToggle={handleToggleTask} onDelete={handleDeleteTask} />
      )}

      {!isLoading && !isError && (!tasks || tasks.length === 0) && (
        <p>No tasks found. Add a new task!</p>
      )}
    </div>
  );
};

export default AsyncUX;
