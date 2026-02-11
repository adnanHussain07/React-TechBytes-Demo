import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTasks, addTask, updateTask, deleteTask } from '../api';
import { Task } from '../types';

export const useTasks = () => {
  const queryClient = useQueryClient();

  const {
    data: tasks,
    isLoading,
    isError,
    error,
  } = useQuery<Task[], Error>({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });

  const addTaskMutation = useMutation<
    Task,
    Error,
    string,
    { previousTasks: Task[] | undefined } // Add context type here
  >({
    mutationFn: addTask,
    onMutate: async (newTitle) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['tasks'] });

      // Snapshot the previous value
      const previousTasks = queryClient.getQueryData<Task[]>(['tasks']);

      // Optimistically update to the new value
      queryClient.setQueryData<Task[]>(['tasks'], (old) => {
        const optimisticTask: Task = {
          id: 'optimistic-id-' + Date.now(), // Temporary ID
          title: newTitle,
          completed: false,
        };
        return old ? [...old, optimisticTask] : [optimisticTask];
      });

      return { previousTasks };
    },
    onError: (_err, _newTitle, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      queryClient.setQueryData(['tasks'], context?.previousTasks);
    },
    onSettled: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const updateTaskMutation = useMutation<
    Task,
    Error,
    Task,
    { previousTasks: Task[] | undefined } // Add context type here
  >({
    mutationFn: updateTask,
    onMutate: async (updatedTask) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previousTasks = queryClient.getQueryData<Task[]>(['tasks']);
      queryClient.setQueryData<Task[]>(['tasks'], (old) =>
        old ? old.map((task) => (task.id === updatedTask.id ? updatedTask : task)) : []
      );
      return { previousTasks };
    },
    onError: (_err, _updatedTask, context) => {
      queryClient.setQueryData(['tasks'], context?.previousTasks);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const deleteTaskMutation = useMutation<
    void,
    Error,
    string,
    { previousTasks: Task[] | undefined } // Add context type here
  >({
    mutationFn: deleteTask,
    onMutate: async (taskId) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
      const previousTasks = queryClient.getQueryData<Task[]>(['tasks']);
      queryClient.setQueryData<Task[]>(['tasks'], (old) =>
        old ? old.filter((task) => task.id !== taskId) : []
      );
      return { previousTasks };
    },
    onError: (_err, _taskId, context) => {
      queryClient.setQueryData(['tasks'], context?.previousTasks);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  return {
    tasks,
    isLoading,
    isError,
    error,
    addTask: addTaskMutation.mutate,
    updateTask: updateTaskMutation.mutate,
    deleteTask: deleteTaskMutation.mutate,
  };
};
