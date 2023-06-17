import { useQuery, } from "@tanstack/react-query";
import useAuthentication from "./useAuthentication";
import useAxiosInterceptor from "./useAxiosInterceptor";

const useTotalCartPrice = () => {
    const { user, queryEnabler } = useAuthentication()
    const [axiosBase] = useAxiosInterceptor(); // calling the custom hook with axios interceptor
    // here i have changed the name of the data field by destructuring and set it as cart for useQuery
    const { refetch : reload,data: cartDetails = {}} = useQuery({
     
      queryKey: ['carts-products-price', user?.mail],
      enabled: queryEnabler,                      
      queryFn: async () => {
        const response = await axiosBase(`/carts/user-cart-products-total-price?customerEmail=${user?.email}`)
        // console.log(response)
        return response.data;
      },
    })
  
   
    
    return [ cartDetails, reload]
}

export default useTotalCartPrice