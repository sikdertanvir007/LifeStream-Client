import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const EditDonationRequest = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const { data: donationRequest, isLoading } = useQuery({
    queryKey: ['donationRequest', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-requests/${id}`);
      return res.data;
    },
    enabled: !!id
  });

  const { mutate: updateDonation } = useMutation({
    mutationFn: async (updatedData) => {
      const res = await axiosSecure.put(`/donation-requests/${id}`, updatedData);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Donation request updated successfully');
      queryClient.invalidateQueries(['donationRequest', id]);
      navigate('/dashboard/my-donation-requests');
    },
    onError: () => toast.error('Failed to update donation request')
  });

  useEffect(() => {
    if (donationRequest) {
      reset(donationRequest);
    }
  }, [donationRequest, reset]);

  const onSubmit = (data) => {
    updateDonation(data);
  };

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Edit Donation Request</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="text"
          placeholder="Recipient Name"
          {...register('recipientName', { required: true })}
          className="input input-bordered w-full"
        />
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="District"
            {...register('recipientDistrict', { required: true })}
            className="input input-bordered w-full"
          />
          <input
            type="text"
            placeholder="Upazila"
            {...register('recipientUpazila', { required: true })}
            className="input input-bordered w-full"
          />
        </div>
        <div className="flex gap-4">
          <input
            type="date"
            {...register('donationDate', { required: true })}
            className="input input-bordered w-full"
          />
          <input
            type="time"
            {...register('donationTime', { required: true })}
            className="input input-bordered w-full"
          />
        </div>
        <input
          type="text"
          placeholder="Blood Group"
          {...register('bloodGroup', { required: true })}
          className="input input-bordered w-full"
        />

        <button className="btn btn-primary w-full" type="submit">
          Update Donation Request
        </button>
      </form>
    </div>
  );
};

export default EditDonationRequest;
