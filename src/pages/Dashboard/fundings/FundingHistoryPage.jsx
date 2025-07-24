import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import FundingForm from './FundingForm';


const stripePromise =  loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh')
const FundingHistoryPage = () => {
    return (
       <Elements stripe={stripePromise}>
<FundingForm></FundingForm>
       </Elements>
    );
};

export default FundingHistoryPage;