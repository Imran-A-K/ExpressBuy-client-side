import useAuthentication from '../hooks/useAuthentication';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const { user, loading } = useAuthentication();
    const location = useLocation();

    if (loading) {
      return (
        <div className="flex mt-60 bg-white justify-center">
          <span className="loading loading-bars text-blue-500 loading-xs"></span>
<span className="loading loading-bars text-blue-500 loading-sm"></span>
<span className="loading loading-bars text-blue-500 loading-md"></span>
<span className="loading loading-bars text-blue-500 loading-lg"></span>
          
        </div>
      );
    }
    if (user) {
      return children;
    }
    return <Navigate to="/login" state={{ from: location }}></Navigate>;
}

export default PrivateRoute