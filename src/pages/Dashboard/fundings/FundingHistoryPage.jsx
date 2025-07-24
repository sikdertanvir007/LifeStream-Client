import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import FundingForm from './FundingForm';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Loading from '../../Loading';

const stripePromise = loadStripe(import.meta.env.VITE_payment_Key);

const FundingHistoryPage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [page, setPage] = useState(1);
  const limit = 5;

  const { data, isPending } = useQuery({
    queryKey: ['userFundings', user?.email, page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user-fundings?email=${user.email}&page=${page}&limit=${limit}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isPending) return <Loading />;

  const totalPages = Math.ceil(data.total / limit);

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-6">
      <div className="text-right">
        <Elements stripe={stripePromise}>
          <FundingForm />
        </Elements>
      </div>

      {data.fundings.length === 0 ? (
        <p className="text-center text-gray-500">No funding history found. Make your first contribution above. ❤️</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Donor</th>
                <th>Amount ($)</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {data.fundings.map((fund, index) => (
                <tr key={fund._id}>
                  <td>{(page - 1) * limit + index + 1}</td>
                  <td>{fund.name}</td>
                  <td>{fund.amount}</td>
                  <td>{new Date(fund.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="text-center space-x-2 mt-4">
          {[...Array(totalPages).keys()].map((p) => (
            <button
              key={p}
              onClick={() => setPage(p + 1)}
              className={`btn btn-sm ${page === p + 1 ? 'btn-primary' : 'btn-ghost'}`}
            >
              {p + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FundingHistoryPage;
