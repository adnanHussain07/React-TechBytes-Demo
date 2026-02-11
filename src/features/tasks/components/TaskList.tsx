import React from 'react';
import { Task } from '../types';
import TaskItem from './TaskItem';

type TaskListProps = {
  tasks: Task[];
  onToggle: (_id: string) => void;
  onDelete: (_id: string) => void;
};

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onDelete }) => {
  if (tasks.length === 0) {
    return <p>No tasks yet. Add one above!</p>;
  }

  return (
    <div>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default TaskList;
