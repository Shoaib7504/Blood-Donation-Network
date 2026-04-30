// eslint-disable-next-line no-unused-vars
import React, { use } from 'react';
import { AuthContext } from '../Context/AuthContext';

const useAuth = () => {
    const authInfo=use(AuthContext)
    return authInfo;
    
};

export default useAuth;