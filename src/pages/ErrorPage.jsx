import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router';

const ErrorPage = () => {
    return (
        <div>
            <Helmet> <title> Error</title></Helmet>
             <div className='px-3 md:px-15 lg:px-25 xl:px-30'>
             <div className='min-h-screen flex flex-col items-center justify-center text-center gap-y-6 '>
                <img className='w-100 rounded-xl shadow-xl' src="https://media.istockphoto.com/id/1486760130/vector/blood-donor-concept.jpg?s=612x612&w=0&k=20&c=g46maNtj1STHr-SnieDGUjQnQ-Evk-07jmDFdCbpoO0=" alt="" />
                <p className='text-red-500 font-bold text-3xl'>404- Page Not Found</p>
                <p className='text-xl'>Oops! The page you're looking for doesn't exist</p>
                <Link to="/"><button  className='btn bg-red-500 hover:bg-red-700 text-white '>Go Back Home</button> </Link>
            </div>
        </div>
        </div>
    );
};

export default ErrorPage;