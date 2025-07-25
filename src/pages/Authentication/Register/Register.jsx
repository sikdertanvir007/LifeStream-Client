import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import axios from 'axios';
import { Link, useLoaderData, useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAxios from '../../../hooks/useAxios';

const Register = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { createUser, updateUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosInstance = useAxios();
  const operatingAreas = useLoaderData();

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const selectedDistrict = watch("district");

  useEffect(() => {
    const uniqueDistricts = [...new Set(operatingAreas.map(area => area.district))];
    setDistricts(uniqueDistricts);
  }, [operatingAreas]);

  useEffect(() => {
    if (selectedDistrict) {
      const matched = operatingAreas.find(area => area.district === selectedDistrict);
      if (matched) setUpazilas(matched.upazila);
    } else {
      setUpazilas([]);
    }
  }, [selectedDistrict, operatingAreas]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('image', data.avatar[0]);

      const imgbbRes = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`, formData);
      const avatarUrl = imgbbRes.data.data.url;

      const res = await createUser(data.email, data.password);
      await updateUser({
        displayName: data.name,
        photoURL: avatarUrl
      });

      const userInfo = {
        name: data.name,
        email: data.email,
        avatar: avatarUrl,
        bloodGroup: data.bloodGroup,
        district: data.district,
        upazila: data.upazila,
        role: 'donor',
        status: 'Active',
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };

      const userRes = await axiosInstance.post('/users', userInfo);

      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'Welcome to LifeStream!',
        confirmButtonColor: '#ef4444'
      }).then(() => {
        navigate(location.state?.from?.pathname || "/");
      });

    } catch (error) {
      console.error('Registration error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: error.message || 'Something went wrong!',
        confirmButtonColor: '#ef4444'
      });
    }
  };

  return (
    <div className="card bg-base-100 w-full max-w-md mx-auto mt-8 shadow-2xl">
      <div className="card-body">
        <h1 className="text-2xl font-bold mb-4 text-center">Create an Account</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          
          <div>
            <label className="label">Name</label>
            <input type="text" {...register("name", { required: true })} className="input input-bordered w-full" placeholder="Your name" />
            {errors.name && <p className="text-red-500">Name is required</p>}
          </div>

          <div>
            <label className="label">Email</label>
            <input type="email" {...register("email", { required: true })} className="input input-bordered w-full" placeholder="Email" />
            {errors.email && <p className="text-red-500">Email is required</p>}
          </div>

          <div>
            <label className="label">Avatar</label>
            <input type="file" accept="image/*" {...register("avatar", { required: true })} className="file-input file-input-bordered w-full" />
            {errors.avatar && <p className="text-red-500">Avatar is required</p>}
          </div>

          <div>
            <label className="label">Blood Group</label>
            <select {...register("bloodGroup", { required: true })} className="select select-bordered w-full">
              <option value="">Select</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
            {errors.bloodGroup && <p className="text-red-500">Blood group is required</p>}
          </div>

          <div>
            <label className="label">District</label>
            <select {...register("district", { required: true })} className="select select-bordered w-full">
              <option value="">Select District</option>
              {districts.map((d, i) => (
                <option key={i} value={d}>{d}</option>
              ))}
            </select>
            {errors.district && <p className="text-red-500">District is required</p>}
          </div>

          <div>
            <label className="label">Upazila</label>
            <select {...register("upazila", { required: true })} className="select select-bordered w-full">
              <option value="">Select Upazila</option>
              {upazilas.map((u, i) => (
                <option key={i} value={u}>{u}</option>
              ))}
            </select>
            {errors.upazila && <p className="text-red-500">Upazila is required</p>}
          </div>

          {/* ✅ Enhanced Password Validation */}
          <div>
            <label className="label">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters required"
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                  message: "Must include uppercase and lowercase letters"
                }
              })}
              className="input input-bordered w-full"
              placeholder="Password"
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>

          <div>
            <label className="label">Confirm Password</label>
            <input
              type="password"
              {...register("confirm_password", {
                required: "Please confirm your password",
                validate: val => val === watch("password") || "Passwords do not match"
              })}
              className="input input-bordered w-full"
              placeholder="Confirm Password"
            />
            {errors.confirm_password && <p className="text-red-500">{errors.confirm_password.message}</p>}
          </div>

          <p className="text-sm">
            Already have an account? <Link to="/login" className="text-red-500 font-semibold underline">Login</Link>
          </p>

          <button className="btn bg-red-500 text-white w-full mt-2">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
