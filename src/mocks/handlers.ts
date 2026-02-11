import { http, HttpResponse } from 'msw';
import { Task, NetworkSimulatorSettings } from '../features/tasks/types';

let tasks: Task[] = [
  { id: '1', title: 'Learn React', completed: true },
  { id: '2', title: 'Build a demo app', completed: false },
  { id: '3', title: 'Present to team', completed: false },
];

let networkSettings: NetworkSimulatorSettings = {
  latency: 0,
  failureRate: 0,
};

const simulateNetwork = async () => {
  return new Promise((resolve, reject) => {
    if (networkSettings.latency > 0) {
      setTimeout(() => {
        if (Math.random() * 100 < networkSettings.failureRate) {
          reject(new Error('Simulated network failure'));
        } else {
          resolve(null);
        }
      }, networkSettings.latency);
    } else {
      if (Math.random() * 100 < networkSettings.failureRate) {
        reject(new Error('Simulated network failure'));
      } else {
        resolve(null);
      }
    }
  });
};

export const handlers = [
  http.get('/api/network-settings', () => {
    return HttpResponse.json(networkSettings);
  }),

  http.post('/api/network-settings', async ({ request }) => {
    networkSettings = (await request.json()) as NetworkSimulatorSettings;
    return HttpResponse.json(networkSettings);
  }),

  http.get('/api/tasks', async () => {
    try {
      await simulateNetwork();
      return HttpResponse.json(tasks);
    } catch (error) {
      return HttpResponse.json({ message: (error as Error).message }, { status: 500 });
    }
  }),

  http.post('/api/tasks', async ({ request }) => {
    try {
      await simulateNetwork();
      const newTask = (await request.json()) as Omit<Task, 'id'>;
      const task: Task = { id: String(Date.now()), ...newTask }; // Use Date.now() for unique ID
      tasks.push(task);
      return HttpResponse.json(task, { status: 201 });
    } catch (error) {
      return HttpResponse.json({ message: (error as Error).message }, { status: 500 });
    }
  }),

  http.put('/api/tasks/:taskId', async ({ params, request }) => {
    try {
      await simulateNetwork();
      const { taskId } = params;
      const updatedTask = (await request.json()) as Task;
      tasks = tasks.map((task) => (task.id === taskId ? updatedTask : task));
      return HttpResponse.json(updatedTask);
    } catch (error) {
      return HttpResponse.json({ message: (error as Error).message }, { status: 500 });
    }
  }),

  http.delete('/api/tasks/:taskId', async ({ params }) => {
    try {
      await simulateNetwork();
      const { taskId } = params;
      tasks = tasks.filter((task) => task.id !== taskId);
      return HttpResponse.json(null, { status: 204 });
    } catch (error) {
      return HttpResponse.json({ message: (error as Error).message }, { status: 500 });
    }
  }),
];
