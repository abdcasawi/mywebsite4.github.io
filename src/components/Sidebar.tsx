import React from 'react';
import { 
  Tv, 
  Film, 
  Newspaper, 
  Trophy, 
  Music, 
  Baby, 
  Globe, 
  Heart,
  Zap,
  Star,
  Users,
  Settings,
  Search
} from 'lucide-react';

interface SidebarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedCategory, onCategoryChange }) => {
  const categories = [
    { id: 'all', name: 'All Channels', icon: Tv, count: 500 },
    { id: 'entertainment', name: 'Entertainment', icon: Star, count: 120 },
    { id: 'news', name: 'News', icon: Newspaper, count: 85 },
    { id: 'sports', name: 'Sports', icon: Trophy, count: 95 },
    { id: 'movies', name: 'Movies', icon: Film, count: 75 },
    { id: 'music', name: 'Music', icon: Music, count: 45 },
    { id: 'kids', name: 'Kids', icon: Baby, count: 35 },
    { id: 'international', name: 'International', icon: Globe, count: 180 },
    { id: 'premium', name: 'Premium', icon: Zap, count: 25 },
    { id: 'favorites', name: 'Favorites', icon: Heart, count: 12 }
  ];

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-gray-900/95 backdrop-blur-sm border-r border-gray-800 overflow-y-auto">
      <div className="p-6">
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search channels..."
            className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Categories */}
        <div className="space-y-2">
          <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-4">
            Categories
          </h3>
          
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 group ${
                  isSelected
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                    : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon 
                    size={20} 
                    className={`${
                      isSelected ? 'text-white' : 'text-gray-400 group-hover:text-orange-400'
                    } transition-colors`}
                  />
                  <span className="font-medium">{category.name}</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  isSelected 
                    ? 'bg-white/20 text-white' 
                    : 'bg-gray-700 text-gray-400 group-hover:bg-gray-600'
                }`}>
                  {category.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-4">
            Quick Actions
          </h3>
          
          <div className="space-y-2">
            <button className="w-full flex items-center space-x-3 p-3 text-gray-300 hover:bg-gray-800/50 hover:text-white rounded-xl transition-all">
              <Users size={20} className="text-gray-400" />
              <span>Recently Watched</span>
            </button>
            
            <button className="w-full flex items-center space-x-3 p-3 text-gray-300 hover:bg-gray-800/50 hover:text-white rounded-xl transition-all">
              <Settings size={20} className="text-gray-400" />
              <span>Settings</span>
            </button>
          </div>
        </div>

        {/* Premium Upgrade */}
        <div className="mt-8 p-4 bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl">
          <div className="text-center">
            <Zap className="mx-auto mb-2 text-orange-400" size={24} />
            <h4 className="text-white font-semibold mb-1">Go Premium</h4>
            <p className="text-gray-400 text-xs mb-3">
              Unlock 4K streams and exclusive content
            </p>
            <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-lg text-sm font-medium hover:from-orange-600 hover:to-red-600 transition-all">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;