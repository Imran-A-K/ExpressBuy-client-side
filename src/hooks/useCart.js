import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query'
import useAuthentication from './useAuthentication'
import useAxiosInterceptor from './useAxiosInterceptor'

const useCart = () => {
  const { user, queryEnabler } = useAuthentication()
  const [axiosBase] = useAxiosInterceptor(); // calling the custom hook with axios interceptor
  // here i have changed the name of the data field by destructuring and set it as cart for useQuery
  const { refetch,data: cart = []} = useQuery({
   
    queryKey: ['carts', user?.mail],
    enabled: queryEnabler,                      
    queryFn: async () => {
      const response = await axiosBase(`/carts?email=${user?.email}`)
      // console.log(response)
      return response.data;
    },
  })

 
  
  return [ cart, refetch]
}

export default useCart