import React from 'react';
import Banner from '@/components/Banner';
import Features from '@/components/Features';
import Community from '@/components/Community';
import Subscription from '@/components/Subscription';
import Upcoming from '@/components/Upcoming';

const page = () => {
  return (
    <div>
      <Banner />
      <Features />
      <Upcoming />
      <Community />
      <Subscription />
    </div>
  );
};

export default page;