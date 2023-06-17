import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
const useGetTotalProducts = () => {
    const { refetch, data : totalProducts = [] } = useQuery({
        queryKey: ['total-products'],
        queryFn: async () => {
            const response = await axios.get(`https://express-buy-server.vercel.app/totalProducts`)
            return response.data.totalProducts;
          }
          
    })
    return [totalProducts, refetch]
}

export default useGetTotalProducts