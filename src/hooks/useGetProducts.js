import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
const useGetProducts = () => {
    const { refetch, data : allProducts = [] } = useQuery({
        queryKey: ['all-products'],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:4000/products`)
            return response.data;
          }
          
    })
    return [allProducts, refetch]
}

export default useGetProducts