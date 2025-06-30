import React, { useState } from 'react';
import { Play, Users, Tv, Radio } from 'lucide-react';
import LiveTVPlayer from './LiveTVPlayer';

const LiveChannelsSection = () => {
  const [selectedChannel, setSelectedChannel] = useState<any>(null);

  const channelCategories = [
    {
      category: "Entertainment",
      channels: [
        {
          id: 1,
          name: "Al Jazeera HD",
          viewers: "2.1M",
          thumbnail: "https://logowik.com/content/uploads/images/al-jazeera-tv6503.jpg",
          currentShow: "Breaking News Live",
          logo: "https://images.pexels.com/photos/6953876/pexels-photo-6953876.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop",
          streamUrl: "https://live-hls-apps-aja-fa.getaj.net/AJA/index.m3u8"
        },
        {
          id: 2,
          name: "al jazeera mubasher",
          viewers: "1.8M",
          thumbnail: "https://logowik.com/content/uploads/images/al-jazeere-tv1251.logowik.com.webp",
          currentShow: "Bigg Boss", 
          streamUrl: "https://live-hls-apps-ajm-fa.getaj.net/AJM/index.m3u8"
          },
        
        {
          id: 3,
          name: "Al Quran Tv",
          viewers: "1.5M",
          thumbnail: "https://makkahlive.net/readquranonline.aspx",
          currentShow: "The Kapil Sharma Show",
          logo: "https://images.pexels.com/photos/7991889/pexels-photo-7991889.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop", 
         streamUrl: "https://ktvlive.online/stream/hls/ch1.m3u8"
        }
      ]
    },
    {
      category: "News",
      channels: [
        {
          id: 4,
          name: "CNN News18",
          viewers: "950K",
          thumbnail: "https://images.pexels.com/photos/7991960/pexels-photo-7991960.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
          currentShow: "Breaking News",
          logo: "https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop"
        },
        {
          id: 5,
          name: "Times Now",
          viewers: "720K",
          thumbnail: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
          currentShow: "Newshour Debate",
          logo: "https://images.pexels.com/photos/7991622/pexels-photo-7991622.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop"
        }
      ]
    },
    {
      category: "Sports",
      channels: [
        {
          id: 6,
          name: "Star Sports 1",
          viewers: "3.2M",
          thumbnail: "https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
          currentShow: "IPL 2024 Live",
          logo: "https://images.pexels.com/photos/7991740/pexels-photo-7991740.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop"
        },
        {
          id: 7,
          name: "Sony Sports",
          viewers: "1.9M",
          thumbnail: "https://images.pexels.com/photos/7991803/pexels-photo-7991803.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
          currentShow: "Premier League",
          logo: "https://images.pexels.com/photos/7991889/pexels-photo-7991889.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop"
        }
      ]
    },
    {
      category: "Movies",
      channels: [
        {
          id: 8,
          name: "Star Gold",
          viewers: "1.4M",
          thumbnail: "https://images.pexels.com/photos/7991960/pexels-photo-7991960.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
          currentShow: "Bollywood Blockbuster",
          logo: "https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop"
        },
        {
          id: 9,
          name: "Zee Cinema",
          viewers: "1.1M",
          thumbnail: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop",
          currentShow: "Classic Movies",
          logo: "https://images.pexels.com/photos/7991622/pexels-photo-7991622.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop"
        }
      ]
    }
  ];

  const handleChannelClick = (channel: any) => {
    if (channel.streamUrl) {
      setSelectedChannel(channel);
    } else {
      // For channels without stream URLs, you could show a "Coming Soon" message
      alert(`${channel.name} streaming will be available soon!`);
    }
  };

  const closePlayer = () => {
    setSelectedChannel(null);
  };

  return (
    <>
      <section className="py-16 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Live Channels</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Watch your favorite channels live with crystal clear quality and zero buffering
            </p>
          </div>

          {channelCategories.map((categoryData, categoryIndex) => (
            <div key={categoryIndex} className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white flex items-center space-x-2">
                  <Radio className="text-orange-400" size={24} />
                  <span>{categoryData.category}</span>
                </h3>
                <button className="text-orange-400 hover:text-orange-300 font-medium transition-colors">
                  View All →
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryData.channels.map((channel) => (
                  <div
                    key={channel.id}
                    onClick={() => handleChannelClick(channel)}
                    className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-xl overflow-hidden hover:from-gray-800/80 hover:to-gray-900/80 transition-all duration-300 transform hover:scale-105 group cursor-pointer border border-gray-700/50"
                  >
                    <div className="relative">
                      <img
                        src={channel.thumbnail}
                        alt={channel.name}
                        className="w-full h-44 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Live indicator */}
                      <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-2 shadow-lg">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        <span>LIVE</span>
                      </div>

                      {/* Viewers count */}
                      <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs flex items-center space-x-1">
                        <Users size={12} />
                        <span>{channel.viewers}</span>
                      </div>

                      {/* Channel logo */}
                      <div className="absolute bottom-3 left-3">
                        <img
                          src={channel.logo}
                          alt={`${channel.name} logo`}
                          className="w-12 h-12 rounded-lg border-2 border-white/20 shadow-lg object-cover"
                        />
                      </div>

                      {/* Play button */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="bg-white/95 text-gray-900 p-4 rounded-full hover:bg-white transition-all transform hover:scale-110 shadow-2xl">
                          <Play size={24} fill="currentColor" />
                        </button>
                      </div>

                      {/* Stream available indicator */}
                      {channel.streamUrl && (
                        <div className="absolute bottom-3 right-3 bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">
                          HD
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-white font-bold text-lg group-hover:text-orange-400 transition-colors">
                          {channel.name}
                        </h4>
                        <span className="bg-blue-600/80 text-white px-2 py-1 rounded text-xs font-medium">
                          {categoryData.category}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-300 text-sm">
                        <Tv size={14} className="mr-2 text-orange-400" />
                        <span className="truncate">{channel.currentShow}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* View All Channels Button */}
          <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105 shadow-lg">
              Browse All 500+ Channels
            </button>
          </div>
        </div>
      </section>

      {/* Live TV Player Modal */}
      {selectedChannel && (
        <LiveTVPlayer
          streamUrl={selectedChannel.streamUrl}
          channelName={selectedChannel.name}
          onClose={closePlayer}
        />
      )}
    </>
  );
};

export default LiveChannelsSection;