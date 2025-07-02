import React from 'react';
import { Play, Users, Star, Wifi, Globe, Crown } from 'lucide-react';
import { Channel } from '../types/Channel';
import { getChannelsByCategory } from '../data/channels';

interface ChannelGridProps {
  selectedCategory: string;
  onChannelSelect: (channel: Channel) => void;
}

const ChannelGrid: React.FC<ChannelGridProps> = ({ selectedCategory, onChannelSelect }) => {
  const channels = getChannelsByCategory(selectedCategory);

  const getQualityBadgeColor = (quality: string) => {
    switch (quality) {
      case '4K': return 'bg-purple-600';
      case 'FHD': return 'bg-blue-600';
      case 'HD': return 'bg-green-600';
      default: return 'bg-gray-600';
    }
  };

  const getCountryFlag = (country: string) => {
    const flags: { [key: string]: string } = {
      'Qatar': '🇶🇦',
      'USA': '🇺🇸',
      'UK': '🇬🇧',
      'India': '🇮🇳',
      'France': '🇫🇷',
      'Germany': '🇩🇪',
      'Spain': '🇪🇸',
      'Italy': '🇮🇹',
      'Brazil': '🇧🇷',
      'Japan': '🇯🇵'
    };
    return flags[country] || '🌍';
  };

  return (
    <section className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">
              {selectedCategory === 'all' ? 'All Channels' : 
               selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
            </h2>
            <p className="text-gray-400">
              {channels.length} channels available • Live streaming in HD quality
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <select className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
              <option>Sort by Popularity</option>
              <option>Sort by Name</option>
              <option>Sort by Quality</option>
              <option>Sort by Country</option>
            </select>
            
            <div className="flex bg-gray-800 rounded-lg p-1">
              <button className="px-3 py-1 bg-orange-500 text-white rounded text-sm">Grid</button>
              <button className="px-3 py-1 text-gray-400 hover:text-white rounded text-sm">List</button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {channels.map((channel) => (
          <div
            key={channel.id}
            onClick={() => channel.streamUrl && onChannelSelect(channel)}
            className={`group relative bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
              channel.streamUrl ? 'cursor-pointer' : 'cursor-not-allowed opacity-75'
            }`}
          >
            {/* Thumbnail */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={channel.thumbnail}
                alt={channel.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              {/* Live indicator */}
              {channel.isLive && (
                <div className="absolute top-3 left-3 flex items-center space-x-2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span>LIVE</span>
                </div>
              )}

              {/* Quality badge */}
              <div className={`absolute top-3 right-3 ${getQualityBadgeColor(channel.quality)} text-white px-2 py-1 rounded text-xs font-bold`}>
                {channel.quality}
              </div>

              {/* Viewers count */}
              <div className="absolute bottom-3 left-3 flex items-center space-x-1 bg-black/70 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs">
                <Users size={12} />
                <span>{channel.viewers}</span>
              </div>

              {/* Country flag */}
              <div className="absolute bottom-3 right-3 text-lg">
                {getCountryFlag(channel.country)}
              </div>

              {/* Play button overlay */}
              {channel.streamUrl && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white/95 text-gray-900 p-4 rounded-full hover:bg-white transition-all transform hover:scale-110 shadow-2xl">
                    <Play size={24} fill="currentColor" />
                  </button>
                </div>
              )}

              {/* Premium indicator */}
              {channel.category === 'premium' && (
                <div className="absolute top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                  <Crown size={12} />
                  <span>PREMIUM</span>
                </div>
              )}
            </div>

            {/* Channel info */}
            <div className="p-4">
              {/* Channel logo and name */}
              <div className="flex items-center space-x-3 mb-3">
                <img
                  src={channel.logo}
                  alt={`${channel.name} logo`}
                  className="w-10 h-10 rounded-lg object-cover border border-gray-600"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-bold text-lg group-hover:text-orange-400 transition-colors truncate">
                    {channel.name}
                  </h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <span>{channel.language}</span>
                    <span>•</span>
                    <span className="capitalize">{channel.category}</span>
                  </div>
                </div>
              </div>

              {/* Current show */}
              <div className="mb-3">
                <p className="text-gray-300 text-sm font-medium mb-1">Now Playing:</p>
                <p className="text-gray-400 text-sm truncate">{channel.currentShow}</p>
              </div>

              {/* Rating and status */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Star size={14} fill="currentColor" className="text-yellow-400" />
                  <span className="text-white text-sm font-medium">{channel.rating}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  {channel.streamUrl ? (
                    <div className="flex items-center space-x-1 text-green-400 text-xs">
                      <Wifi size={12} />
                      <span>Available</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1 text-gray-500 text-xs">
                      <Globe size={12} />
                      <span>Coming Soon</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load more button */}
      {channels.length > 0 && (
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white px-8 py-3 rounded-xl font-medium transition-all transform hover:scale-105 border border-gray-600">
            Load More Channels
          </button>
        </div>
      )}
    </section>
  );
};

export default ChannelGrid;