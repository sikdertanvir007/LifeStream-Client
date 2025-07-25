import React from 'react';
import { useQuery } from '@tanstack/react-query';


import Loading from './Loading';
import { Link } from 'react-router';
import useAxios from '../hooks/useAxios';
import Navbar from './shared/Navbar/Navbar';
import Footer from './shared/Footer/Footer';

const PublicRequestsPage = () => {
  
  const axiosInstance = useAxios();
  const { data = [], isLoading, isError } = useQuery({
    queryKey: ['public-requests'],
    queryFn: () => axiosInstance.get('/public-donation-requests').then(res => res.data),
    enabled: true,
  });

  if (isLoading) return <Loading />;
  if (isError) return <p className="text-center text-error">Error fetching requests</p>;

  if (data.length === 0) return <p className="text-center">No donation request found.</p>;

  return (
    <div>
        <div className='mb-30'><Navbar></Navbar></div>
    <div className="max-w-4xl mx-auto p-4 grid md:grid-cols-2 gap-6">
      {data.map(req => (
        <div key={req._id} className="card bg-base-100 shadow-xl p-4">
          <h3 className="text-xl font-semibold">{req.recipientName}</h3>
          <p><strong>Location:</strong> {req.recipientDistrict}, {req.recipientUpazila}</p>
          <p><strong>Blood Group:</strong> {req.bloodGroup}</p>
          <p><strong>Date:</strong> {new Date(req.donationDate).toLocaleDateString()}</p>
          <p><strong>Time:</strong> {req.donationTime}</p>
          <Link
           to={`/donation-request/${req._id}`} 
  className="btn  bg-red-500 rounded-lg text-white mt-3"
          >
            View Details
          </Link>
        </div>
      ))}
    </div>
    <div className='mt-30'><Footer></Footer></div>
    </div>
  );
};

export default PublicRequestsPage;
