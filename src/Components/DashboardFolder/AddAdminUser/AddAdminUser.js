import React from 'react';
import useAuthValues from '../../../Hooks/useAuthValues';
import './AddAdminUser.css';

const AddAdminUser = () => {
    const { user } = useAuthValues();
    return (
        <div className='min-vh-100 d-flex justify-content-center align-items-center bg-success bg-opacity-10'>
            <h1>Welcome to Add Admin User Page Mr. {user?.email}</h1>
        </div>
    );
};

export default AddAdminUser;