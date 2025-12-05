import React from 'react';
import Banner from '../Banner/Banner';
import Hero from './Hero';
import DynamicServices from './DynamicServices';
import ChooseUs from './ChooseUs';

const Home = () => {
  return (
    <div>
      <Banner></Banner>
    <div className='max-w-6xl mx-auto'>
      <Hero></Hero>
      <DynamicServices></DynamicServices>
      <ChooseUs></ChooseUs>
      </div>
    </div>
  );
};

export default Home;