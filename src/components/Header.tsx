import React, { useState } from 'react';
import { Search, User, Bell, Menu, X, Tv, Settings, Heart, Download } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-900/95 backdrop-blur-md border-b border-gray-800 z-50">
      <div className="max-w-full mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <Tv size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                  StreamABD Pro
                </h1>
                <p className="text-xs text-gray-400">IPTV Platform</p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search channels, shows, movies..."
                className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <kbd className="px-2 py-1 text-xs text-gray-400 bg-gray-700 rounded">⌘K</kbd>
              </div>
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Mobile search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white transition-colors hover:bg-gray-800 rounded-lg"
            >
              <Search size={20} />
            </button>

            {/* Notifications */}
            <button className="relative p-2 text-gray-300 hover:text-white transition-colors hover:bg-gray-800 rounded-lg">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>

            {/* Favorites */}
            <button className="p-2 text-gray-300 hover:text-white transition-colors hover:bg-gray-800 rounded-lg">
              <Heart size={20} />
            </button>

            {/* Downloads */}
            <button className="p-2 text-gray-300 hover:text-white transition-colors hover:bg-gray-800 rounded-lg">
              <Download size={20} />
            </button>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 p-2 text-gray-300 hover:text-white transition-colors hover:bg-gray-800 rounded-lg"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <span className="hidden sm:block font-medium">Profile</span>
              </button>

              {/* Profile dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 py-2">
                  <div className="px-4 py-3 border-b border-gray-700">
                    <p className="text-white font-medium">John Doe</p>
                    <p className="text-gray-400 text-sm">Premium Member</p>
                  </div>
                  <div className="py-2">
                    <a href="#" className="flex items-center space-x-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors">
                      <User size={16} />
                      <span>My Profile</span>
                    </a>
                    <a href="#" className="flex items-center space-x-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors">
                      <Settings size={16} />
                      <span>Settings</span>
                    </a>
                    <a href="#" className="flex items-center space-x-3 px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors">
                      <Heart size={16} />
                      <span>Watchlist</span>
                    </a>
                  </div>
                  <div className="border-t border-gray-700 pt-2">
                    <button className="w-full text-left px-4 py-2 text-red-400 hover:text-red-300 hover:bg-gray-700 transition-colors">
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Premium Button */}
            <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-2 rounded-xl font-bold hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105 shadow-lg">
              Premium
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white transition-colors hover:bg-gray-800 rounded-lg"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        {isSearchOpen && (
          <div className="md:hidden border-t border-gray-800 py-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search channels, shows, movies..."
                className="w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-800 py-4">
            <div className="flex flex-col space-y-4">
              <a href="#" className="text-white hover:text-orange-400 transition-colors font-medium">Live TV</a>
              <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors font-medium">Movies</a>
              <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors font-medium">TV Shows</a>
              <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors font-medium">Sports</a>
              <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors font-medium">News</a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;