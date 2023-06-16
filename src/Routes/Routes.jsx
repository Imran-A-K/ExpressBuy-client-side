import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import Main from "../Layout/Main";
import Shop from "../pages/Shop/Shop";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Check from "../pages/Check";
import SignUp from "../pages/Signup";
import Home from "../pages/Home/Home";


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
    
   
])