import React from 'react';
import Banner from './Banner/Banner';
import InspiringStories from './InspiringStories/InspiringStories';
import ContactUs from './ContactUs/ContactUs';
import Footer from '../shared/Footer/Footer';
import Statistics from './Statistics';
import BloodTypes from './BloodTypes';

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
    <ContactUs></ContactUs>
</div>
<div className='pt-20 px-20 pb-30'>
    <Statistics></Statistics>
</div>

<div className='pt-20 px-20 pb-30'>
    
</div>

<Footer></Footer>
        </div>
    );
};

export default Home;