import React, { useState } from 'react';
import { useForm } from 'react-hook-form';


import { useLoaderData } from 'react-router';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';


const CreateDonationRequest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const locationData = useLoaderData(); // District & upazila data from loader

  const [selectedDistrict, setSelectedDistrict] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

 const onSubmit = async (data) => {
  const donationRequest = {
    ...data,
    requesterName: user?.displayName,
    requesterEmail: user?.email,
    status: 'pending',
  };

  try {
    const response = await axiosSecure.post('/donation-requests', donationRequest);
    console.log("Donation request submitted:", response.data);
    // Optionally show toast or reset form
    reset();
  } catch (error) {
    console.error("Error submitting donation request:", error);
  }
};

  // Find upazilas based on selected district
  const upazilas =
    locationData?.find((item) => item.district === selectedDistrict)?.upazila || [];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl text-red-500 font-bold mb-6 text-center">Create Donation Request</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Requester Name & Email (Read-only) */}
        <div>
          <label className="label">Requester Name</label>
          <input
            type="text"
            value={user?.displayName || ''}
            readOnly
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <label className="label">Requester Email</label>
          <input
            type="email"
            value={user?.email || ''}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        {/* Recipient Info */}
        <div>
          <label className="label">Recipient Name</label>
          <input {...register("recipientName", { required: true })} className="input input-bordered w-full" />
          {errors.recipientName && <span className="text-red-500 text-sm">Recipient name is required</span>}
        </div>

        <div>
          <label className="label">Recipient District</label>
          <select
            {...register("recipientDistrict", { required: true })}
            className="select select-bordered w-full"
            onChange={(e) => setSelectedDistrict(e.target.value)}
          >
            <option value="">Select District</option>
            {locationData?.map((item, index) => (
              <option key={index} value={item.district}>{item.district}</option>
            ))}
          </select>
          {errors.recipientDistrict && <span className="text-red-500 text-sm">District is required</span>}
        </div>

        <div>
          <label className="label">Recipient Upazila</label>
          <select {...register("recipientUpazila", { required: true })} className="select select-bordered w-full">
            <option value="">Select Upazila</option>
            {upazilas.map((upazila, idx) => (
              <option key={idx} value={upazila}>{upazila}</option>
            ))}
          </select>
          {errors.recipientUpazila && <span className="text-red-500 text-sm">Upazila is required</span>}
        </div>

        <div>
          <label className="label">Hospital Name</label>
          <input {...register("hospitalName", { required: true })} className="input input-bordered w-full" />
          {errors.hospitalName && <span className="text-red-500 text-sm">Hospital name is required</span>}
        </div>

        <div className="md:col-span-2">
          <label className="label">Full Address</label>
          <input {...register("fullAddress", { required: true })} className="input input-bordered w-full" />
          {errors.fullAddress && <span className="text-red-500 text-sm">Address is required</span>}
        </div>

        {/* Blood Group, Date, Time */}
        <div>
          <label className="label">Blood Group</label>
          <select {...register("bloodGroup", { required: true })} className="select select-bordered w-full">
            <option value="">Select Blood Group</option>
            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((group) => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
          {errors.bloodGroup && <span className="text-red-500 text-sm">Blood group is required</span>}
        </div>

        <div>
          <label className="label">Donation Date</label>
          <input type="date" {...register("donationDate", { required: true })} className="input input-bordered w-full" />
          {errors.donationDate && <span className="text-red-500 text-sm">Date is required</span>}
        </div>

        <div>
          <label className="label">Donation Time</label>
          <input type="time" {...register("donationTime", { required: true })} className="input input-bordered w-full" />
          {errors.donationTime && <span className="text-red-500 text-sm">Time is required</span>}
        </div>

        <div className="md:col-span-2">
          <label className="label">Request Message</label>
          <textarea
            {...register("requestMessage", { required: true })}
            className="textarea textarea-bordered w-full"
            rows={4}
            placeholder="Why do you need blood?"
          ></textarea>
          {errors.requestMessage && <span className="text-red-500 text-sm">Message is required</span>}
        </div>

        <div className="md:col-span-2">
          <button type="submit" className="btn bg-red-500 text-white w-full">Send Request</button>
        </div>
      </form>
    </div>
  );
};

export default CreateDonationRequest;
