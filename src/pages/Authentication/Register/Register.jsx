import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLoaderData, useLocation, useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const Register = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { createUser, updateUser,setUser } = useAuth();
   const location = useLocation();
  const navigate = useNavigate();
 


  const operatingAreas = useLoaderData();
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  const selectedDistrict = watch("district");

  useEffect(() => {
    const uniqueDistricts = [...new Set(operatingAreas.map(area => area.district))];
    setDistricts(uniqueDistricts);
  }, [operatingAreas]);

  useEffect(() => {
    const matched = operatingAreas.find(area => area.district === selectedDistrict);
    setUpazilas(matched ? matched.upazila : []);
  }, [selectedDistrict, operatingAreas]);

  const onSubmit = async (data) => {
    try {
      const photoURL = data.avatar || '';

      const res = await createUser(data.email, data.password);

      await updateUser({
        displayName: data.name,
       photoURL: photoURL,
      });

      const userInfo = {
        name: data.name,
        email: data.email,
        photo: photoURL,
        bloodGroup: data.bloodGroup,
        district: data.district,
        upazila: data.upazila,
        role: 'donor'
      };

      setUser(userInfo);
              Swal.fire({
                title: 'Registration Successful!',
                text: `Welcome back, ${data.name || data.email}`,
                icon: 'success',
                confirmButtonColor: '#d33',
              });
               navigate(location.state?.from?.pathname || "/");
    } catch (error) {
      console.error('Registration error:', error);
       Swal.fire({
                title: 'Registration Failed',
                text: 'Invalid Email or Password. Please try again.',
                icon: 'error',
                confirmButtonColor: '#d33',
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
            <label className="label">Avatar (Optional)</label>
            <input type="text" accept="image/*" {...register("avatar")} className="input input-bordered w-full" placeholder='PhotoURL' />
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

          <div>
            <label className="label">Password</label>
            <input type="password" {...register("password", { required: true, minLength: 6 })} className="input input-bordered w-full" placeholder="Password" />
            {errors.password?.type === "required" && <p className="text-red-500">Password is required</p>}
            {errors.password?.type === "minLength" && <p className="text-red-500">Minimum 6 characters</p>}
          </div>

          <div>
            <label className="label">Confirm Password</label>
            <input type="password" {...register("confirm_password", {
              required: true,
              validate: val => val === watch('password') || "Passwords do not match"
            })} className="input input-bordered w-full" placeholder="Confirm Password" />
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
