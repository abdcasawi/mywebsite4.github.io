import React, { useState } from 'react';
import { Search, User, Bell, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
              StreamHub
            </h1>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-white hover:text-orange-400 transition-colors font-medium">Live TV</a>
            <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors font-medium">Movies</a>
            <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors font-medium">TV Shows</a>
            <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors font-medium">Sports</a>
            <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors font-medium">News</a>
            <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors font-medium">Kids</a>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-gray-300 hover:text-white transition-colors"
              >
                <Search size={20} />
              </button>
              {isSearchOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
                  <input
                    type="text"
                    placeholder="Search movies, shows, channels..."
                    className="w-full px-4 py-3 bg-transparent text-white placeholder-gray-400 focus:outline-none"
                    autoFocus
                  />
                </div>
              )}
            </div>

            {/* Notifications */}
            <button className="p-2 text-gray-300 hover:text-white transition-colors relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>

            {/* User Profile */}
            <button className="flex items-center space-x-2 p-2 text-gray-300 hover:text-white transition-colors">
              <User size={20} />
              <span className="hidden sm:block">Profile</span>
            </button>

            {/* Premium Button */}
            <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105">
              Premium
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-800 py-4">
            <div className="flex flex-col space-y-4">
              <a href="#" className="text-white hover:text-orange-400 transition-colors font-medium">Live TV</a>
              <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors font-medium">Movies</a>
              <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors font-medium">TV Shows</a>
              <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors font-medium">Sports</a>
              <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors font-medium">News</a>
              <a href="#" className="text-gray-300 hover:text-orange-400 transition-colors font-medium">Kids</a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;