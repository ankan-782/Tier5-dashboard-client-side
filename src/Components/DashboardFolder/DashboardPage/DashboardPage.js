import React, { useEffect, useState } from 'react';
import withAuthentication from '../../../HOC/withAuthentication';
import useAuthValues from '../../../Hooks/useAuthValues';
import './DashboardPage.css';

const DashboardPage = (props) => {
    const { inputActive, setInputActive } = props;
    const { setError, error, setBackendError, backendError, setSuccess, success } = useAuthValues();
    const [users, setUsers] = useState([]);
    var [page, setPage] = useState(0);
    const [specificUser, setSpecificUser] = useState({});
    const [size, setSize] = useState(15);
    const [property, setProperty] = useState('name');
    const [order, setOrder] = useState(1);

    //load all users data except admin users
    useEffect(() => {
        fetch(`http://localhost:5000/users?page=${page}&&size=${size}&&property=${property}&&order=${order}`)
            .then(res => res.json())
            .then(data => setUsers(data));
    }, [success, page, size, property, order]);

    // load specific user for update
    const updateUser = (id) => {
        fetch(`http://localhost:5000/users/${id}`)
            .then(res => res.json())
            .then(data => setSpecificUser(data));
    }

    //delete specific user
    const deleteUser = (id) => {
        const proceed = window.confirm('Are you sure, you want to delete this user?');
        if (proceed) {
            fetch(`http://localhost:5000/users/delete/${id}`, {
                method: "DELETE",
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        alert('User deleted successfully');
                        const remainingUsers = users.filter(user => user._id !== id);
                        setUsers(remainingUsers);
                    }
                });
        }
    }

    const handleNameOnChange = e => {
        const updatedName = e.target.value;
        const updatedUser = { ...specificUser, name: updatedName };
        setSpecificUser(updatedUser);
    }
    const handleAgeOnChange = e => {
        const updatedAge = e.target.value;
        const updatedUser = { ...specificUser, age: updatedAge };
        setSpecificUser(updatedUser);
    }
    const handleGenderOnChange = e => {
        const updatedGender = e.target.value;
        const updatedUser = { ...specificUser, gender: updatedGender };
        setSpecificUser(updatedUser);
    }
    const handleCountryOnChange = e => {
        const updatedCountry = e.target.value;
        const updatedUser = { ...specificUser, country: updatedCountry };
        setSpecificUser(updatedUser);
    }
    const handleDeviceOnChange = e => {
        const updatedDevice = e.target.value;
        const updatedUser = { ...specificUser, device: updatedDevice };
        setSpecificUser(updatedUser);
    }
    const handleUsernameOnChange = e => {
        const updatedUsername = e.target.value;
        const updatedUser = { ...specificUser, username: updatedUsername };
        setSpecificUser(updatedUser);
    }
    const handleEmailOnChange = e => {
        const updatedEmail = e.target.value;
        const updatedUser = { ...specificUser, email: updatedEmail };
        setSpecificUser(updatedUser);
    }

    const handleUpdateUser = (e) => {
        e.preventDefault();
        fetch(`http://localhost:5000/users/update/${specificUser._id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(specificUser)
        })
            .then(res => res.json())
            .then(data => {
                if (data.message) {
                    setBackendError(data.message);
                }
                else {
                    setSuccess('User Updated Successfully');
                    console.log('success', data);
                }
            })
    }
    return (
        <>
            <div className='min-vh-100 bg-success bg-opacity-10'>
                <div className='container py-4'>
                    <div>
                        {users.length === 0
                            ? (
                                <div>
                                    <h1 className="text-center mt-2">No Data Found</h1>
                                </div>
                            )
                            : <div>
                                <div className='d-flex justify-content-between align-items-center mb-3'>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <p className='mb-0 me-3'>Rows per page: </p>
                                        <div class="btn-group">
                                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">{size}</button>
                                            <ul class="dropdown-menu">
                                                <li className='dropdown-item' onClick={() => setSize(10)}>10</li>
                                                <li className='dropdown-item' onClick={() => setSize(15)}>15</li>
                                                <li className='dropdown-item' onClick={() => setSize(20)}>20</li>
                                            </ul>
                                        </div>
                                    </div>

                                    <nav aria-label="Page navigation example">
                                        <ul className="pagination">
                                            <li className="page-item">
                                                <button
                                                    className="page-link"
                                                    aria-label="Previous"
                                                    onClick={() => {
                                                        if (page < 1) {
                                                            setPage(0);
                                                        }
                                                        else {
                                                            setPage(page = page - 1);
                                                        }
                                                        console.log(page);
                                                    }}
                                                >
                                                    <span aria-hidden="true">&laquo;</span> Previous
                                                </button>
                                            </li>
                                            <li className="page-item">
                                                <button
                                                    className="page-link"
                                                    aria-label="Next"
                                                    onClick={() => {
                                                        setPage(page = page + 1);
                                                        console.log(page);
                                                    }}
                                                >
                                                    Next <span aria-hidden="true">&raquo;</span>
                                                </button>
                                            </li>
                                        </ul>
                                    </nav>

                                    <div>
                                        <p className='d-inline mb-0 me-2'>Sort by:</p>
                                        <div class="btn-group me-2">
                                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">{property}</button>
                                            <ul class="dropdown-menu">
                                                <li className='dropdown-item' onClick={() => setProperty('name')}>name</li>
                                                <li className='dropdown-item' onClick={() => setProperty('age')}>age</li>
                                                <li className='dropdown-item' onClick={() => setProperty('gender')}>gender</li>
                                            </ul>
                                        </div>
                                        <button title='Reorder user ascending style by name' className="btn btn-order rounded-3 me-2" onClick={() => setOrder(-1)}><i class="fa-solid fa-arrow-up-long text-dark"></i></button>
                                        <button title='Reorder user ascending style by name' className="btn btn-order rounded-3 me-4" onClick={() => setOrder(1)}><i class="fa-solid fa-arrow-down-long text-dark"></i></button>
                                        <p className='d-inline-block mb-0'>Page No: {page + 1}</p>
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th scope="col">Name</th>
                                                <th scope="col">Username</th>
                                                <th scope="col">Email ID</th>
                                                <th scope="col">Age</th>
                                                <th scope="col">Gender</th>
                                                <th scope="col">Country</th>
                                                <th scope="col">Device</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                users.map(user => (
                                                    <tr key={user._id}>
                                                        <th scope="row">{user.name}</th>
                                                        <td>{user.username}</td>
                                                        <td>{user.email}</td>
                                                        <td>{user.age}</td>
                                                        <td>{user.gender}</td>
                                                        <td>{user.country}</td>
                                                        <td>{user.device}</td>
                                                        <td>
                                                            <button title='Delete user' className="btn btn-danger rounded-3 me-2" onClick={() => deleteUser(user._id)}><i className="fas fa-trash-alt"></i></button>
                                                            <button title='Update user' className="btn btn-warning rounded-3" onClick={() => updateUser(user._id)} data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="fa-solid fa-gear"></i></button>
                                                            {/* modal */}
                                                            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                                <div className="modal-dialog modal-dialog-centered">
                                                                    <div className="modal-content">
                                                                        <div className="modal-header">
                                                                            <h5>Update The User of Email ID: {user.email}</h5>
                                                                            <button type="button" className="me-2 btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                        </div>
                                                                        <div className="modal-body bg-dark bg-opacity-25">
                                                                            <div className='d-none d-lg-block'>
                                                                                <form onSubmit={handleUpdateUser} className="mb-3">
                                                                                    <div className='d-flex justify-content-between mb-4'>
                                                                                        <div style={{ 'width': '73%' }}>
                                                                                            <label htmlFor="name" className='mb-2'>Name</label>
                                                                                            <input
                                                                                                title='Users Name'
                                                                                                name='name'
                                                                                                value={specificUser.name || ''}
                                                                                                onChange={handleNameOnChange}
                                                                                                onFocus={() => setInputActive('name')}
                                                                                                onBlur={() => setInputActive('')}
                                                                                                type="text"
                                                                                                onClick={() => {
                                                                                                    setError('');
                                                                                                    setBackendError('');
                                                                                                    setSuccess('');
                                                                                                }}
                                                                                                className={`${inputActive === 'name' && "inputActive"} input-bg border-0 p-3`}
                                                                                                placeholder="Users Name"
                                                                                                autoComplete="on"
                                                                                                required
                                                                                            />
                                                                                        </div>
                                                                                        <div style={{ 'width': '23%' }}>
                                                                                            <label htmlFor="age" className='mb-2'>Age</label>
                                                                                            <input
                                                                                                title='Age'
                                                                                                name='age'
                                                                                                value={specificUser.age || ''}
                                                                                                onChange={handleAgeOnChange}
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
                                                                                    </div>
                                                                                    <div className='d-flex justify-content-between mb-4'>
                                                                                        <div style={{ 'width': '30%' }}>
                                                                                            <label htmlFor="gender" className='mb-2'>Gender</label>
                                                                                            <select
                                                                                                title='Gender'
                                                                                                name="gender"
                                                                                                value={specificUser.gender || ''}
                                                                                                onChange={handleGenderOnChange}
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
                                                                                        <div style={{ 'width': '30%' }}>
                                                                                            <label htmlFor="country" className='mb-2'>Country</label>
                                                                                            <input
                                                                                                title='Users Country'
                                                                                                name='country'
                                                                                                value={specificUser.country || ''}
                                                                                                onChange={handleCountryOnChange}
                                                                                                onFocus={() => setInputActive('country')}
                                                                                                onBlur={() => setInputActive('')}
                                                                                                type="text"
                                                                                                onClick={() => {
                                                                                                    setError('');
                                                                                                    setBackendError('');
                                                                                                    setSuccess('');
                                                                                                }}
                                                                                                className={`${inputActive === 'country' && "inputActive"} input-bg border-0 p-3`}
                                                                                                placeholder="Users Country"
                                                                                                autoComplete="on"
                                                                                                required
                                                                                            />
                                                                                        </div>
                                                                                        <div style={{ 'width': '30%' }}>
                                                                                            <label htmlFor="device" className='mb-2'>Device</label>
                                                                                            <input
                                                                                                title='Users Device'
                                                                                                name='device'
                                                                                                value={specificUser.device || ''}
                                                                                                onChange={handleDeviceOnChange}
                                                                                                onFocus={() => setInputActive('device')}
                                                                                                onBlur={() => setInputActive('')}
                                                                                                type="text"
                                                                                                onClick={() => {
                                                                                                    setError('');
                                                                                                    setBackendError('');
                                                                                                    setSuccess('');
                                                                                                }}
                                                                                                className={`${inputActive === 'device' && "inputActive"} input-bg border-0 p-3`}
                                                                                                placeholder="Users Device"
                                                                                                autoComplete="on"
                                                                                                required
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className='d-flex justify-content-between mb-5'>
                                                                                        <div style={{ 'width': '30%' }}>
                                                                                            <label htmlFor="username" className='mb-2'>Username</label>
                                                                                            <input
                                                                                                title='Users Username'
                                                                                                name='username'
                                                                                                value={specificUser.username || ''}
                                                                                                onChange={handleUsernameOnChange}
                                                                                                onFocus={() => setInputActive('username')}
                                                                                                onBlur={() => setInputActive('')}
                                                                                                type="text"
                                                                                                onClick={() => {
                                                                                                    setError('');
                                                                                                    setBackendError('');
                                                                                                    setSuccess('');
                                                                                                }}
                                                                                                className={`${inputActive === 'username' && "inputActive"} input-bg border-0 p-3`}
                                                                                                placeholder="Users Username"
                                                                                                autoComplete="on"
                                                                                                required
                                                                                            />
                                                                                        </div>
                                                                                        <div style={{ 'width': '66%' }}>
                                                                                            <label htmlFor="email" className='mb-2'>Email Id</label>
                                                                                            <input
                                                                                                title='Users Email Id'
                                                                                                name='email'
                                                                                                value={specificUser.email || ''}
                                                                                                onChange={handleEmailOnChange}
                                                                                                onFocus={() => setInputActive('email')}
                                                                                                onBlur={() => setInputActive('')}
                                                                                                type="email"
                                                                                                onClick={() => {
                                                                                                    setError('');
                                                                                                    setBackendError('');
                                                                                                    setSuccess('');
                                                                                                }}
                                                                                                className={`${inputActive === 'email' && "inputActive"} input-bg border-0 p-3`}
                                                                                                placeholder="Users Email Id"
                                                                                                autoComplete="on"
                                                                                                required
                                                                                            />
                                                                                        </div>
                                                                                    </div>
                                                                                    <button type='submit' className='form-btn p-3'>U p d a t e</button>
                                                                                </form>
                                                                                {backendError && (<p className='mt-3 text-danger text-center fw-bold'>{backendError}</p>)}
                                                                                {error && (<p className='mt-3 text-danger text-center fw-bold'>{error}</p>)}
                                                                                {success && (<p className='mt-3 text-success text-center fw-bold'>{success}</p>)}
                                                                            </div>

                                                                            <div className='d-lg-none'>
                                                                                <form onSubmit={handleUpdateUser} className="mb-3">
                                                                                    <div className='mb-4'>
                                                                                        <label htmlFor="name" className='mb-2'>Name</label>
                                                                                        <input
                                                                                            title='Users Name'
                                                                                            name='name'
                                                                                            value={specificUser.name || ''}
                                                                                            onChange={handleNameOnChange}
                                                                                            onFocus={() => setInputActive('name')}
                                                                                            onBlur={() => setInputActive('')}
                                                                                            type="text"
                                                                                            onClick={() => {
                                                                                                setError('');
                                                                                                setBackendError('');
                                                                                                setSuccess('');
                                                                                            }}
                                                                                            className={`${inputActive === 'name' && "inputActive"} input-bg border-0 p-3`}
                                                                                            placeholder="Users Name"
                                                                                            autoComplete="on"
                                                                                            required
                                                                                        />
                                                                                    </div>
                                                                                    <div className='mb-4'>
                                                                                        <label htmlFor="age" className='mb-2'>Age</label>
                                                                                        <input
                                                                                            title='Age'
                                                                                            name='age'
                                                                                            value={specificUser.age || ''}
                                                                                            onChange={handleAgeOnChange}
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
                                                                                        <label htmlFor="gender" className='mb-2'>Gender</label>
                                                                                        <select
                                                                                            title='Gender'
                                                                                            name="gender"
                                                                                            value={specificUser.gender || ''}
                                                                                            onChange={handleGenderOnChange}
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
                                                                                        <label htmlFor="country" className='mb-2'>Country</label>
                                                                                        <input
                                                                                            title='Users Country'
                                                                                            name='country'
                                                                                            value={specificUser.country || ''}
                                                                                            onChange={handleCountryOnChange}
                                                                                            onFocus={() => setInputActive('country')}
                                                                                            onBlur={() => setInputActive('')}
                                                                                            type="text"
                                                                                            onClick={() => {
                                                                                                setError('');
                                                                                                setBackendError('');
                                                                                                setSuccess('');
                                                                                            }}
                                                                                            className={`${inputActive === 'country' && "inputActive"} input-bg border-0 p-3`}
                                                                                            placeholder="Users Country"
                                                                                            autoComplete="on"
                                                                                            required
                                                                                        />
                                                                                    </div>
                                                                                    <div className='mb-4'>
                                                                                        <label htmlFor="device" className='mb-2'>Device</label>
                                                                                        <input
                                                                                            title='Users Device'
                                                                                            name='device'
                                                                                            value={specificUser.device || ''}
                                                                                            onChange={handleDeviceOnChange}
                                                                                            onFocus={() => setInputActive('device')}
                                                                                            onBlur={() => setInputActive('')}
                                                                                            type="text"
                                                                                            onClick={() => {
                                                                                                setError('');
                                                                                                setBackendError('');
                                                                                                setSuccess('');
                                                                                            }}
                                                                                            className={`${inputActive === 'device' && "inputActive"} input-bg border-0 p-3`}
                                                                                            placeholder="Users Device"
                                                                                            autoComplete="on"
                                                                                            required
                                                                                        />
                                                                                    </div>
                                                                                    <div className='mb-4'>
                                                                                        <label htmlFor="username" className='mb-2'>Username</label>
                                                                                        <input
                                                                                            title='Users Username'
                                                                                            name='username'
                                                                                            value={specificUser.username || ''}
                                                                                            onChange={handleUsernameOnChange}
                                                                                            onFocus={() => setInputActive('username')}
                                                                                            onBlur={() => setInputActive('')}
                                                                                            type="text"
                                                                                            onClick={() => {
                                                                                                setError('');
                                                                                                setBackendError('');
                                                                                                setSuccess('');
                                                                                            }}
                                                                                            className={`${inputActive === 'username' && "inputActive"} input-bg border-0 p-3`}
                                                                                            placeholder="Users Username"
                                                                                            autoComplete="on"
                                                                                            required
                                                                                        />
                                                                                    </div>
                                                                                    <div className='mb-5'>
                                                                                        <label htmlFor="email" className='mb-2'>Email Id</label>
                                                                                        <input
                                                                                            title='Users Email Id'
                                                                                            name='email'
                                                                                            value={specificUser.email || ''}
                                                                                            onChange={handleEmailOnChange}
                                                                                            onFocus={() => setInputActive('email')}
                                                                                            onBlur={() => setInputActive('')}
                                                                                            type="email"
                                                                                            onClick={() => {
                                                                                                setError('');
                                                                                                setBackendError('');
                                                                                                setSuccess('');
                                                                                            }}
                                                                                            className={`${inputActive === 'email' && "inputActive"} input-bg border-0 p-3`}
                                                                                            placeholder="Users Email Id"
                                                                                            autoComplete="on"
                                                                                            required
                                                                                        />
                                                                                    </div>
                                                                                    <button type='submit' className='form-btn p-3'>U p d a t e</button>
                                                                                </form>
                                                                                {backendError && (<p className='mt-3 text-danger text-center fw-bold'>{backendError}</p>)}
                                                                                {error && (<p className='mt-3 text-danger text-center fw-bold'>{error}</p>)}
                                                                                {success && (<p className='mt-3 text-success text-center fw-bold'>{success}</p>)}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default withAuthentication(DashboardPage);