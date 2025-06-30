import React from 'react';
import { Play, Star, Clock } from 'lucide-react';

interface ContentSectionProps {
  title: string;
  subtitle: string;
  type: 'movies' | 'shows' | 'trending';
}

const ContentSection: React.FC<ContentSectionProps> = ({ title, subtitle, type }) => {
  const getContent = () => {
    const baseContent = [
      {
        id: 1,
        title: "Quantum Odyssey",
        description: "A mind-bending sci-fi thriller that explores the boundaries of reality and consciousness.",
        image: "https://images.pexels.com/photos/7991456/pexels-photo-7991456.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
        rating: 8.5,
        duration: type === 'movies' ? '2h 15m' : '45m',
        year: '2024',
        genre: 'Sci-Fi'
      },
      {
        id: 2,
        title: "Mountain Peaks",
        description: "An epic adventure through the world's most dangerous mountain ranges.",
        image: "https://images.pexels.com/photos/7991230/pexels-photo-7991230.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
        rating: 9.1,
        duration: type === 'movies' ? '1h 58m' : '52m',
        year: '2024',
        genre: 'Adventure'
      },
      {
        id: 3,
        title: "City Lights",
        description: "A romantic drama set against the backdrop of a bustling metropolis.",
        image: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
        rating: 7.8,
        duration: type === 'movies' ? '2h 5m' : '40m',
        year: '2023',
        genre: 'Romance'
      },
      {
        id: 4,
        title: "Dark Waters",
        description: "A psychological thriller that delves into the depths of human nature.",
        image: "https://images.pexels.com/photos/7991622/pexels-photo-7991622.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
        rating: 8.9,
        duration: type === 'movies' ? '2h 22m' : '48m',
        year: '2024',
        genre: 'Thriller'
      },
      {
        id: 5,
        title: "Golden Hour",
        description: "A heartwarming story about family, love, and second chances.",
        image: "https://images.pexels.com/photos/7991740/pexels-photo-7991740.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
        rating: 8.2,
        duration: type === 'movies' ? '1h 45m' : '35m',
        year: '2024',
        genre: 'Drama'
      },
      {
        id: 6,
        title: "Space Chronicles",
        description: "An interstellar journey through unknown galaxies and alien civilizations.",
        image: "https://images.pexels.com/photos/7991803/pexels-photo-7991803.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop",
        rating: 9.3,
        duration: type === 'movies' ? '2h 35m' : '55m',
        year: '2024',
        genre: 'Sci-Fi'
      }
    ];

    return baseContent;
  };

  const content = getContent();

  return (
    <section className="py-12 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
            <p className="text-gray-400">{subtitle}</p>
          </div>
          <button className="text-orange-400 hover:text-orange-300 font-medium">
            View All →
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {content.map((item) => (
            <div
              key={item.id}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
            >
              <div className="relative mb-3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-60 sm:h-72 object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 rounded-lg" />
                
                {/* Rating badge */}
                <div className="absolute top-2 left-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium flex items-center space-x-1">
                  <Star size={12} fill="currentColor" className="text-yellow-400" />
                  <span>{item.rating}</span>
                </div>

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white/90 text-gray-900 p-3 rounded-full hover:bg-white transition-all transform hover:scale-110">
                    <Play size={20} fill="currentColor" />
                  </button>
                </div>

                {/* Duration */}
                <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                  <Clock size={12} />
                  <span>{item.duration}</span>
                </div>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-1 group-hover:text-orange-400 transition-colors">
                  {item.title}
                </h3>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <span>{item.year}</span>
                  <span>•</span>
                  <span>{item.genre}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContentSection;