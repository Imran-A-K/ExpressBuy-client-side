import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import Main from "../Layout/Main";
import Shop from "../pages/Shop/Shop";
import Login from "../pages/Login";
import Register from "../pages/Register";

import Home from "../pages/Home/Home";
import PrivateRoute from "./PrivateRoute";
import UserDashBoard from "../Layout/UserDashBoard";
import Cart from "../pages/Dashboard/User/Cart/Cart";
import MyOrders from "../pages/Dashboard/User/MyOrders/MyOrders";
import AdminDashBoard from "../Layout/AdminDashBoard";
import AdminStats from "../pages/Dashboard/Admin/Overview/AdminStats";
import Orders from "../pages/Dashboard/Admin/Orders/Orders";
import ProductList from "../pages/Dashboard/Admin/ProductList/ProductList";
import Users from "../pages/Dashboard/Admin/Users/Users";


export const router = createBrowserRouter([
    {
        
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/shop',
                element: <Shop />
            }
            ,
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            
            
            
        ]
        
    },
    

    {
        path: '/user-dashboard',
        element: <PrivateRoute>

                <UserDashBoard ></UserDashBoard>
                
                </PrivateRoute>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: 'my-cart',
                element: <Cart />
            },
            {
                path: 'my-orders',
                element: <MyOrders />
            },
            
        ]
    },
    
        {
            path: '/admin-dashboard',
            element: <PrivateRoute>
    
                    <AdminDashBoard></AdminDashBoard>
                    
                    </PrivateRoute>,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: 'overview',
                    element: <AdminStats />
                },
                {
                    path: 'orders',
                    element: <Orders />
                },
            
                {
                    path: 'product-list',
                    element: <ProductList />
                },
                {
                    path: 'users',
                    element: <Users />
                }   
            ]
        }
    
   
])