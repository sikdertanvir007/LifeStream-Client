import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const FundingForm = ({ onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [error, setError] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    try {
      const card = elements.getElement(CardElement);
      if (!card) return;

      const { data } = await axiosSecure.post('/create-payment', { amount });
      const clientSecret = data.clientSecret;

      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            name: user.displayName || 'Anonymous',
            email: user.email,
          },
        },
      });

      if (confirmError) throw new Error(confirmError.message);

      if (paymentIntent.status === 'succeeded') {
        // save to DB
        const fundingData = {
          name: user.displayName,
          email: user.email,
          amount: parseFloat(amount),
          date: new Date(),
        };
        await axiosSecure.post('/fundings', fundingData);
        Swal.fire('Success!', 'Thanks for your contribution! 🎉', 'success');

if (onSuccess) {
    onSuccess();
  }

        setAmount('');
        card.clear();
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-lg max-w-md mx-auto">
      <input
        type="number"
        className="input input-bordered w-full"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <CardElement className="p-2 border rounded" />
      <button type="submit" className="btn bg-red-500 text-white w-full" disabled={!stripe}>
        Make a Fund
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default FundingForm;
