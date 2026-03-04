import React from 'react';
import { Task } from '../types';

type TaskItemProps = {
  task: Task;
  onToggle: (_id: string) => void;
  onDelete: (_id: string) => void;
};

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        id={`task-${task.id}`}
        data-uiid="tasks.item.toggle"
        style={{ marginRight: '8px' }}
      />
      <label
        htmlFor={`task-${task.id}`}
        style={{ textDecoration: task.completed ? 'line-through' : 'none', flexGrow: 1 }}
      >
        {task.title}
      </label>
      <button 
        onClick={() => onDelete(task.id)} 
        style={{ marginLeft: '16px' }}
        data-uiid="tasks.item.delete"
      >
        Delete
      </button>
    </div>
  );
};

export default TaskItem;
