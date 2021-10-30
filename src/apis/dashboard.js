import api from './apiHelper';
import { useCustomQuery } from 'hooks/reactQuery';

export const useGetDashboardData = () => {
  const getDashboardData = async () => {
    return api.get(`/dashboard`);
  };

  return useCustomQuery('dashboard', [], getDashboardData, { defaultEmptyValue: {} });
};
