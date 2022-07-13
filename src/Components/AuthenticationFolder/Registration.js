import React from 'react';
import { Link } from 'react-router-dom';
import withAuthentication from '../../HOC/withAuthentication';
import useAuthValues from '../../Hooks/useAuthValues';
import './Registration.css';

const Registration = (props) => {
    const { inputActive, setInputActive, inputFieldInfos, showHideTogglePassword, showHideToggleConfirmPassword, handleOnChange, showPassword, showConfirmPassword } = props;

    const { registrationUser, setError, error, setBackendError, backendError, setSuccess, success } = useAuthValues();

    const handleRegistration = (e) => {
        e.preventDefault();
        if (inputFieldInfos.password !== inputFieldInfos.confirmPassword) {
            setError('Password and confirm password did not match');
            return;
        }
        else if (!error) {
            registrationUser(inputFieldInfos.email, inputFieldInfos.username, inputFieldInfos.name, inputFieldInfos.age, inputFieldInfos.gender, inputFieldInfos.country, inputFieldInfos.device, inputFieldInfos.password);
        }
    }
    return (
        <>
            <div className='d-none d-lg-block'>
                <div className='min-vh-100 d-flex justify-content-center align-items-center bg-success bg-opacity-10'>
                    <div className='bg-dark bg-opacity-25 add-another-user-content'>
                        <form onSubmit={handleRegistration} className="mb-3">
                            <div className='d-flex justify-content-between mb-4'>
                                <input
                                    title='Users Name'
                                    name='name'
                                    style={{ 'width': '73%' }}
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
                                <input
                                    title='Age'
                                    name='age'
                                    style={{ 'width': '23%' }}
                                    onChange={handleOnChange}
                                    onFocus={() => setInputActive('age')}
                                    onBlur={() => setInputActive('')}
                                    type="number"
                                    onClick={() => {
                                        setError('');
                                        setBackendError('');
                                        setSuccess('');
                                    }}
                                    className={`${inputActive === 'age' && "inputActive"} input-bg border-0 p-3`}
                                    placeholder="Age"
                                    autoComplete="on"
                                    required
                                />
                            </div>
                            <div className='d-flex justify-content-between mb-4'>
                                <select
                                    title='Gender'
                                    name="gender"
                                    style={{ 'width': '30%' }}
                                    onChange={handleOnChange}
                                    onFocus={() => setInputActive('gender')}
                                    onBlur={() => setInputActive('')}
                                    onClick={() => {
                                        setError('');
                                        setSuccess('');
                                    }}
                                    type="text"
                                    className={`${inputActive === 'gender' && "inputActive"} border-0 p-3 input-bg form-select`}
                                    required
                                >
                                    <option value="">Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Others</option>
                                </select>
                                <input
                                    title='Users Country'
                                    name='country'
                                    style={{ 'width': '30%' }}
                                    onChange={handleOnChange}
                                    onFocus={() => setInputActive('country')}
                                    onBlur={() => setInputActive('')}
                                    type="text"
                                    onClick={() => {
                                        setError('');
                                        setBackendError('');
                                        setSuccess('');
                                    }}
                                    className={`${inputActive === 'country' && "inputActive"} input-bg border-0 p-3`}
                                    placeholder="Your Country"
                                    autoComplete="on"
                                    required
                                />
                                <input
                                    title='Users Device'
                                    name='device'
                                    style={{ 'width': '30%' }}
                                    onChange={handleOnChange}
                                    onFocus={() => setInputActive('device')}
                                    onBlur={() => setInputActive('')}
                                    type="text"
                                    onClick={() => {
                                        setError('');
                                        setBackendError('');
                                        setSuccess('');
                                    }}
                                    className={`${inputActive === 'device' && "inputActive"} input-bg border-0 p-3`}
                                    placeholder="Your Device"
                                    autoComplete="on"
                                    required
                                />
                            </div>
                            <div className='d-flex justify-content-between mb-4'>
                                <input
                                    title='Users Username'
                                    name='username'
                                    style={{ 'width': '30%' }}
                                    onChange={handleOnChange}
                                    onFocus={() => setInputActive('username')}
                                    onBlur={() => setInputActive('')}
                                    type="text"
                                    onClick={() => {
                                        setError('');
                                        setBackendError('');
                                        setSuccess('');
                                    }}
                                    className={`${inputActive === 'username' && "inputActive"} input-bg border-0 p-3`}
                                    placeholder="Username"
                                    autoComplete="on"
                                    required
                                />
                                <input
                                    title='Users Email Id'
                                    name='email'
                                    style={{ 'width': '66%' }}
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
                                    placeholder="Email Id"
                                    autoComplete="on"
                                    required
                                />
                            </div>
                            <div className='d-flex justify-content-between mb-5'>
                                <div className='password-field-registration'>
                                    <input
                                        title='Users Password'
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
                        {backendError && (<p className='mt-3 text-danger text-center fw-bold'>{backendError}</p>)}
                        {error && (<p className='mt-3 text-danger text-center fw-bold'>{error}</p>)}
                        {success && (<p className='mt-3 text-success text-center fw-bold'>{success}</p>)}
                    </div >
                </div >
            </div>

            <div className='d-lg-none'>
                <div className='min-vh-100 py-5 d-flex justify-content-center align-items-center bg-success bg-opacity-10'>
                    <div className='bg-dark bg-opacity-25 add-another-user-content'>
                        <form onSubmit={handleRegistration} className="mb-3">
                            <div className='mb-4'>
                                <input
                                    title='Users Name'
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
                                    title='Age'
                                    name='age'
                                    onChange={handleOnChange}
                                    onFocus={() => setInputActive('age')}
                                    onBlur={() => setInputActive('')}
                                    type="number"
                                    onClick={() => {
                                        setError('');
                                        setBackendError('');
                                        setSuccess('');
                                    }}
                                    className={`${inputActive === 'age' && "inputActive"} input-bg border-0 p-3`}
                                    placeholder="Age"
                                    autoComplete="on"
                                    required
                                />
                            </div>
                            <div className='mb-4'>
                                <select
                                    title='Gender'
                                    name="gender"
                                    onChange={handleOnChange}
                                    onFocus={() => setInputActive('gender')}
                                    onBlur={() => setInputActive('')}
                                    onClick={() => {
                                        setError('');
                                        setSuccess('');
                                    }}
                                    type="text"
                                    className={`${inputActive === 'gender' && "inputActive"} border-0 p-3 input-bg form-select`}
                                    required
                                >
                                    <option value="">Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Others</option>
                                </select>
                            </div>
                            <div className='mb-4'>
                                <input
                                    title='Users Country'
                                    name='country'
                                    onChange={handleOnChange}
                                    onFocus={() => setInputActive('country')}
                                    onBlur={() => setInputActive('')}
                                    type="text"
                                    onClick={() => {
                                        setError('');
                                        setBackendError('');
                                        setSuccess('');
                                    }}
                                    className={`${inputActive === 'country' && "inputActive"} input-bg border-0 p-3`}
                                    placeholder="Your Country"
                                    autoComplete="on"
                                    required
                                />
                            </div>
                            <div className='mb-4'>
                                <input
                                    title='Users Device'
                                    name='device'
                                    onChange={handleOnChange}
                                    onFocus={() => setInputActive('device')}
                                    onBlur={() => setInputActive('')}
                                    type="text"
                                    onClick={() => {
                                        setError('');
                                        setBackendError('');
                                        setSuccess('');
                                    }}
                                    className={`${inputActive === 'device' && "inputActive"} input-bg border-0 p-3`}
                                    placeholder="Your Device"
                                    autoComplete="on"
                                    required
                                />
                            </div>
                            <div className='mb-4'>
                                <input
                                    title='Users Username'
                                    name='username'
                                    onChange={handleOnChange}
                                    onFocus={() => setInputActive('username')}
                                    onBlur={() => setInputActive('')}
                                    type="text"
                                    onClick={() => {
                                        setError('');
                                        setBackendError('');
                                        setSuccess('');
                                    }}
                                    className={`${inputActive === 'username' && "inputActive"} input-bg border-0 p-3`}
                                    placeholder="Username"
                                    autoComplete="on"
                                    required
                                />
                            </div>
                            <div className='mb-4'>
                                <input
                                    title='Users Email Id'
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
                                    placeholder="Email Id"
                                    autoComplete="on"
                                    required
                                />
                            </div>
                            <div className='mb-4'>
                                <div className='password-field-registration'>
                                    <input
                                        title='Users Password'
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
                        {backendError && (<p className='mt-3 text-danger text-center fw-bold'>{backendError}</p>)}
                        {error && (<p className='mt-3 text-danger text-center fw-bold'>{error}</p>)}
                        {success && (<p className='mt-3 text-success text-center fw-bold'>{success}</p>)}
                    </div >
                </div >
            </div>
        </>
    );
};

export default withAuthentication(Registration);