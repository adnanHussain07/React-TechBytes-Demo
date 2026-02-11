import { Task, NetworkSimulatorSettings } from '../types';

const API_BASE_URL = '/api';

// Task API functions
export const getTasks = async (): Promise<Task[]> => {
  const response = await fetch(`${API_BASE_URL}/tasks`);
  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  return response.json();
};

export const addTask = async (title: string): Promise<Task> => {
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, completed: false }),
  });
  if (!response.ok) {
    throw new Error('Failed to add task');
  }
  return response.json();
};

export const updateTask = async (task: Task): Promise<Task> => {
  const response = await fetch(`${API_BASE_URL}/tasks/${task.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error('Failed to update task');
  }
  return response.json();
};

export const deleteTask = async (taskId: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete task');
  }
};

// Network Simulator API functions
export const getNetworkSettings = async (): Promise<NetworkSimulatorSettings> => {
  const response = await fetch(`${API_BASE_URL}/network-settings`);
  if (!response.ok) {
    throw new Error('Failed to fetch network settings');
  }
  return response.json();
};

export const updateNetworkSettings = async (
  settings: NetworkSimulatorSettings
): Promise<NetworkSimulatorSettings> => {
  const response = await fetch(`${API_BASE_URL}/network-settings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(settings),
  });
  if (!response.ok) {
    throw new Error('Failed to update network settings');
  }
  return response.json();
};
