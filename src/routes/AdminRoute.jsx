import React from 'react';
import useAuth from '../hooks/useAuth';
import Loading from '../pages/Loading';
import useRole from '../hooks/useRole';
import { Navigate } from 'react-router';

const AdminRoute = ({children}) => {
    const {user , loading} = useAuth();
    const {role,roleLoading} = useRole();

    if(loading || roleLoading) {
        return <Loading></Loading>
    }

    if(!user || role !=='admin'){
        return <Navigate state={location.pathname} to="/forbidden"></Navigate>
    }
    return children;
};

export default AdminRoute;