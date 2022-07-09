import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [navActive, setNavActive] = useState('');

    return (
        <div className='fixed-top navbar navbar-expand-lg bg-success bg-opacity-25 p-2'>
            <div className='container'>
                <div>
                    <h5>Tier5 Technology Solutions</h5>
                </div>
                <div>
                    <NavLink
                        to='home'
                        onClick={() => setNavActive('home')}
                        className={`${navActive === 'home' ? 'text-success fw-bold' : 'text-dark'} me-4 text-decoration-none`}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to='dashboard'
                        onClick={() => setNavActive('dashboard')}
                        className={`${navActive === 'dashboard' ? 'text-success fw-bold' : 'text-dark'} me-4 text-decoration-none`}
                    >
                        Dashboard
                    </NavLink>
                    <NavLink
                        to='profile'
                        onClick={() => setNavActive('profile')}
                        className={`${navActive === 'profile' ? 'text-success fw-bold' : 'text-dark'} me-4 text-decoration-none`}
                    >
                        Profile
                    </NavLink>
                    <NavLink
                        to='login'
                        onClick={() => setNavActive('login')}
                        className={`${navActive === 'login' ? 'text-success fw-bold' : 'text-dark'} text-decoration-none`}
                    >
                        Login
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Navbar;