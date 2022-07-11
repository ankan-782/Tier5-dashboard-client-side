import React, { useState } from 'react';
import useAuthValues from '../../../Hooks/useAuthValues';
import './AddAdminUser.css';

const AddAdminUser = () => {
    const { setError, setBackendError, backendError, setSuccess, success, token } = useAuthValues();
    const [inputActive, setInputActive] = useState('');
    const [email, setEmail] = useState('');

    const handleOnChange = e => {
        setEmail(e.target.value);
    }

    const handleAdminSubmit = e => {
        const user = { email };
        fetch('http://localhost:5000/users/admin', {
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.message) {
                    setBackendError(data.message);
                }
                else {
                    // alert('Admin set successfully');
                    setSuccess('Admin set successfully');
                    e.target.reset();
                }
            })
        e.preventDefault();
    }

    return (
        <div className='min-vh-100 d-flex justify-content-center align-items-center bg-success bg-opacity-10'>
            <form onSubmit={handleAdminSubmit} className="border border-2 border-dark rounded-5 p-4">
                <div className="mb-3">
                    <label htmlFor="exampleInputAdmin" className="form-label fs-6">Make an Admin User</label>
                    <input
                        title='Your Email Id'
                        name='email'
                        onChange={handleOnChange}
                        onFocus={() => setInputActive('email')}
                        onBlur={() => setInputActive('')}
                        type="email"
                        onClick={() => {
                            setError('');
                            setBackendError('');
                            setSuccess('');
                        }}
                        className={`${inputActive === 'email' && "inputActive"} input-bg border-0 p-3`}
                        placeholder="Your Email Id"
                        autoComplete="on"
                        required
                    />
                </div>
                <button type="submit" className="form-btn p-3">Make Admin</button>
            {backendError && (<p className='mt-3 text-danger text-center fw-bold'>{backendError}</p>)}
            {success && (<p className='mt-3 text-success text-center fw-bold'>{success}</p>)}
            </form>
        </div>
    );
};

export default AddAdminUser;