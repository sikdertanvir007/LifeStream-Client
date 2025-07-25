// src/pages/Forbidden.jsx
import React from 'react';

import { FaBan } from 'react-icons/fa';
import { Link } from 'react-router';
import Navbar from '../shared/Navbar/Navbar';

const Forbidden = () => {
  return (
    <div>
        <div><Navbar></Navbar></div>
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 text-center p-6">
      <FaBan className="text-red-600 text-6xl mb-4" />
      <h1 className="text-4xl font-bold text-red-600 mb-2">403 - Forbidden</h1>
      <p className="text-lg text-gray-600 mb-6">
        Sorry, you don’t have permission to access this page.
      </p>
      <Link
        to="/"
        className="btn bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md"
      >
        Go Home
      </Link>
    </div>
    </div>
  );
};

export default Forbidden;
