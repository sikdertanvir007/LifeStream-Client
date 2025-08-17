import React from 'react';
import { Outlet } from 'react-router';
import LifeStreamlogo from '../pages/shared/LifeStream/LifeStreamlogo';
import { NavLink } from 'react-router';
import { FaHome } from "react-icons/fa";
import { RiHandHeartLine } from "react-icons/ri";
import { MdOutlinePayments } from "react-icons/md";
import useRole from '../hooks/useRole'; // 👈 import your hook
import Loading from '../pages/Loading'; 
import {  MdPeople, MdManageSearch, MdDashboardCustomize } from 'react-icons/md';
import { FaUserEdit } from 'react-icons/fa';
import { RiFileList2Line } from 'react-icons/ri';
import { FaMedal } from "react-icons/fa";// Optional: loading spinner

const DashboardLayout = () => {
  const { role, roleLoading } = useRole();

  if (roleLoading) return <Loading></Loading>;

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none">
            <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>
        </div>

        {/* Page content */}
        <Outlet />
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay" />
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 gap-y-6">
          <LifeStreamlogo />

          <li>
            <NavLink to="/dashboard/home" className={({ isActive }) => isActive ? 'btn bg-red-500 rounded-md text-white font-bold' : ''}>
              <FaHome className="inline mr-2" />
              Home
            </NavLink>
          </li>

          
          
              <li>
                <NavLink to="/dashboard/my-donation-requests" className={({ isActive }) => isActive ? 'btn bg-red-500 rounded-md text-white font-bold' : ''}>
                  <RiHandHeartLine className="inline mr-2" />
                  Donation Requests
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/funding-history" className={({ isActive }) => isActive ? 'btn bg-red-500 rounded-md text-white font-bold' : ''}>
                  <MdOutlinePayments className="inline mr-2" />
                  Funding History
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/badges" className={({ isActive }) => isActive ? 'btn bg-red-500 rounded-md text-white font-bold' : ''}>
                  <FaMedal className="inline mr-2" />
                  Badges
                </NavLink>
              </li>
            

          {/* All roles */}
        <li>
  <NavLink to="/dashboard/profile" className={({ isActive }) => isActive ? 'btn bg-red-500 rounded-md text-white font-bold' : ''}>
    <FaUserEdit className="inline mr-2" />
    My Profile
  </NavLink>
</li>

{/* Admin-only links */}
{role === 'admin' && (
  <>
    <li>
      <NavLink to="/dashboard/all-users" className={({ isActive }) => isActive ? 'btn bg-red-500 rounded-md text-white font-bold' : ''}>
        <MdPeople className="inline mr-2" />
        All Users
      </NavLink>
    </li>
    <li>
      <NavLink to="/dashboard/all-blood-donation-request" className={({ isActive }) => isActive ? 'btn bg-red-500 rounded-md text-white font-bold' : ''}>
        <RiFileList2Line className="inline mr-2" />
        All Donation Requests
      </NavLink>
    </li>
    <li>
      <NavLink to="/dashboard/content-management" className={({ isActive }) => isActive ? 'btn bg-red-500 rounded-md text-white font-bold' : ''}>
        <MdDashboardCustomize className="inline mr-2" />
        Content Management
      </NavLink>
    </li>
  </>
)}

{/* Volunteer-only links */}
{role === 'volunteer' && (
  <>
    <li>
      <NavLink to="/dashboard/all-blood-donation-request" className={({ isActive }) => isActive ? 'btn bg-red-500 rounded-md text-white font-bold' : ''}>
        <RiFileList2Line className="inline mr-2" />
        All Donation Requests
      </NavLink>
    </li>
    <li>
      <NavLink to="/dashboard/content-management" className={({ isActive }) => isActive ? 'btn bg-red-500 rounded-md text-white font-bold' : ''}>
        <MdDashboardCustomize className="inline mr-2" />
        Content Management
      </NavLink>
    </li>
  </>
)}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
