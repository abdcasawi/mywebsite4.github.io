import React from 'react';
import { Tv, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Tv size={28} className="text-orange-400" />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">
                StreamHub
              </h3>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Your ultimate destination for premium entertainment. Stream thousands of movies, TV shows, 
              and live channels in stunning quality.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Live TV</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Movies</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">TV Shows</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Sports</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">News</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Kids</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Accessibility</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 StreamHub. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">Available on:</span>
              <div className="flex space-x-4">
                <div className="bg-gray-800 px-3 py-1 rounded text-gray-300 text-sm">iOS</div>
                <div className="bg-gray-800 px-3 py-1 rounded text-gray-300 text-sm">Android</div>
                <div className="bg-gray-800 px-3 py-1 rounded text-gray-300 text-sm">Web</div>
                <div className="bg-gray-800 px-3 py-1 rounded text-gray-300 text-sm">Smart TV</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;