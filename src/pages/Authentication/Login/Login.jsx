import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';

const Login = () => {
    const {register,handleSubmit,formState:{errors}} = useForm();
    const onSubmit = data => {
        console.log(data)
    }
    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
          <h1 className="text-2xl font-bold">Please LogIn</h1>
           <form onSubmit={handleSubmit(onSubmit)}>
             <fieldset className="fieldset">
          <label className="label">Email</label>

          <input type="email" {...register('email',{required:true})} className="input" placeholder="Email" />

          <label className="label">Password</label>

          <input type="password" {...register('password',{required: true, minLength:6})} className="input" placeholder="Password" />


    {errors.password?.type === 'required' && <p role="alert" className='text-red-500'>Password is required</p>}
    {errors.password?.type === 'minLength' && <p role="alert" className='text-red-500'>Password must be 6 characters or longer</p>}


          <p>New to this website? <Link className='text-red-500 font-bold  btn-link' to="/register">Register</Link></p>
          <button className="btn  bg-red-500 text-white mt-4">Login</button>
        </fieldset>
        
           </form>
        </div>
    </div>
    );
};

export default Login;