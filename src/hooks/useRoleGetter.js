import { useQuery } from '@tanstack/react-query'
import useAuthentication from './useAuthentication'
import useAxiosInterceptor from './useAxiosInterceptor';
const useRoleGetter = () => {
    const { user, queryEnabler } = useAuthentication();
    const [axiosBase] = useAxiosInterceptor();
    const { refetch,isLoading, data : userRole = [] } = useQuery({
        queryKey: ['user-role', user?.email],
        enabled: queryEnabler,
        queryFn: async () => {
            const response = await axiosBase(`/user-role/${user?.email}`)
            return response.data.role;
          }
          
    })
    return [userRole, refetch, isLoading]
}

export default useRoleGetter