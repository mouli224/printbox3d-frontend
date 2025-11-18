import React from 'react';
import Hero from '../../components/Home/Hero';
import FeaturedCategories from '../../components/Home/FeaturedCategories';
import BestSellers from '../../components/Home/BestSellers';
import AboutSnippet from '../../components/Home/AboutSnippet';
import Testimonials from '../../components/Home/Testimonials';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      <FeaturedCategories />
      <BestSellers />
      <AboutSnippet />
      <Testimonials />
    </div>
  );
};

export default Home;
