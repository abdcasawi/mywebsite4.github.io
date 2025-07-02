import { Channel } from '../types/Channel';

const channels: Channel[] = [
  {
    id: 1,
    name: "Al Jazeera HD",
    category: "news",
    logo: "https://images.pexels.com/photos/6953876/pexels-photo-6953876.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop",
    thumbnail: "https://drive.google.com/file/d/14e1UjLKMOgmIIuc9KTFgR0lqxfWusL7n/view?usp=sharing",
    streamUrl: "https://live-hls-apps-aja-fa.getaj.net/AJA/index.m3u8",
    viewers: "2.1M",
    currentShow: "Breaking News Live",
    quality: "HD",
    language: "English",
    country: "Qatar",
    description: "International news channel providing comprehensive coverage of global events with in-depth analysis and breaking news updates.",
    isLive: true,
    rating: 8.9
  },
  {
    id: 2,
    name: "Al Jazeera Mubasher",
    category: "news",
    logo: "https://images.pexels.com/photos/7991889/pexels-photo-7991889.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop",
    thumbnail: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    streamUrl: "https://live-hls-apps-ajm-fa.getaj.net/AJM/index.m3u8",
    viewers: "1.8M",
    currentShow: "Live Coverage",
    quality: "HD",
    language: "Arabic",
    country: "Qatar",
    description: "Live Arabic news channel offering continuous coverage of Middle Eastern and international affairs.",
    isLive: true,
    rating: 8.7
  },
  {
    id: 3,
    name: "Al Quran TV",
    category: "entertainment",
    logo: "https://images.pexels.com/photos/7991740/pexels-photo-7991740.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop",
    thumbnail: "https://images.pexels.com/photos/7991803/pexels-photo-7991803.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    streamUrl: "https://ktvlive.online/stream/hls/ch1.m3u8",
    viewers: "1.5M",
    currentShow: "Quran Recitation",
    quality: "HD",
    language: "Arabic",
    country: "Qatar",
    description: "Dedicated Islamic channel featuring Quran recitations, religious programs, and spiritual content.",
    isLive: true,
    rating: 9.2
  },
  {
    id: 4,
    name: "CNN International",
    category: "news",
    logo: "https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop",
    thumbnail: "https://images.pexels.com/photos/7991456/pexels-photo-7991456.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    viewers: "3.2M",
    currentShow: "World News Now",
    quality: "FHD",
    language: "English",
    country: "USA",
    description: "Leading international news network providing 24/7 coverage of global events and breaking news.",
    isLive: true,
    rating: 8.5
  },
  {
    id: 5,
    name: "BBC World News",
    category: "news",
    logo: "https://images.pexels.com/photos/7991622/pexels-photo-7991622.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop",
    thumbnail: "https://images.pexels.com/photos/7991230/pexels-photo-7991230.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    viewers: "2.8M",
    currentShow: "BBC News Hour",
    quality: "FHD",
    language: "English",
    country: "UK",
    description: "British public service broadcaster delivering trusted news and current affairs programming worldwide.",
    isLive: true,
    rating: 9.0
  },
  {
    id: 6,
    name: "ESPN Sports",
    category: "sports",
    logo: "https://images.pexels.com/photos/7991740/pexels-photo-7991740.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop",
    thumbnail: "https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    viewers: "4.1M",
    currentShow: "SportsCenter Live",
    quality: "4K",
    language: "English",
    country: "USA",
    description: "Premier sports entertainment network featuring live games, highlights, and sports analysis.",
    isLive: true,
    rating: 8.8
  },
  {
    id: 7,
    name: "Discovery Channel",
    category: "entertainment",
    logo: "https://images.pexels.com/photos/7991803/pexels-photo-7991803.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop",
    thumbnail: "https://images.pexels.com/photos/7991889/pexels-photo-7991889.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    viewers: "2.3M",
    currentShow: "Planet Earth Documentary",
    quality: "4K",
    language: "English",
    country: "USA",
    description: "Educational entertainment channel featuring documentaries about science, nature, and technology.",
    isLive: true,
    rating: 9.1
  },
  {
    id: 8,
    name: "National Geographic",
    category: "entertainment",
    logo: "https://images.pexels.com/photos/7991960/pexels-photo-7991960.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop",
    thumbnail: "https://images.pexels.com/photos/7991456/pexels-photo-7991456.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    viewers: "1.9M",
    currentShow: "Wild Kingdom",
    quality: "4K",
    language: "English",
    country: "USA",
    description: "Premium documentary channel showcasing wildlife, exploration, and scientific discoveries.",
    isLive: true,
    rating: 9.3
  },
  {
    id: 9,
    name: "MTV Music",
    category: "music",
    logo: "https://images.pexels.com/photos/6953876/pexels-photo-6953876.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop",
    thumbnail: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    viewers: "1.7M",
    currentShow: "Top 40 Countdown",
    quality: "HD",
    language: "English",
    country: "USA",
    description: "Music television network featuring the latest hits, music videos, and entertainment programming.",
    isLive: true,
    rating: 8.2
  },
  {
    id: 10,
    name: "Cartoon Network",
    category: "kids",
    logo: "https://images.pexels.com/photos/7991622/pexels-photo-7991622.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop",
    thumbnail: "https://images.pexels.com/photos/7991740/pexels-photo-7991740.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    viewers: "2.5M",
    currentShow: "Adventure Time",
    quality: "HD",
    language: "English",
    country: "USA",
    description: "Children's entertainment channel featuring animated series, cartoons, and family-friendly content.",
    isLive: true,
    rating: 8.6
  },
  {
    id: 11,
    name: "HBO Max",
    category: "movies",
    logo: "https://images.pexels.com/photos/7991803/pexels-photo-7991803.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop",
    thumbnail: "https://images.pexels.com/photos/7991230/pexels-photo-7991230.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    viewers: "3.8M",
    currentShow: "Blockbuster Movie Night",
    quality: "4K",
    language: "English",
    country: "USA",
    description: "Premium entertainment network featuring blockbuster movies, original series, and exclusive content.",
    isLive: true,
    rating: 9.0
  },
  {
    id: 12,
    name: "Netflix Originals",
    category: "movies",
    logo: "https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop",
    thumbnail: "https://images.pexels.com/photos/7991960/pexels-photo-7991960.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    viewers: "5.2M",
    currentShow: "Original Series Marathon",
    quality: "4K",
    language: "English",
    country: "USA",
    description: "Streaming giant's exclusive channel featuring original movies, series, and documentaries.",
    isLive: true,
    rating: 8.9
  },
  {
    id: 13,
    name: "France 24",
    category: "international",
    logo: "https://images.pexels.com/photos/7991889/pexels-photo-7991889.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop",
    thumbnail: "https://images.pexels.com/photos/7991456/pexels-photo-7991456.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    viewers: "1.4M",
    currentShow: "European News",
    quality: "HD",
    language: "French",
    country: "France",
    description: "French international news channel providing European perspective on global events.",
    isLive: true,
    rating: 8.3
  },
  {
    id: 14,
    name: "Deutsche Welle",
    category: "international",
    logo: "https://images.pexels.com/photos/7991740/pexels-photo-7991740.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop",
    thumbnail: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    viewers: "980K",
    currentShow: "German News Today",
    quality: "HD",
    language: "German",
    country: "Germany",
    description: "German international broadcaster offering news and cultural programming in multiple languages.",
    isLive: true,
    rating: 8.1
  },
  {
    id: 15,
    name: "Sky Sports Premier",
    category: "premium",
    logo: "https://images.pexels.com/photos/6953876/pexels-photo-6953876.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&fit=crop",
    thumbnail: "https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
    viewers: "6.1M",
    currentShow: "Premier League Live",
    quality: "4K",
    language: "English",
    country: "UK",
    description: "Premium sports channel featuring exclusive coverage of Premier League and major sporting events.",
    isLive: true,
    rating: 9.4
  }
];

export const getChannelsByCategory = (category: string): Channel[] => {
  if (category === 'all') {
    return channels;
  }
  return channels.filter(channel => channel.category === category);
};

export const getFeaturedChannels = (): Channel[] => {
  return channels.filter(channel => 
    channel.rating >= 9.0 || 
    channel.category === 'premium' || 
    parseInt(channel.viewers.replace(/[^\d]/g, '')) > 3000
  ).slice(0, 5);
};

export const getChannelById = (id: number): Channel | undefined => {
  return channels.find(channel => channel.id === id);
};

export default channels;