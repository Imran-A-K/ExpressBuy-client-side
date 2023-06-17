import { useQuery } from "@tanstack/react-query";
import useAuthentication from "./useAuthentication";
import useAxiosInterceptor from "./useAxiosInterceptor";

const useMyOrders = () => {
    const { user, queryEnabler } = useAuthentication()
    const [axiosBase] = useAxiosInterceptor(); // calling the custom hook with axios interceptor
    // here i have changed the name of the data field by destructuring and set it as cart for useQuery
    const { refetch : reload,data: orders = []} = useQuery({
     
      queryKey: ['user-orders', user?.mail],
      enabled: queryEnabler,                      
      queryFn: async () => {
        const response = await axiosBase(`/my-orders?customerEmail=${user?.email}`)
        // console.log(response)
        return response.data;
      },
    })
  
   
    
    return [ orders, reload]
}

export default useMyOrders