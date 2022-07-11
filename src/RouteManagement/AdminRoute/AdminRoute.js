import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuthValues from '../../Hooks/useAuthValues';
import './AdminRoute.css';

const AdminRoute = ({ children }) => {
    const { user, admin, isLoading } = useAuthValues();
    let location = useLocation();
    if (isLoading) {
        return (
            <>
                <div className="min-vh-100 bg-success bg-opacity-10 d-flex justify-content-center align-items-center">
                    <div className="lds-facebook">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </>
        );
    }
    if (user?.email && admin) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} />;
};

export default AdminRoute;