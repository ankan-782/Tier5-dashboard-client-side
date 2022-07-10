import React from 'react';
import { Link } from 'react-router-dom';
import withAuthentication from '../../HOC/withAuthentication'
import useAuthValues from '../../Hooks/useAuthValues';
import './Login.css';

const Login = (props) => {
    const { inputActive, setInputActive, inputFieldInfos, location, navigate, showHideTogglePassword, handleOnChange, showPassword } = props;

    const { loginUser, setError, error, setBackendError, backendError } = useAuthValues();

    const handleLogin = (e) => {
        e.preventDefault();
        loginUser(inputFieldInfos.email, inputFieldInfos.password, location, navigate);
    }

    return (
        <div className='min-vh-100 d-flex justify-content-center align-items-center bg-success bg-opacity-10'>
            <div className='bg-dark bg-opacity-25 login-content'>
                <form onSubmit={handleLogin} className="mb-3">
                    <div className='mb-4'>
                        <input
                            title='Your Email Id'
                            name='email'
                            onChange={handleOnChange}
                            onFocus={() => setInputActive('email')}
                            onBlur={() => setInputActive('')}
                            onClick={() => {
                                setError('');
                                setBackendError('')
                            }} type="email"
                            className={`${inputActive === 'email' && "inputActive"} input-bg border-0 p-3`}
                            placeholder="Your Email Id"
                            autoComplete="on"
                            required
                        />
                    </div>
                    <div className='mb-5 password-field-login'>
                        <input
                            title='Your Password'
                            name='password'
                            onChange={handleOnChange}
                            onFocus={() => setInputActive('password')}
                            onBlur={() => setInputActive('')}
                            onClick={() => { setError(''); setBackendError('') }}
                            type={showPassword ? 'text' : 'password'}
                            className={`${inputActive === 'password' && "inputActive"} input-bg border-0 p-3`}
                            placeholder="Your Password"
                            autoComplete="on"
                            required
                        />
                        {showPassword ?
                            <i onClick={showHideTogglePassword} className="fa-solid fa-eye-slash show-hide-toggle"></i>
                            :
                            <i onClick={showHideTogglePassword} className="fa-solid fa-eye show-hide-toggle"></i>}
                    </div>
                    <button type='submit' className='form-btn p-3'>L o g i n</button>
                </form>
                <Link to='/login' className='reset-pass d-block text-center mb-2'>Forgot Password ?</Link>
                <Link to='/registration' className='register-divert d-block text-center'>New User? Click to register</Link>
                {backendError && (<p className='mt-3 text-danger fw-bold'>{backendError}</p>)}
                {error && (<p className='mt-3 text-danger fw-bold'>{error}</p>)}
            </div>
        </div>
    );
};

export default withAuthentication(Login);