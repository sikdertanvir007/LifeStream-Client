import React, { use } from 'react';

import { Navigate } from 'react-router';

import { useLocation } from 'react-router';
import Loading from '../pages/Loading';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({children}) => {
    const {user,loading} = useAuth();

    const location = useLocation();
    
if(loading){
    return <Loading></Loading>;
}


    if(user && user?.email){
        return children;
    }
    return <Navigate state={location.pathname} to="/login"></Navigate>
    
};

export default PrivateRoute;