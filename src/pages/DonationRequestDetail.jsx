import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Dialog } from '@headlessui/react';
import { useParams } from 'react-router';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';
import Loading from './Loading';
import Navbar from './shared/Navbar/Navbar';
import Footer from './shared/Footer/Footer';

const DonationRequestDetail = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const { data: request, isLoading } = useQuery({
    queryKey: ['donation-request', id],
    queryFn: () => axiosSecure.get(`/donation-requests/${id}`).then(res => res.data),
  });

  const mutation = useMutation({
    mutationFn: (donationData) =>
      axiosSecure.patch(`/donation-requests/donate/${id}`, donationData),
    onSuccess: () => {
      queryClient.invalidateQueries(['donation-request', id]);
      setIsOpen(false);
    },
  });

  if (isLoading || !request) return <Loading />;

  const handleDonate = (e) => {
    e.preventDefault();
    mutation.mutate({
      donorName: user?.displayName,
      donorEmail: user?.email,
      status: 'inprogress',
    });
  };

  return (
    <div>
        <div className='mb-30'><Navbar></Navbar></div>
    <div className="max-w-3xl mx-auto p-6 bg-base-100 shadow rounded-xl">
      <h2 className="text-3xl font-bold mb-4">🩸 Donation Request Details</h2>
      <div className="space-y-2">
        <p><strong>Recipient Name:</strong> {request.recipientName}</p>
        <p><strong>Blood Group:</strong> {request.bloodGroup}</p>
        <p><strong>District:</strong> {request.recipientDistrict}</p>
        <p><strong>Upazila:</strong> {request.recipientUpazila}</p>
        <p><strong>Date:</strong> {request.donationDate}</p>
        <p><strong>Time:</strong> {request.donationTime}</p>
        <p><strong>Hospital:</strong> {request.hospitalName}</p>
        <p><strong>Status:</strong> {request.status}</p>
      </div>

      {request.status === 'pending' && (
        <Button className="mt-6 btn bg-red-500 text-white rounded-xl" onClick={() => setIsOpen(true)}>
          Donate Now
        </Button>
      )}

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto w-full max-w-md rounded bg-white p-6 space-y-4">
            <Dialog.Title className="text-xl font-bold">Confirm Donation</Dialog.Title>
            <form onSubmit={handleDonate} className="space-y-3">
              <div>
                <label className="block text-sm font-medium">Donor Name</label>
                <input type="text" value={user?.displayName} readOnly className="input input-bordered w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium">Donor Email</label>
                <input type="email" value={user?.email} readOnly className="input input-bordered w-full" />
              </div>
              <div className="flex justify-end">
                <Button className="btn bg-red-500 text-white rounded-xl" type="submit" disabled={mutation.isLoading}>
                  {mutation.isLoading ? 'Submitting...' : 'Confirm Donation'}
                </Button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
    <div className='mt-30'><Footer></Footer></div>
    
    </div>
  );
};

export default DonationRequestDetail;
