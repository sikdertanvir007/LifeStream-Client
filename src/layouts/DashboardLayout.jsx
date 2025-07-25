import React from 'react';
import { Outlet } from 'react-router';
import LifeStreamlogo from '../pages/shared/LifeStream/LifeStreamlogo';
import { NavLink } from 'react-router';
import { FaHome } from "react-icons/fa";
import { RiHandHeartLine } from "react-icons/ri";
import { MdOutlinePayments } from "react-icons/md";

const DashboardLayout = () => {
    return (
       <div className="drawer lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col ">
   
   
   
    {/* Navbar */}
    <div className="navbar bg-base-300 w-full lg:hidden">
      <div className="flex-none ">
        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-6 w-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
      <div className="mx-2 flex-1 px-2 lg:hidden">Navbar Title</div>
      
    </div>
    {/* Page content here */}
    <Outlet></Outlet>
    {/* Page content here */}
   
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 gap-y-6">
      {/* Sidebar content here */}
      <LifeStreamlogo></LifeStreamlogo>
      <li>
    <NavLink className={({isActive})=>(isActive ? 'btn bg-red-500 rounded-md  text-white font-bold  ' : '')} to="/dashboard/home">
      <FaHome className="inline mr-2" />
      Home
    </NavLink>
  </li>
  <li>
    <NavLink className={({isActive})=>(isActive ? 'btn bg-red-500 rounded-md  text-white font-bold  ' : '')} to="/dashboard/my-donation-requests">
      <RiHandHeartLine className="inline mr-2" />
       Donation Requests
    </NavLink>
  </li>
  <li>
    <NavLink className={({isActive})=>(isActive ? 'btn bg-red-500 rounded-md  text-white font-bold ' : '')} to="/dashboard/funding-history">
      <MdOutlinePayments className="inline mr-2" />
       Funding History
    </NavLink>
  </li>
  <li>
    <NavLink className={({isActive})=>(isActive ? 'btn bg-red-500 rounded-md  text-white font-bold ' : '')} to="/dashboard/profile">
      <MdOutlinePayments className="inline mr-2" />
      My Profile
    </NavLink>
  </li>
  <li>
    <NavLink className={({isActive})=>(isActive ? 'btn bg-red-500 rounded-md  text-white font-bold ' : '')} to="/dashboard/all-users">
      <MdOutlinePayments className="inline mr-2" />
      All Users
    </NavLink>
  </li>
      
    </ul>
  </div>
</div>
    );
};

export default DashboardLayout;