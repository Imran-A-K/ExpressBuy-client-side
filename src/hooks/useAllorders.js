import { useQuery } from "@tanstack/react-query";
import useAuthentication from "./useAuthentication";
import useAxiosInterceptor from "./useAxiosInterceptor";

const useAllorders = () => {
    const { user, queryEnabler } = useAuthentication()
    const [axiosBase] = useAxiosInterceptor(); // calling the custom hook with axios interceptor
    // here i have changed the name of the data field by destructuring and set it as cart for useQuery
    const { refetch : reload,data: allOrders = []} = useQuery({
     
      queryKey: ['all-orders', user?.mail],
      enabled: queryEnabler,                      
      queryFn: async () => {
        const response = await axiosBase(`/all-orders`)
        // console.log(response)
        return response.data;
      },
    })
  
   
    
    return [ allOrders, reload]
}

export default useAllorders