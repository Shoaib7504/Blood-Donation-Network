// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from '../Firebase/firebase.config';
import { toast } from 'react-toastify';
const provider = new GoogleAuthProvider();
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);
    const createUser = (email, password) => {
        // setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }
    // Set an authentication state observer and get user data
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            // console.log(currentUser);

        });
        return () => {
            setLoading(false);
            unsubscribe();
        }
    }, [])

    const SignInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const Logout = () => {
        return signOut(auth).then(() => {
           toast.success("Login successful")
        }).catch((error) => {
            console.log(error);


        });
    }

    const LoginWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)

    }

    const authInfo = {
        createUser,
        SignInUser,
        user,
        setUser,
        loading,
        setLoading,
        Logout,
        LoginWithGoogle
    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;