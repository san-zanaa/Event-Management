import React from 'react';
import Banner from '@/components/Banner';
import Features from '@/components/Features';
import UpcomingEvents from '@/components/UpcomingEvents';

const page = () => {
  return (
    <div>
      <Banner />
      <Features />
      <UpcomingEvents />
    </div>
  );
};

export default page;