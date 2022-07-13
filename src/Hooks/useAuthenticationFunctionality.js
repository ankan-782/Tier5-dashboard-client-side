import initializeAuthentication from '../FirebaseConfig/firebase.init';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, getIdToken } from 'firebase/auth';
import { useEffect, useState } from 'react';

//initialize Authentication app
initializeAuthentication();

const useAuthenticationFunctionality = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [backendError, setBackendError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [admin, setAdmin] = useState(false);
    const [token, setToken] = useState('');

    //authentication functionality of firebase and mongoDb
    const auth = getAuth();

    // observe whether user auth state changed or not
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                getIdToken(user)
                    .then(idToken => {
                        setToken(idToken);
                    })
            } else {
                setUser({});
            }
            setIsLoading(false);
        });
        return () => unsubscribe;
    }, [auth]);


    // Sign in or login
    const loginUser = (email, password, location, navigate) => {
        setIsLoading(true);

        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                // alert('successfully logged in');
                const destination = location?.state?.from || '/';
                console.log(destination);
                navigate(destination);
                setError('');
                setBackendError('');
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => setIsLoading(false));
    }


    // Sign up or Registration User
    const registrationUser = (email, username, name, age, gender, country, device, password, navigate) => {
        setIsLoading(true);
        //save user to the database when registration
        saveUser(email, username, name, age, gender, country, device, 'POST');

        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                // alert('successfully registered');
                setError('');
                setBackendError('');
                setSuccess('User added successfully');

                //save user by email & name immediately when user creation
                const newUser = { email: email, displayName: name };
                setUser(newUser);

                // update name after creation
                updateProfile(auth.currentUser, {
                    displayName: name,
                }).then(() => {
                    // Profile updated!
                    // ...
                }).catch((error) => {
                    setError(error.message);
                });

                navigate('/');
            })


            .catch((error) => {
                if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
                    setError('');
                }
                else {
                    setError(error.message);
                }
            })
            .finally(() => setIsLoading(false));
    }

    // Add another User
    const addAnotherUser = (email, username, name, age, gender, country, device, password) => {
        setIsLoading(true);

        // add user to the database from dashboard
        const user = { email, username, name, age, gender, country, device, password };
        fetch('http://localhost:5000/users/addAnotherUser', {
            method: 'POST',
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
                    setSuccess('User Added Successfully');
                    console.log('success', data);
                }
            })
            .catch(error => console.error('error', error))
            .finally(() => setIsLoading(false));
    }


    //log out functionality
    const logOutUser = () => {
        setIsLoading(true);
        signOut(auth)
            .then(() => {
                // Sign-out successful.
            }).catch((error) => {
                setError(error.message);
            })
            .finally(() => setIsLoading(false));
    }


    // save user to the database when registration
    const saveUser = (email, username, name, age, gender, country, device, method) => {
        const user = { email, username, name, age, gender, country, device };
        fetch('http://localhost:5000/users', {
            method: method,
            headers: {
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
                    setSuccess('User Added Successfully');
                    console.log('success', data);
                }
            })
            .catch(error => console.error('error', error))
    }

    useEffect(() => {
        fetch(`http://localhost:5000/users/checkAdmin/${user.email}`)
            .then(res => res.json())
            .then(data => setAdmin(data.admin));
    }, [user.email])


    return {
        user,
        setUser,
        admin,
        error,
        setError,
        backendError,
        setBackendError,
        success,
        setSuccess,
        isLoading,
        setIsLoading,
        registrationUser,
        addAnotherUser,
        loginUser,
        logOutUser,
        token,
    };
}

export default useAuthenticationFunctionality;