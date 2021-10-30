import api from './apiHelper';
import { useCustomQuery, useRefetchQuery } from 'hooks/reactQuery';

export const useGetTasks = () => {
  const getTasks = async () => {
    return api.get(`/tasks`).then(res => res.tasks);
  };

  return useCustomQuery('tasks', [], getTasks, { defaultEmptyValue: [] });
};

export const updateTask = (id, payload) => {
  return api.put(`/tasks/${id}`, payload);
};

export const createTask = payload => {
  return api.post(`/tasks/`, payload);
};

export const deleteTask = id => {
  return api.delete(`/tasks/${id}`);
};

export const useRefetchTasks = () => {
  const { refetch } = useRefetchQuery(['tasks']);
  return refetch;
};
