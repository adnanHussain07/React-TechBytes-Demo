import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { useTasks } from './useTasks';
import { Task } from '../types';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: Infinity, // Keep data fresh for tests
      },
      mutations: {
        retry: false,
      },
    },
  });

let initialTasks: Task[] = []; // Start with an empty array for this test

const server = setupServer(
  http.get('/api/tasks', () => {
    return HttpResponse.json(initialTasks, { status: 200 });
  }),
  http.post('/api/tasks', async ({ request }) => {
    const newTask = (await request.json()) as Omit<Task, 'id'>;
    const task: Task = { id: 'new-id', ...newTask };
    return HttpResponse.json(task, { status: 201, delay: 100 }); // Simulate network delay
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  // Ensure queryClient is reset for each test
  queryClient.clear();
  initialTasks = []; // Reset for next test
});
afterAll(() => server.close());

let queryClient: QueryClient; // Declare globally but initialize per test

describe('useTasks optimistic behavior', () => {
  beforeEach(() => {
    queryClient = createTestQueryClient(); // Create a fresh QueryClient for each test
  });

  test('optimistically adds a new task to an empty list', async () => {
    // No initial data set here, useQuery will fetch empty list

    const { result } = renderHook(() => useTasks(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      ),
    });

    // Wait for the hook to fetch the initial (empty) data
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    await waitFor(() => expect(result.current.tasks).toEqual([]));

    // Perform optimistic update
    result.current.addTask('Optimistic Task');

    // Wait for the optimistic update to be reflected in the hook's result
    await waitFor(() => {
      expect(result.current.tasks?.length).toBe(1); // Now expecting 1 task
      expect(result.current.tasks?.[0]?.title).toBe('Optimistic Task');
      expect(result.current.tasks?.[0]?.id).toContain('optimistic-id-'); // Check for temporary ID
    });

    // Wait for the actual mutation to resolve and re-fetch
    await waitFor(() => expect(result.current.tasks?.[0]?.id).toBe('new-id'), { timeout: 2000 });
    expect(result.current.tasks?.[0]?.title).toBe('Optimistic Task');
  });
});
