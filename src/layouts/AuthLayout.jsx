import React from 'react';
import { Outlet } from 'react-router';
import AuthImage from "../assets/AuthImage.webp";
import LifeStreamlogo from '../pages/shared/LifeStream/LifeStreamlogo';
const AuthLayout = () => {
    return (
       <div className=" p-12 bg-base-200">
        <div>
            <LifeStreamlogo></LifeStreamlogo>
        </div>
  <div className="hero-content flex-col lg:flex-row-reverse">
   <div className='flex-1'>
     <img
      src={AuthImage}
      className="max-w-sm rounded-lg"
    />
   </div>
    <div className='flex-1'>
      <Outlet></Outlet>
      
    </div>
  </div>
</div>
    );
};

export default AuthLayout;