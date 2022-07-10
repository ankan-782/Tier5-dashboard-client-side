import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import useAuthValues from '../../../Hooks/useAuthValues';
import './Navbar.css';

const Navbar = () => {
    const [navActive, setNavActive] = useState('');
    const { user, logOutUser } = useAuthValues();

    return (
        <nav className="navbar navbar-expand-lg bg-success bg-opacity-25">
            <div className="container">
                <h5 className='m-0'>Tier5 Technology Solutions</h5>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="navbar-nav ms-auto mb-2 mb-lg-0">
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
                        {
                            user?.email ?
                                <button
                                    style={{
                                        'backgroundColor': 'transparent',
                                        'border': 'none'
                                    }}
                                    onClick={logOutUser}
                                    className={`${navActive === 'logout' ? 'text-success fw-bold' : 'text-dark'} text-start p-0`}
                                >
                                    Logout
                                </button>
                                :
                                <NavLink
                                    to='login'
                                    onClick={() => setNavActive('login')}
                                    className={`${navActive === 'login' ? 'text-success fw-bold' : 'text-dark'} text-decoration-none`}
                                >
                                    Login
                                </NavLink>
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;