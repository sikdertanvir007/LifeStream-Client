import React from 'react';
import logo from '../../../../public/logo.png.png';
import { Link } from 'react-router';
const LifeStreamlogo = () => {
    return (
       <Link to="/">
        <div className='flex items-center'>
            <img className='w-20'  src={logo} alt="" />
            <h1 className='text-3xl font-bold text-red-600 '>LifeStream</h1>
        </div>
       </Link>
    );
};

export default LifeStreamlogo;