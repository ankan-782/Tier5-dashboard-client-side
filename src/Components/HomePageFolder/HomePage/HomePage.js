import React from 'react';
import useAuthValues from '../../../Hooks/useAuthValues';
import './HomePage.css';

const HomePage = () => {
    const {user} = useAuthValues();
    return (
        <div className='min-vh-100 d-flex justify-content-center align-items-center bg-success bg-opacity-10'>
            <h1>Welcome to Homepage Mr. {user?.email}</h1>
        </div>
    );
};

export default HomePage;