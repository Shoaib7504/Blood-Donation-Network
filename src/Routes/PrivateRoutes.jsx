// eslint-disable-next-line no-unused-vars
import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router';
import LoadingSpiner from '../Components/LoadingSpiner';

const PrivateRoutes = ({children}) => {
    const { user, loading } = useAuth()
    const location = useLocation();
    // console.log(location);

    if (loading) {
        return <LoadingSpiner></LoadingSpiner>
    }

    if (user && user?.email) {
        return children;
    }
    return <Navigate state={location.pathname} to='/login'></Navigate>
};

export default PrivateRoutes;