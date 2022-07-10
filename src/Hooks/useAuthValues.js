import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContextProvider";

const useAuthValues = () => {
    const auth = useContext(AuthContext);
    return auth;
}

export default useAuthValues;