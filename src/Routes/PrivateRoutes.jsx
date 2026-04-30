// eslint-disable-next-line no-unused-vars
import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRoutes = ({children}) => {
    const { user } = useAuth()
    const location = useLocation();
    // console.log(location);

    if (user && user?.email) {
        return children;
    }
    return <Navigate state={location.pathname} to='/auth/login'></Navigate>
};

export default PrivateRoutes;