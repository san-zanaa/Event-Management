import React from 'react';
import Banner from '@/components/Banner';
import Features from '@/components/Features';
import UpcomingEvents from '@/components/UpcomingEvents';
import Community from '@/components/Community';
import Subscription from '@/components/Subscription';

const page = () => {
  return (
    <div>
      <Banner />
      <Features />
      <UpcomingEvents />
      <Community />
      <Subscription />
    </div>
  );
};

export default page;