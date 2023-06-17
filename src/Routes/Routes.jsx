import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import Main from "../Layout/Main";
import Shop from "../pages/Shop/Shop";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Check from "../pages/Check";
import SignUp from "../pages/Signup";
import Home from "../pages/Home/Home";
import PrivateRoute from "./PrivateRoute";
import UserDashBoard from "../Layout/UserDashBoard";
import Cart from "../pages/Dashboard/User/Cart/Cart";
import MyOrders from "../pages/Dashboard/User/MyOrders/MyOrders";


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
            {
                path: '/check',
                element: <Check />
            },
            {
                path: '/signup',
                element: <SignUp />
            }
            
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
   
])