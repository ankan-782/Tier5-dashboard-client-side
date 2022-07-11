import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './DashboardLayout.css';

const DashboardLayout = () => {
    const [navActive, setNavActive] = useState('');
    return (
        <>
            <div>
                <button className="offcanvas-button" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions"><i className="fa-solid fa-bars"></i></button>
                <Outlet />
            </div>

            <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">Tier5 Technology Solutions</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="mt-3 offcanvas-body">
                    <NavLink
                        to='/dashboard'
                        onClick={() => setNavActive('dashboard')}
                        className={`${navActive === 'dashboard' ? 'text-success fw-bold' : 'text-dark'} d-block mb-3 text-decoration-none`}
                    >
                        Dashboard
                    </NavLink>
                    <NavLink
                        to='/dashboard/addAnotherUser'
                        onClick={() => setNavActive('addUser')}
                        className={`${navActive === 'addUser' ? 'text-success fw-bold' : 'text-dark'} d-block mb-3 text-decoration-none`}
                    >
                        Add Another User
                    </NavLink>
                    <NavLink
                        to='/dashboard/addAdminUser'
                        onClick={() => setNavActive('addAdminUser')}
                        className={`${navActive === 'addAdminUser' ? 'text-success fw-bold' : 'text-dark'} d-block mb-3 text-decoration-none`}
                    >
                        Add a Admin User
                    </NavLink>
                </div>
            </div>
        </>
    );
};

export default DashboardLayout;