import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';



import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const DashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

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

  const { mutate: deleteRequest } = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/donation-requests/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Donation request deleted');
      queryClient.invalidateQueries(['myRecentDonationRequests', user?.email]);
    },
    onError: () => toast.error('Failed to delete donation request')
  });

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this donation request?')) {
      deleteRequest(id);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Welcome, {user?.displayName}</h2>

      {donationRequests.length > 0 && (
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
                    <td className="space-x-2">
                      <button
                        className="btn btn-xs btn-info"
                        onClick={() => navigate(`/dashboard/edit-donation/${req._id}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-xs btn-error"
                        onClick={() => handleDelete(req._id)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-xs btn-secondary"
                        onClick={() => navigate(`/dashboard/donation-details/${req._id}`)}
                      >
                        View
                      </button>
                      {req.status === 'inprogress' && (
                        <>
                          <button
                            className="btn btn-xs btn-success"
                            onClick={() => updateStatus({ id: req._id, status: 'done' })}
                          >
                            Done
                          </button>
                          <button
                            className="btn btn-xs btn-warning"
                            onClick={() => updateStatus({ id: req._id, status: 'canceled' })}
                          >
                            Cancel
                          </button>
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
      )}
    </div>
  );
};

export default DashboardHome;
