import React, { useRef, useEffect, useState } from 'react';
import Hls from 'hls.js';
import { 
  X, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  Play, 
  Pause, 
  RotateCcw, 
  Settings,
  Monitor,
  Smartphone,
  Cast,
  Download,
  Share,
  Heart,
  MessageCircle,
  Wifi,
  Signal
} from 'lucide-react';

interface LiveTVPlayerProps {
  streamUrl: string;
  channelName: string;
  channelLogo?: string;
  onClose: () => void;
  isFullscreen?: boolean;
  onFullscreenChange?: (isFullscreen: boolean) => void;
}

const LiveTVPlayer: React.FC<LiveTVPlayerProps> = ({ 
  streamUrl, 
  channelName, 
  channelLogo,
  onClose,
  isFullscreen = false,
  onFullscreenChange
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPlayerFullscreen, setIsPlayerFullscreen] = useState(isFullscreen);
  const [streamInfo, setStreamInfo] = useState<any>(null);
  const [qualityLevels, setQualityLevels] = useState<any[]>([]);
  const [currentQuality, setCurrentQuality] = useState(-1);
  const [showSettings, setShowSettings] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [viewerCount, setViewerCount] = useState('2.1M');
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'error'>('connecting');

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    setIsLoading(true);
    setError(null);
    setConnectionStatus('connecting');

    // Clean up previous instance
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    // Check if HLS is supported
    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 90,
        maxBufferLength: 30,
        maxMaxBufferLength: 600,
        maxBufferSize: 60 * 1000 * 1000,
        maxBufferHole: 0.5,
        highBufferWatchdogPeriod: 2,
        nudgeOffset: 0.1,
        nudgeMaxRetry: 3,
        maxFragLookUpTolerance: 0.25,
        liveSyncDurationCount: 3,
        liveMaxLatencyDurationCount: Infinity,
        liveDurationInfinity: false,
        liveBackBufferLength: Infinity,
        maxLiveSyncPlaybackRate: 1,
        manifestLoadingTimeOut: 10000,
        manifestLoadingMaxRetry: 3,
        manifestLoadingRetryDelay: 1000,
        levelLoadingTimeOut: 10000,
        levelLoadingMaxRetry: 4,
        levelLoadingRetryDelay: 1000,
        fragLoadingTimeOut: 20000,
        fragLoadingMaxRetry: 6,
        fragLoadingRetryDelay: 1000,
        startFragPrefetch: false,
        testBandwidth: true,
        progressive: false,
        debug: false
      });
      
      hlsRef.current = hls;
      
      hls.loadSource(streamUrl);
      hls.attachMedia(video);
      
      hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
        console.log('HLS manifest loaded, found ' + data.levels.length + ' quality levels');
        setIsLoading(false);
        setConnectionStatus('connected');
        setQualityLevels(data.levels);
        setStreamInfo({
          levels: data.levels.length,
          firstLevel: data.firstLevel,
          audioTracks: data.audioTracks?.length || 0,
          subtitles: data.subtitleTracks?.length || 0
        });
        
        // Auto-play with user gesture handling
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch((error) => {
              console.warn('Auto-play failed:', error);
              setIsPlaying(false);
            });
        }
      });

      hls.on(Hls.Events.LEVEL_SWITCHED, (event, data) => {
        setCurrentQuality(data.level);
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error('HLS Error:', data);
        
        if (data.fatal) {
          setConnectionStatus('error');
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              setError('Network error: Unable to load the stream. Please check your connection.');
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              setError('Media error: The stream format is not supported.');
              break;
            default:
              setError('Fatal error: Unable to play the stream.');
              break;
          }
          setIsLoading(false);
        } else {
          // Try to recover from non-fatal errors
          if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
            console.log('Trying to recover from media error');
            hls.recoverMediaError();
          }
        }
      });

      hls.on(Hls.Events.FRAG_LOADED, () => {
        if (error) {
          setError(null);
          setConnectionStatus('connected');
        }
      });

    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native HLS support (Safari)
      video.src = streamUrl;
      
      const handleLoadedMetadata = () => {
        setIsLoading(false);
        setConnectionStatus('connected');
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch((error) => {
              console.warn('Auto-play failed:', error);
              setIsPlaying(false);
            });
        }
      };
      
      const handleError = () => {
        setError('Failed to load HLS stream. Please try again.');
        setIsLoading(false);
        setConnectionStatus('error');
      };

      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      video.addEventListener('error', handleError);
      
      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.removeEventListener('error', handleError);
      };
    } else {
      setError('HLS streaming is not supported in this browser.');
      setIsLoading(false);
      setConnectionStatus('error');
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [streamUrl]);

  // Auto-hide controls
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    const resetTimer = () => {
      setShowControls(true);
      clearTimeout(timer);
      timer = setTimeout(() => setShowControls(false), 3000);
    };

    const handleMouseMove = () => resetTimer();
    const handleMouseLeave = () => {
      clearTimeout(timer);
      timer = setTimeout(() => setShowControls(false), 1000);
    };

    if (isPlayerFullscreen) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseleave', handleMouseLeave);
      resetTimer();
    } else {
      setShowControls(true);
    }

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isPlayerFullscreen]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().then(() => {
        setIsPlaying(true);
      }).catch(console.error);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleVolumeChange = (newVolume: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = newVolume;
    setVolume(newVolume);
    if (newVolume === 0) {
      video.muted = true;
      setIsMuted(true);
    } else if (video.muted) {
      video.muted = false;
      setIsMuted(false);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current?.requestFullscreen().catch(console.error);
      setIsPlayerFullscreen(true);
      onFullscreenChange?.(true);
    } else {
      document.exitFullscreen().catch(console.error);
      setIsPlayerFullscreen(false);
      onFullscreenChange?.(false);
    }
  };

  const restartStream = () => {
    const video = videoRef.current;
    if (!video) return;

    setIsLoading(true);
    setError(null);
    setConnectionStatus('connecting');
    
    if (hlsRef.current) {
      hlsRef.current.stopLoad();
      hlsRef.current.startLoad();
    } else {
      video.load();
    }
    
    setTimeout(() => {
      video.play().then(() => {
        setIsPlaying(true);
      }).catch(console.error);
    }, 1000);
  };

  const changeQuality = (levelIndex: number) => {
    if (hlsRef.current) {
      hlsRef.current.currentLevel = levelIndex;
      setCurrentQuality(levelIndex);
      setShowSettings(false);
    }
  };

  const getQualityLabel = (level: any) => {
    if (level.height) {
      return `${level.height}p`;
    } else if (level.bitrate) {
      return `${Math.round(level.bitrate / 1000)}k`;
    }
    return 'Unknown';
  };

  const getConnectionStatusIcon = () => {
    switch (connectionStatus) {
      case 'connected':
        return <Signal size={16} className="text-green-400" />;
      case 'error':
        return <X size={16} className="text-red-400" />;
      default:
        return <Wifi size={16} className="text-yellow-400 animate-pulse" />;
    }
  };

  const getConnectionStatusText = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'Connected';
      case 'error':
        return 'Connection Error';
      default:
        return 'Connecting...';
    }
  };

  return (
    <div className={`fixed inset-0 bg-black z-50 flex items-center justify-center ${isPlayerFullscreen ? 'p-0' : 'p-4'}`}>
      <div className={`relative bg-gray-900 overflow-hidden shadow-2xl ${isPlayerFullscreen ? 'w-full h-full' : 'w-full max-w-6xl rounded-2xl'}`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-4 bg-gray-800/95 backdrop-blur-sm border-b border-gray-700 transition-transform duration-300 ${
          isPlayerFullscreen && !showControls ? '-translate-y-full' : 'translate-y-0'
        }`}>
          <div className="flex items-center space-x-4">
            {channelLogo && (
              <img
                src={channelLogo}
                alt={`${channelName} logo`}
                className="w-10 h-10 rounded-lg object-cover border border-gray-600"
              />
            )}
            <div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <h3 className="text-white font-bold text-lg">{channelName}</h3>
                <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">LIVE</span>
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">HD</span>
              </div>
              <div className="flex items-center space-x-4 mt-1">
                <span className="text-gray-400 text-sm">{viewerCount} viewers</span>
                <div className="flex items-center space-x-1 text-gray-400 text-sm">
                  {getConnectionStatusIcon()}
                  <span>{getConnectionStatusText()}</span>
                </div>
                {streamInfo && (
                  <span className="text-gray-400 text-sm">
                    {streamInfo.levels} quality levels
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-2 rounded-lg transition-colors ${
                isFavorite ? 'text-red-400 bg-red-400/20' : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
            
            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
              <Share size={20} />
            </button>
            
            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors">
              <Cast size={20} />
            </button>
            
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Video Player */}
        <div className="relative bg-black">
          <video
            ref={videoRef}
            className={`w-full ${isPlayerFullscreen ? 'h-screen' : 'aspect-video'} bg-black`}
            controls={false}
            muted={isMuted}
            playsInline
            preload="metadata"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onVolumeChange={(e) => {
              const video = e.target as HTMLVideoElement;
              setIsMuted(video.muted);
              setVolume(video.volume);
            }}
            onWaiting={() => setIsLoading(true)}
            onCanPlay={() => setIsLoading(false)}
            onLoadStart={() => setIsLoading(true)}
            onLoadedData={() => setIsLoading(false)}
          />

          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
                <p className="text-white text-lg mb-2">Loading Stream...</p>
                <p className="text-gray-400 text-sm">Connecting to {channelName}</p>
                <div className="flex items-center justify-center space-x-2 mt-3">
                  {getConnectionStatusIcon()}
                  <span className="text-gray-400 text-sm">{getConnectionStatusText()}</span>
                </div>
              </div>
            </div>
          )}

          {/* Error Overlay */}
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/90">
              <div className="text-center p-8 max-w-md">
                <div className="text-red-500 mb-6">
                  <X size={64} className="mx-auto" />
                </div>
                <h3 className="text-white text-xl font-bold mb-4">Stream Unavailable</h3>
                <p className="text-gray-300 mb-6">{error}</p>
                <div className="space-y-3">
                  <button
                    onClick={restartStream}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
                  >
                    <RotateCcw size={18} />
                    <span>Retry Connection</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    Close Player
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Settings Panel */}
          {showSettings && qualityLevels.length > 0 && (
            <div className="absolute top-4 right-4 bg-black/95 backdrop-blur-sm rounded-xl p-6 min-w-64 border border-gray-700">
              <h4 className="text-white font-bold text-lg mb-4">Stream Settings</h4>
              
              <div className="space-y-4">
                <div>
                  <h5 className="text-gray-300 font-medium mb-3">Video Quality</h5>
                  <div className="space-y-2">
                    <button
                      onClick={() => changeQuality(-1)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        currentQuality === -1 ? 'bg-orange-500 text-white' : 'text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>Auto (Recommended)</span>
                        <Monitor size={16} />
                      </div>
                    </button>
                    {qualityLevels.map((level, index) => (
                      <button
                        key={index}
                        onClick={() => changeQuality(index)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                          currentQuality === index ? 'bg-orange-500 text-white' : 'text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{getQualityLabel(level)} - {Math.round(level.bitrate / 1000)}kbps</span>
                          <Smartphone size={16} />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Controls Overlay */}
          <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 transition-transform duration-300 ${
            isPlayerFullscreen && !showControls ? 'translate-y-full' : 'translate-y-0'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <button
                  onClick={togglePlay}
                  className="text-white hover:text-orange-400 transition-colors p-3 hover:bg-black/50 rounded-xl"
                >
                  {isPlaying ? <Pause size={28} /> : <Play size={28} />}
                </button>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={toggleMute}
                    className="text-white hover:text-orange-400 transition-colors p-2 hover:bg-black/50 rounded-lg"
                  >
                    {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                    className="w-24 accent-orange-500"
                  />
                  <span className="text-white text-sm min-w-[3rem]">
                    {Math.round((isMuted ? 0 : volume) * 100)}%
                  </span>
                </div>
                
                <button
                  onClick={restartStream}
                  className="text-white hover:text-orange-400 transition-colors p-2 hover:bg-black/50 rounded-lg"
                  title="Restart Stream"
                >
                  <RotateCcw size={22} />
                </button>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-black/50 px-3 py-2 rounded-lg">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-white text-sm font-medium">LIVE</span>
                </div>
                
                {qualityLevels.length > 0 && (
                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="text-white hover:text-orange-400 transition-colors p-2 hover:bg-black/50 rounded-lg"
                    title="Stream Settings"
                  >
                    <Settings size={22} />
                  </button>
                )}
                
                <button
                  onClick={toggleFullscreen}
                  className="text-white hover:text-orange-400 transition-colors p-2 hover:bg-black/50 rounded-lg"
                >
                  {isPlayerFullscreen ? <Minimize size={22} /> : <Maximize size={22} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stream Info Footer */}
        {!isPlayerFullscreen && (
          <div className="p-4 bg-gray-800 border-t border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div>
                  <p className="text-gray-300 text-sm">Now Streaming</p>
                  <p className="text-white font-medium">Live HLS Stream</p>
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Quality</p>
                  <p className="text-white font-medium">
                    {currentQuality === -1 ? 'Auto' : 
                     qualityLevels[currentQuality] ? getQualityLabel(qualityLevels[currentQuality]) : 'Auto'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Connection</p>
                  <div className="flex items-center space-x-1">
                    {getConnectionStatusIcon()}
                    <span className="text-white font-medium text-sm">{getConnectionStatusText()}</span>
                  </div>
                </div>
                {streamInfo && (
                  <div>
                    <p className="text-gray-300 text-sm">Stream Info</p>
                    <p className="text-white font-medium text-sm">
                      {streamInfo.levels} levels • {streamInfo.audioTracks} audio tracks
                    </p>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
                  <MessageCircle size={16} />
                  <span>Chat</span>
                </button>
                <button className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors">
                  <Download size={16} />
                  <span>Record</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveTVPlayer;