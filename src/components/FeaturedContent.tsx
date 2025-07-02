import React, { useState, useEffect } from 'react';
import { Play, Info, ChevronLeft, ChevronRight, Star, Users } from 'lucide-react';
import { Channel } from '../types/Channel';
import { getFeaturedChannels } from '../data/channels';

interface FeaturedContentProps {
  onChannelSelect: (channel: Channel) => void;
}

const FeaturedContent: React.FC<FeaturedContentProps> = ({ onChannelSelect }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const featuredChannels = getFeaturedChannels();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredChannels.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [featuredChannels.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredChannels.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredChannels.length) % featuredChannels.length);
  };

  if (featuredChannels.length === 0) return null;

  return (
    <section className="relative h-[60vh] overflow-hidden mb-8">
      {featuredChannels.map((channel, index) => (
        <div
          key={channel.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${channel.thumbnail})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
          
          <div className="relative h-full flex items-center">
            <div className="max-w-4xl mx-auto px-6">
              <div className="max-w-2xl">
                {/* Channel info badges */}
                <div className="flex items-center space-x-3 mb-6">
                  <img
                    src={channel.logo}
                    alt={`${channel.name} logo`}
                    className="w-12 h-12 rounded-lg border-2 border-white/20"
                  />
                  <div className="flex items-center space-x-2">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center space-x-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <span>LIVE</span>
                    </span>
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      {channel.quality}
                    </span>
                    <div className="flex items-center space-x-1 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                      <Users size={14} />
                      <span>{channel.viewers}</span>
                    </div>
                    <div className="flex items-center space-x-1 bg-black/50 text-yellow-400 px-3 py-1 rounded-full text-sm">
                      <Star size={14} fill="currentColor" />
                      <span>{channel.rating}</span>
                    </div>
                  </div>
                </div>
                
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
                  {channel.name}
                </h1>
                
                <div className="mb-6">
                  <p className="text-orange-400 font-semibold text-lg mb-2">
                    Now Playing: {channel.currentShow}
                  </p>
                  <p className="text-gray-200 text-lg leading-relaxed">
                    {channel.description}
                  </p>
                </div>
                
                <div className="flex space-x-4">
                  <button
                    onClick={() => channel.streamUrl && onChannelSelect(channel)}
                    disabled={!channel.streamUrl}
                    className="bg-white text-black px-8 py-4 rounded-xl font-bold flex items-center space-x-2 hover:bg-gray-200 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    <Play size={20} fill="currentColor" />
                    <span>Watch Live</span>
                  </button>
                  <button className="bg-gray-600/80 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold flex items-center space-x-2 hover:bg-gray-600 transition-all border border-gray-500">
                    <Info size={20} />
                    <span>More Info</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/70 transition-all border border-white/20"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black/50 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/70 transition-all border border-white/20"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {featuredChannels.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedContent;