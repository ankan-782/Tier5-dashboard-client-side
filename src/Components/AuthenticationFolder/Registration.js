import React from 'react';
import { Link } from 'react-router-dom';
import withAuthentication from '../../HOC/withAuthentication';
import useAuthValues from '../../Hooks/useAuthValues';
import './Registration.css';

const Registration = (props) => {
    const { inputActive, setInputActive, inputFieldInfos, showHideTogglePassword, showHideToggleConfirmPassword, handleOnChange, showPassword, showConfirmPassword } = props;

    const { registration, setError, error, setBackendError, backendError, setSuccess, success } = useAuthValues();

    const handleRegistration = (e) => {
        e.preventDefault();
        if (inputFieldInfos.password !== inputFieldInfos.confirmPassword) {
            setError('Password and confirm password did not match');
            return;
        }
        else if (!error) {
            registration(inputFieldInfos.email, inputFieldInfos.password, inputFieldInfos.name);
        }
    }
    return (
        <div className='min-vh-100 d-flex justify-content-center align-items-center bg-success bg-opacity-10'>
            <div className='bg-dark bg-opacity-25 registration-content'>
                <form onSubmit={handleRegistration} className="mb-3">
                    <div className='mb-4'>
                        <input
                            title='Your Name'
                            name='name'
                            onChange={handleOnChange}
                            onFocus={() => setInputActive('name')}
                            onBlur={() => setInputActive('')}
                            type="text"
                            onClick={() => {
                                setError('');
                                setBackendError('');
                                setSuccess('');
                            }}
                            className={`${inputActive === 'name' && "inputActive"} input-bg border-0 p-3`}
                            placeholder="Your Name"
                            autoComplete="on"
                            required
                        />
                    </div>
                    <div className='mb-4'>
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
                    <div className='mb-4'>
                        <div className='password-field-registration'>
                            <input
                                title='Password'
                                name='password'
                                onChange={handleOnChange}
                                onFocus={() => setInputActive('password')}
                                onBlur={() => setInputActive('')}
                                onClick={() => {
                                    setError('');
                                    setBackendError('');
                                    setSuccess('');
                                }}
                                type={showPassword ? 'text' : 'password'}
                                className={`${inputActive === 'password' && "inputActive"} input-bg border-0 p-3`}
                                placeholder="Password"
                                autoComplete="on"
                                required
                            />
                            {showPassword ?
                                <i onClick={showHideTogglePassword} className="fa-solid fa-eye-slash show-hide-toggle"></i>
                                :
                                <i onClick={showHideTogglePassword} className="fa-solid fa-eye show-hide-toggle"></i>}
                        </div>
                    </div>
                    <div className='mb-5'>
                        <div className='password-field-registration'>
                            <input
                                title='Confirm Password'
                                name='confirmPassword'
                                onChange={handleOnChange}
                                onFocus={() => setInputActive('confirmPassword')}
                                onBlur={() => setInputActive('')}
                                onClick={() => {
                                    setError('');
                                    setBackendError('');
                                    setSuccess('');
                                }}
                                type={showConfirmPassword ? 'text' : 'password'}
                                className={`${inputActive === 'confirmPassword' && "inputActive"} input-bg border-0 p-3`}
                                placeholder="Confirm Password"
                                autoComplete="on"
                                required
                            />
                            {showConfirmPassword ?
                                <i onClick={showHideToggleConfirmPassword} className="fa-solid fa-eye-slash show-hide-toggle"></i>
                                :
                                <i onClick={showHideToggleConfirmPassword} className="fa-solid fa-eye show-hide-toggle"></i>}
                        </div>
                    </div>
                    <button type='submit' className='form-btn p-3'>R e g i s t e r</button>
                </form>
                <Link to='/login' className='login-divert d-block text-center'>Old User? Click to Login</Link>
                {backendError && (<p className='mt-3 text-danger fw-bold'>{backendError}</p>)}
                {error && (<p className='mt-3 text-danger fw-bold'>{error}</p>)}
                {success && (<p className='mt-3 text-success fw-bold'>{success}</p>)}
            </div >
        </div >
    );
};

export default withAuthentication(Registration);