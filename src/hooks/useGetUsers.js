import { useQuery } from '@tanstack/react-query'
import useAuthentication from './useAuthentication'
import useAxiosInterceptor from './useAxiosInterceptor';

const useGetUsers = () => {
    const { user, queryEnabler } = useAuthentication();
    const [axiosBase] = useAxiosInterceptor();

    const { refetch, data : allUsers = [] } = useQuery({
        queryKey: ['all-Users'],
        enabled: queryEnabler,
        queryFn: async () => {
            const response = await axiosBase(`/users`)
            return response.data;
          }
          
    })
    return [allUsers, refetch]

}

export default useGetUsers