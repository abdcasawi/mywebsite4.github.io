export interface Channel {
  id: number;
  name: string;
  category: string;
  logo: string;
  thumbnail: string;
  streamUrl?: string;
  viewers: string;
  currentShow: string;
  quality: 'HD' | 'FHD' | '4K' | 'SD';
  language: string;
  country: string;
  description: string;
  isLive: boolean;
  rating: number;
}

export interface ChannelCategory {
  id: string;
  name: string;
  icon: string;
  channels: Channel[];
}