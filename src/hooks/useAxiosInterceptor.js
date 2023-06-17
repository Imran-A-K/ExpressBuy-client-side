import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import useAuthentication from "./useAuthentication";
const axiosBase = axios.create({
    baseURL: 'http://localhost:4000', 
  });

const useAxiosInterceptor = () => {
    const {logOut} = useAuthentication();
    const navigate = useNavigate(); 

    useEffect(() => {
        axiosBase.interceptors.request.use((config) => {
          const token = localStorage.getItem('access-token');
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        });
        axiosBase.interceptors.response.use(
          (response) => response,
          async (error) => {
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
              await logOut();
              navigate('/login');
            }
            return Promise.reject(error);
          }
        ); 
      }, [navigate,logOut]);
    
      return [axiosBase];
}

export default useAxiosInterceptor