import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import LiveTVSection from './components/LiveTVSection';
import LiveChannelsSection from './components/LiveChannelsSection';
import ContentSection from './components/ContentSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      <HeroSection />
      <LiveTVSection />
      <LiveChannelsSection />
      <ContentSection 
        title="Trending Movies" 
        subtitle="The most popular movies right now"
        type="movies"
      />
      <ContentSection 
        title="Popular TV Shows" 
        subtitle="Binge-worthy series everyone's talking about"
        type="shows"
      />
      <ContentSection 
        title="What's Hot" 
        subtitle="Trending content across all categories"
        type="trending"
      />
      <Footer />
    </div>
  );
}

export default App;