import React from 'react';
import { Play, Users, Tv } from 'lucide-react';

const LiveTVSection = () => {
  const channels = [
    {
      id: 1,
      name: "Sports Central",
      category: "Sports",
      viewers: "2.1M",
      thumbnail: "https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      isLive: true,
      currentShow: "Premier League Live"
    },
    {
      id: 2,
      name: "Movie Magic",
      category: "Movies",
      viewers: "890K",
      thumbnail: "https://images.pexels.com/photos/7991622/pexels-photo-7991622.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      isLive: true,
      currentShow: "Hollywood Blockbusters"
    },
    {
      id: 3,
      name: "News Today",
      category: "News",
      viewers: "1.5M",
      thumbnail: "https://images.pexels.com/photos/7991740/pexels-photo-7991740.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      isLive: true,
      currentShow: "Breaking News Update"
    },
    {
      id: 4,
      name: "Kids Zone",
      category: "Kids",
      viewers: "650K",
      thumbnail: "https://images.pexels.com/photos/7991803/pexels-photo-7991803.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      isLive: true,
      currentShow: "Cartoon Adventures"
    },
    {
      id: 5,
      name: "Music Beats",
      category: "Music",
      viewers: "420K",
      thumbnail: "https://images.pexels.com/photos/7991889/pexels-photo-7991889.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      isLive: true,
      currentShow: "Top Hits 2024"
    },
    {
      id: 6,
      name: "Cooking Channel",
      category: "Lifestyle",
      viewers: "380K",
      thumbnail: "https://images.pexels.com/photos/7991960/pexels-photo-7991960.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
      isLive: true,
      currentShow: "Master Chef Special"
    }
  ];

  return (
    <section className="py-12 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Live TV Channels</h2>
            <p className="text-gray-400">Watch your favorite channels live</p>
          </div>
          <button className="text-orange-400 hover:text-orange-300 font-medium">
            View All Channels →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {channels.map((channel) => (
            <div
              key={channel.id}
              className="bg-gray-800/50 rounded-xl overflow-hidden hover:bg-gray-800/70 transition-all duration-300 transform hover:scale-105 group cursor-pointer"
            >
              <div className="relative">
                <img
                  src={channel.thumbnail}
                  alt={channel.name}
                  className="w-full h-40 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300" />
                
                {/* Live indicator */}
                <div className="absolute top-3 left-3 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium flex items-center space-x-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span>LIVE</span>
                </div>

                {/* Viewers count */}
                <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center space-x-1">
                  <Users size={12} />
                  <span>{channel.viewers}</span>
                </div>

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white/90 text-gray-900 p-4 rounded-full hover:bg-white transition-all transform hover:scale-110">
                    <Play size={24} fill="currentColor" />
                  </button>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-semibold text-lg">{channel.name}</h3>
                  <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs">
                    {channel.category}
                  </span>
                </div>
                <p className="text-gray-400 text-sm flex items-center space-x-1">
                  <Tv size={14} />
                  <span>{channel.currentShow}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveTVSection;