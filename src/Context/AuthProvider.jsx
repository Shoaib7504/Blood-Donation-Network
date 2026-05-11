// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile
} from "firebase/auth";
import app from '../Firebase/firebase.config';
import { toast } from 'react-toastify';

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); //  was in the cleanup — moved here so it fires after Firebase confirms auth state
    });

    return () => {
      unsubscribe(); //  just unsubscribe on cleanup, don't touch loading here
    };
  }, []);

  const SignInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const Logout = () => {
    return signOut(auth)
      .then(() => {
        toast.success("Logout successful");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const LoginWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const updateUserProfile = (profile) => {
    return updateProfile(auth.currentUser, profile);
  };

  const authInfo = {
    createUser,
    SignInUser,
    user,
    setUser,
    loading,
    setLoading,
    Logout,
    LoginWithGoogle,
    updateUserProfile,
  };

  return (
    <AuthContext value={authInfo}>
      {children}
    </AuthContext>
  );
};

export default AuthProvider;