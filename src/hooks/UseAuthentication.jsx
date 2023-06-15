import { useContext } from "react";
import { AuthContext } from "../providers/AuthenticationProviders";


const useAuthentication = () => {
    const authFunctions = useContext(AuthContext);
     return authFunctions;
}

export default useAuthentication