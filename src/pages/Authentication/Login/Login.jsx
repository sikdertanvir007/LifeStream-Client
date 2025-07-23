import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [loginError, setLoginError] = useState("");

  const onSubmit = (data) => {
    const { email, password } = data;
    setLoginError(""); // Clear previous errors

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        navigate(location.state?.from?.pathname || "/");
      })
      .catch(() => {
        setLoginError("Invalid Email or Password. Please try again.");
      });
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-2xl font-bold">Please Log In</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              type="email"
              {...register('email', { required: true })}
              className="input"
              placeholder="Email"
            />
            {errors.email && <p className="text-red-500">Email is required</p>}

            <label className="label">Password</label>
            <input
              type="password"
              {...register('password', { required: true, minLength: 6 })}
              className="input"
              placeholder="Password"
            />
            {errors.password?.type === 'required' && <p className="text-red-500">Password is required</p>}
            {errors.password?.type === 'minLength' && <p className="text-red-500">Password must be 6 characters or longer</p>}

            {loginError && <p className="text-red-600 font-bold">{loginError}</p>}

            <p className="mt-2">
              New to this website?{" "}
              <Link className="text-red-500 font-bold btn-link" to="/register">Register</Link>
            </p>

            <button type="submit" className="btn bg-red-500 text-white mt-4">Login</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Login;