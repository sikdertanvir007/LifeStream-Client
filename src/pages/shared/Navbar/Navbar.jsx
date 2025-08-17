import React from 'react';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { Link, NavLink } from 'react-router';
import { FaShoppingCart } from 'react-icons/fa';
import { FaUserXmark } from 'react-icons/fa6';
import LifeStreamlogo from '../LifeStream/LifeStreamlogo';
import ThemeToggle from '../../../contexts/ThemeToggle';


const Navbar = () => {
  
  const {user,logOut} = useAuth();
  const handleLogOut = () =>{
   //console.log("user trying to logout")
    logOut().then(() => {
   Swal.fire({
                                   title: 'You Logged Out!',
                                   icon: 'info',
                                   confirmButtonColor: '#6366F1',
                                 });
    }).catch((error) => {
       toast.error(error.message || "LogOut failed. Try again.");
    });
  }

    return (
       <div className="navbar bg-amber-200  shadow-md p-0 px-3 md:px-8 lg:px-10 fixed top-0 left-0 w-full z-50 mb-20">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="cursor-pointer mr-2 lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              <NavLink className={({isActive})=>(isActive ? 'btn bg-red-500 rounded-xl  text-white font-bold btn-sm ' : 'btn border border-red-500 text-red-500 font-bold rounded-xl btn-sm ')} to="/public-requests">Donation requests</NavLink>
              <NavLink className={({isActive})=>(isActive ? 'btn bg-red-500 rounded-xl  text-white font-bold btn-sm ' : 'btn border border-red-500 text-red-500 font-bold rounded-xl btn-sm ')} to="/blogs">Blog</NavLink>
              <NavLink className={({isActive})=>(isActive ? 'btn bg-red-500 rounded-xl  text-white font-bold btn-sm ' : 'btn border border-red-500 text-red-500 font-bold rounded-xl btn-sm ')} to="/about-us">About Us</NavLink>
              <NavLink className={({isActive})=>(isActive ? 'btn bg-red-500 rounded-xl  text-white font-bold btn-sm ' : 'btn border border-red-500 text-red-500 font-bold rounded-xl btn-sm ')} to="/contact-us">Contact Us</NavLink>
               {user && (
                <>  <NavLink className={({isActive})=>(isActive ? 'btn bg-red-500 rounded-xl  text-white font-bold btn-sm ' : 'btn border border-red-500 text-red-500 font-bold rounded-xl btn-sm ')} to="/dashboard/funding-history">
    Funding links
  </NavLink>
    <NavLink className={({isActive})=>(isActive ? 'btn bg-red-500 rounded-xl  text-white font-bold btn-sm ' : 'btn border border-red-500 text-red-500 font-bold rounded-xl btn-sm ')} to="/dashboard/badges">
    Badges & Achievements
  </NavLink>
  </>

)}
            

            
             
            </ul>
          </div>
          
          <LifeStreamlogo></LifeStreamlogo>
          
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-8">
            <NavLink  className={({isActive})=>(isActive ? 'btn bg-red-500 rounded-xl  text-white font-bold btn-sm ' : 'btn btn-outline rounded-xl btn-sm ')} to="/public-requests">Donation requests</NavLink>
            <NavLink  className={({isActive})=>(isActive ? 'btn bg-red-500 rounded-xl  text-white font-bold btn-sm' : 'btn btn-outline rounded-xl btn-sm ')} to="/blogs">Blog</NavLink>
            <NavLink  className={({isActive})=>(isActive ? 'btn bg-red-500 rounded-xl  text-white font-bold btn-sm' : 'btn btn-outline rounded-xl btn-sm ')} to="/about-us">About Us</NavLink>
            <NavLink  className={({isActive})=>(isActive ? 'btn bg-red-500 rounded-xl  text-white font-bold btn-sm' : 'btn btn-outline rounded-xl btn-sm ')} to="/contact-us">Contact Us</NavLink>
            {user && (
              <>
  <NavLink  className={({isActive})=>(isActive ? 'btn bg-red-500 rounded-xl  text-white font-bold btn-sm' : 'btn btn-outline rounded-xl btn-sm ')} to="/dashboard/funding-history">
     Funding links
  </NavLink>
  <NavLink  className={({isActive})=>(isActive ? 'btn bg-red-500 rounded-xl  text-white font-bold btn-sm' : 'btn btn-outline rounded-xl btn-sm ')} to="/dashboard/badges">
     Badges
  </NavLink>
  </>
)}








          </ul>
        </div>

        <div className="navbar-end flex items-center gap-4">
          <ThemeToggle></ThemeToggle>
        {!user ? (
          <>
            <Link
              to="/login"
              className="btn btn-sm border border-orange-500 text-red-500 hover:bg-red-600 hover:text-white"
            >
              Login
            </Link>
            
          </>
        ) :  (
          <div className="dropdown dropdown-end">
           <div tabIndex={0} role="button" className="w-12 h-12">
  <img
    src={user.photoURL}
    alt="avatar"
    title={user.displayName}
    className="w-full h-full rounded-full object-cover"
  />
</div>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-44 z-[100]"
            >
              <li>
                <NavLink to="/dashboard/home">Dashboard</NavLink>
              </li>
              <li>
                <button onClick={handleLogOut}>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>
      </div>
    
  );
};


export default Navbar;