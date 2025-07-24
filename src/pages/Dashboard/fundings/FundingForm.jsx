import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../Loading';

const FundingForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
const [error,setError] =useState('');
const {id} = useParams();
console.log(id);

const {isPending,data:fundingInfo={}} = useQuery({
    queryKey:['funding',id],
    queryFn: async()=>{
const res = await axiosSecure.get(`/donation-requests/${id}`);
return res.data;
    }
})

if(isPending){
    return <Loading></Loading>
}

console.log(fundingInfo);
    const handleSubmit = async(e) => {
        e.preventDefault();
        if(!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if(!card) {
            return;
        }
        const {error,paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card
        })
        if(error){
            setError(error.message);
        } else{
            setError('');
            console.log('[PaymentMethod]', paymentMethod);
        }
        // Handle form submission logic here
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className='space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto'>
<CardElement className='p-2 border rounded'>
    
</CardElement>
<button type='submit' className='btn btn-primary w-full ' disabled={!stripe}>
        Make a Fund
    </button>
    {
        error && <p className='text-red-500'>{error}</p>
    }
            </form>
        </div>
    );
};

export default FundingForm;