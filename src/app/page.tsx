import React from 'react';
import Banner from '@/components/Banner';
import Features from '@/components/Features';
import UpcomingEvents from '@/components/UpcomingEvents';
import Community from '@/components/Community';


const page = () => {
  return (
    <div>
      <Banner />
      <Features />
      <UpcomingEvents />
      <Community />
    </div>
  );
};

export default page;