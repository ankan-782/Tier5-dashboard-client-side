import initializeAuthentication from '../FirebaseConfig/firebase.init';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from 'firebase/auth';
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

    //authentication functionality of firebase and mongoDb
    const auth = getAuth();

    // observe whether user auth state changed or not
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
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
                navigate(destination);
                setError('');
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => setIsLoading(false));
    }


    // Sign up or Registration
    const registrationUser = (email, password, name, navigate) => {
        setIsLoading(true);
        //save city corporation user to the database
        saveUser(email, name, 'POST');

        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                // alert('successfully registered');
                setError('');
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
    const saveUser = (email, displayName, method) => {
        const user = { email, displayName };
        fetch('https://fierce-badlands-75560.herokuapp.com/users', {
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
                    console.log('success', data);
                }
            })
            .catch(error => console.error('error', error))
    }

    useEffect(() => {
        fetch(`https://fierce-badlands-75560.herokuapp.com/users/${user.email}`)
            .then(res => res.json())
            .then(data => setAdmin(data.admin));
    }, [user.email])


    return {
        user,
        setUser,
        error,
        setError,
        backendError,
        setBackendError,
        success,
        setSuccess,
        isLoading,
        setIsLoading,
        registrationUser,
        loginUser,
        logOutUser,
    };
}

export default useAuthenticationFunctionality;