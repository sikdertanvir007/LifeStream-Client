import React from 'react';
import Banner from './Banner/Banner';
import InspiringStories from './InspiringStories/InspiringStories';
import ContactUs from './ContactUs/ContactUs';
import Footer from '../shared/Footer/Footer';
import Statistics from './Statistics';
import BloodTypes from './BloodTypes';
import DonationProcess from './DonationProcess';
import UpcomingEvents from './UpComingEvents';
import FAQ from './FAQ';
import Eligibility from './Eligibility';

const Home = () => {
    return (
        <div>
            <div className='pt-20 px-20'>
<Banner></Banner>
</div>
<div className='pt-20 px-20'>
    <InspiringStories></InspiringStories>
</div>


<div className='pt-20 px-20 pb-30'>
    <Statistics></Statistics>
</div>

<div className='pt-20 px-20 pb-30'>
    <BloodTypes></BloodTypes>
</div>

<div className='pt-20 px-20 pb-30'>
    <DonationProcess></DonationProcess>
</div>

<div className='pt-20 px-20 pb-30'>
    <UpcomingEvents></UpcomingEvents>
</div>

<div className='pt-20 px-20 pb-30'>
    <FAQ></FAQ>
</div>

<div className='pt-20 px-20 pb-30'>
    <Eligibility></Eligibility>
</div>

<Footer></Footer>
        </div>
    );
};

export default Home;