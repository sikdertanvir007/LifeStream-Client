import React, { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    avatar: '',
    district: '',
    upazila: '',
    bloodGroup: '',
  });

  // ✅ Fetch user profile
  const { data: userData, isLoading, isError } = useQuery({
    queryKey: ['userProfile', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      return res.data;
    },
  });

  // ✅ Populate formData once userData is fetched
  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name || '',
        avatar: userData.avatar || '',
        district: userData.district || '',
        upazila: userData.upazila || '',
        bloodGroup: userData.bloodGroup || '',
      });
    }
  }, [userData]);

  // ✅ Mutation to update profile
  const { mutate: updateUserProfile, isPending } = useMutation({
    mutationFn: async (updatedData) => {
      const res = await axiosSecure.put(`/users/${user.email}`, updatedData);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Profile updated successfully!');
      queryClient.invalidateQueries(['userProfile', user.email]);
      setIsEditing(false);
    },
    onError: () => {
      toast.error('Failed to update profile!');
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    updateUserProfile(formData);
  };

  if (isLoading) return <div className="text-center py-10">Loading profile...</div>;
  if (isError) return <div className="text-center py-10 text-red-500">Failed to load profile.</div>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 shadow-md rounded-xl bg-base-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">User Profile</h2>
        {!isEditing ? (
          <button onClick={() => setIsEditing(true)} className="btn btn-sm btn-info">Edit</button>
        ) : (
          <button onClick={handleSave} disabled={isPending} className="btn btn-sm btn-success">
            {isPending ? 'Saving...' : 'Save'}
          </button>
        )}
      </div>

      {/* Avatar preview */}
      {formData.avatar && (
        <div className="text-center mb-4">
          <img
            src={formData.avatar}
            alt="User Avatar"
            className="w-24 h-24 rounded-full object-cover inline-block border"
          />
        </div>
      )}

      <form className="space-y-4">
        <div className="form-control">
          <label className="label">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            disabled={!isEditing}
            onChange={handleChange}
            className="input input-bordered"
          />
        </div>

        <div className="form-control">
          <label className="label">Email (Not editable)</label>
          <input
            type="email"
            value={userData.email}
            disabled
            className="input input-bordered"
          />
        </div>

        <div className="form-control">
          <label className="label">Avatar URL</label>
          <input
            type="text"
            name="avatar"
            value={formData.avatar}
            disabled={!isEditing}
            onChange={handleChange}
            className="input input-bordered"
          />
        </div>

        <div className="form-control">
          <label className="label">District</label>
          <input
            type="text"
            name="district"
            value={formData.district}
            disabled={!isEditing}
            onChange={handleChange}
            className="input input-bordered"
          />
        </div>

        <div className="form-control">
          <label className="label">Upazila</label>
          <input
            type="text"
            name="upazila"
            value={formData.upazila}
            disabled={!isEditing}
            onChange={handleChange}
            className="input input-bordered"
          />
        </div>

        <div className="form-control">
          <label className="label">Blood Group</label>
          <input
            type="text"
            name="bloodGroup"
            value={formData.bloodGroup}
            disabled={!isEditing}
            onChange={handleChange}
            className="input input-bordered"
          />
        </div>
      </form>
    </div>
  );
};

export default Profile;
