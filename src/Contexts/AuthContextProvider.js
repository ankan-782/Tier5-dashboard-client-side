import React, { createContext } from 'react';
import useAuthenticationFunctionality from '../Hooks/useAuthenticationFunctionality';

export const AuthContext = createContext(null);

const AuthContextProvider = ({ children }) => {
    const authenticationFunctionalityContexts = useAuthenticationFunctionality();
    return (
        <AuthContext.Provider value={authenticationFunctionalityContexts}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;