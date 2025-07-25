import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router';
import { FaUsers, FaHandHoldingUsd, FaTint } from 'react-icons/fa';

import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useRole from '../../hooks/useRole';
import Swal from 'sweetalert2';


const DashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { role } = useRole(); // admin / donor / volunteer

  // === Stats Queries (only for admin or volunteer) ===
  const { data: totalDonors = 0 } = useQuery({
    queryKey: ['totalDonors'],
    enabled: role === 'admin' || role === 'volunteer',
    queryFn: async () => {
      const res = await axiosSecure.get('/users/count-donors');
      return res.data?.count || 0;
    },
  });

  const { data: totalFunds = 0 } = useQuery({
    queryKey: ['totalFunds'],
    enabled: role === 'admin' || role === 'volunteer',
    queryFn: async () => {
      const res = await axiosSecure.get('/fundings/total-amount');
      return res.data?.totalAmount || 0;
    },
  });

  const { data: totalRequests = 0 } = useQuery({
    queryKey: ['totalDonationRequests'],
    enabled: role === 'admin' || role === 'volunteer',
    queryFn: async () => {
      const res = await axiosSecure.get('/donation-requests/count');
      return res.data?.count || 0;
    },
  });

  // === Recent Donation Requests (only for donor) ===
  const { data: donationRequests = [], isLoading } = useQuery({
    queryKey: ['myRecentDonationRequests', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-donation-requests?email=${user.email}&page=1&limit=3`);
      return res.data?.data || [];
    },
  });

  const { mutate: updateStatus } = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/donation-requests/${id}`, { status });
      return res.data;
    },
    onSuccess: () => {
      toast.success('Donation status updated');
      queryClient.invalidateQueries(['myRecentDonationRequests', user?.email]);
    },
    onError: () => toast.error('Failed to update status')
  });

 const deleteMutation = useMutation({
     mutationFn: async (id) => {
       return axiosSecure.delete(`/donation-requests/${id}`);
     },
     onSuccess: () => queryClient.invalidateQueries(["my-donation-requests", user.email]),
   });
 const handleDelete = async (id) => {
     const result = await Swal.fire({
       title: "Are you sure?",
       text: "You won't be able to revert this donation request!",
       icon: "warning",
       showCancelButton: true,
       confirmButtonColor: "#d33",
       cancelButtonColor: "#3085d6",
       confirmButtonText: "Yes, delete it!",
     });
 
     if (result.isConfirmed) {
       deleteMutation.mutate(id, {
         onSuccess: () => {
           Swal.fire("Deleted!", "The donation request has been deleted.", "success");
         },
         onError: () => {
           Swal.fire("Failed!", "Failed to delete the request.", "error");
         },
       });
     }
   };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Welcome, {user?.displayName}</h2>

      {/* Featured Cards - Only for Admin/Volunteer */}
      {(role === 'admin' || role === 'volunteer') && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-red-100 border-l-4 border-red-500 shadow rounded-xl p-5 flex items-center gap-4">
            <FaUsers className="text-4xl text-red-600" />
            <div>
              <p className="text-xl font-bold">{totalDonors}</p>
              <p className="text-gray-600 text-sm">Total Donors</p>
            </div>
          </div>

          <div className="bg-green-100 border-l-4 border-green-500 shadow rounded-xl p-5 flex items-center gap-4">
            <FaHandHoldingUsd className="text-4xl text-green-600" />
            <div>
              <p className="text-xl font-bold">৳{totalFunds}</p>
              <p className="text-gray-600 text-sm">Total Funds</p>
            </div>
          </div>

          <div className="bg-blue-100 border-l-4 border-blue-500 shadow rounded-xl p-5 flex items-center gap-4">
            <FaTint className="text-4xl text-blue-600" />
            <div>
              <p className="text-xl font-bold">{totalRequests}</p>
              <p className="text-gray-600 text-sm">Blood Donation Requests</p>
            </div>
          </div>
        </div>
      )}

      {/* Recent Requests - Only for Donor */}
      
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Your Recent Donation Requests</h3>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Recipient</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Blood Group</th>
                  <th>Status</th>
                  <th>Donor Info</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {donationRequests.map((req) => (
                  <tr key={req._id}>
                    <td>{req.recipientName}</td>
                    <td>{req.recipientDistrict}, {req.recipientUpazila}</td>
                    <td>{req.donationDate}</td>
                    <td>{req.donationTime}</td>
                    <td>{req.bloodGroup}</td>
                    <td>{req.status}</td>
                    <td>
                      {req.status === 'inprogress' && (
                        <div>
                          <div>{req.donorName}</div>
                          <div className="text-xs">{req.donorEmail}</div>
                        </div>
                      )}
                    </td>
                    <td className="space-x-4 space-y-4">
                      <Link to={`/dashboard/edit-donation/${req._id}`} className="btn btn-xs btn-info" >Edit</Link>
                      <button className="btn btn-xs btn-error" onClick={() => handleDelete(req._id)}>Delete</button>
                      <Link to={`/donation-request/${req._id}`} className="btn btn-xs btn-secondary" >View</Link>
                      {req.status === 'inprogress' && (
                        <>
                          <button className="btn btn-xs btn-success" onClick={() => updateStatus({ id: req._id, status: 'done' })}>Done</button>
                          <button className="btn btn-xs btn-warning" onClick={() => updateStatus({ id: req._id, status: 'canceled' })}>Cancel</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-right mt-4">
            <button
              onClick={() => navigate('/dashboard/my-donation-requests')}
              className="btn btn-outline btn-primary"
            >
              View My All Requests
            </button>
          </div>
        </div>
      
    </div>
  );
};

export default DashboardHome;
