import React, { useState } from 'react';

type TaskFormProps = {
  onAddTask: (_title: string) => void;
};

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask }) => {
  const [taskTitle, setTaskTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskTitle.trim()) {
      onAddTask(taskTitle.trim());
      setTaskTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder="Add a new task"
        style={{ marginRight: '8px', padding: '8px' }}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
