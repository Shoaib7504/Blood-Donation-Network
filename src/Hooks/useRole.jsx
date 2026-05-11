import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: role, isLoading: isReloading } = useQuery({
    enabled: !loading && !!user?.email,

    queryKey: ['role', user?.email],

    queryFn: async () => {
      const { data } = await axiosSecure.get('/user/role');
      return data?.role || 'donor'; // fallback
    },
  });

  return { role, isReloading };
};

export default useRole;