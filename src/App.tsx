import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChannelGrid from './components/ChannelGrid';
import LiveTVPlayer from './components/LiveTVPlayer';
import FeaturedContent from './components/FeaturedContent';
import { Channel } from './types/Channel';

function App() {
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isPlayerFullscreen, setIsPlayerFullscreen] = useState(false);

  const handleChannelSelect = (channel: Channel) => {
    setSelectedChannel(channel);
  };

  const handleClosePlayer = () => {
    setSelectedChannel(null);
    setIsPlayerFullscreen(false);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <Header />
      
      <div className="flex">
        <Sidebar 
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
        
        <main className="flex-1 ml-64">
          <FeaturedContent onChannelSelect={handleChannelSelect} />
          <ChannelGrid 
            selectedCategory={selectedCategory}
            onChannelSelect={handleChannelSelect}
          />
        </main>
      </div>

      {selectedChannel && (
        <LiveTVPlayer
          streamUrl={selectedChannel.streamUrl}
          channelName={selectedChannel.name}
          channelLogo={selectedChannel.logo}
          onClose={handleClosePlayer}
          isFullscreen={isPlayerFullscreen}
          onFullscreenChange={setIsPlayerFullscreen}
        />
      )}
    </div>
  );
}

export default App;