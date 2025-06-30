import React, { useState, useEffect } from 'react';
import { Play, Info, ChevronLeft, ChevronRight } from 'lucide-react';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "The Crown",
      description: "Follow the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the 20th century.",
      image: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
      type: "Series",
      rating: "8.7",
      year: "2023"
    },
    {
      id: 2,
      title: "Breaking Boundaries",
      description: "An epic adventure that takes you through the most breathtaking landscapes and thrilling action sequences ever captured on film.",
      image: "https://images.pexels.com/photos/7991230/pexels-photo-7991230.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
      type: "Movie",
      rating: "9.1",
      year: "2024"
    },
    {
      id: 3,
      title: "City of Dreams",
      description: "A gripping tale of ambition, power, and corruption in the heart of a bustling metropolis where dreams collide with reality.",
      image: "https://images.pexels.com/photos/7991456/pexels-photo-7991456.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
      type: "Series",
      rating: "8.9",
      year: "2024"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-[70vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          
          <div className="relative h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="bg-blue-600 text-white px-2 py-1 rounded text-sm font-medium">
                    {slide.type}
                  </span>
                  <span className="text-yellow-400 font-medium">★ {slide.rating}</span>
                  <span className="text-gray-300">{slide.year}</span>
                </div>
                
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  {slide.title}
                </h1>
                
                <p className="text-gray-200 text-lg mb-8 leading-relaxed">
                  {slide.description}
                </p>
                
                <div className="flex space-x-4">
                  <button className="bg-white text-black px-8 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:bg-gray-200 transition-all transform hover:scale-105">
                    <Play size={20} fill="currentColor" />
                    <span>Watch Now</span>
                  </button>
                  <button className="bg-gray-600/80 text-white px-8 py-3 rounded-lg font-semibold flex items-center space-x-2 hover:bg-gray-600 transition-all">
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
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-all"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-all"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;