import React, { useRef, useEffect, useState } from 'react';
import shaka from 'shaka-player/dist/shaka-player.ui.js';
import 'shaka-player/dist/controls.css';
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
  MessageCircle
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
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<shaka.Player | null>(null);
  const uiRef = useRef<shaka.ui.Overlay | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
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

  useEffect(() => {
    const video = videoRef.current;
    const videoContainer = videoContainerRef.current;
    if (!video || !videoContainer) return;

    setIsLoading(true);
    setError(null);

    // Clean up previous instance
    if (uiRef.current) {
      uiRef.current.destroy();
      uiRef.current = null;
    }
    if (playerRef.current) {
      playerRef.current.destroy();
      playerRef.current = null;
    }

    // Install built-in polyfills to patch browser incompatibilities
    shaka.polyfill.installAll();

    // Check to see if the browser supports the basic APIs Shaka needs
    if (shaka.Player.isBrowserSupported()) {
      // Create a Player instance
      const player = new shaka.Player(video);
      playerRef.current = player;

      // Configure the player
      player.configure({
        streaming: {
          rebufferingGoal: 10,
          bufferingGoal: 30,
          bufferBehind: 30,
          retryParameters: {
            timeout: 30000,
            maxAttempts: 4,
            baseDelay: 1000,
            backoffFactor: 2,
            fuzzFactor: 0.5
          },
          stallEnabled: true,
          stallThreshold: 1,
          stallSkip: 0.1,
          useNativeHlsOnSafari: true,
          lowLatencyMode: true,
          inaccurateManifestTolerance: 0,
          liveSync: true
        },
        abr: {
          enabled: true,
          useNetworkInformation: true,
          defaultBandwidthEstimate: 1000000,
          switchInterval: 8,
          bandwidthUpgradeTarget: 0.85,
          bandwidthDowngradeTarget: 0.95
        },
        manifest: {
          retryParameters: {
            timeout: 30000,
            maxAttempts: 4,
            baseDelay: 1000,
            backoffFactor: 2,
            fuzzFactor: 0.5
          },
          availabilityWindowOverride: 0,
          disableAudio: false,
          disableVideo: false,
          disableText: true,
          defaultPresentationDelay: 10,
          segmentRelativeVttTiming: false
        }
      });

      // Create UI overlay
      const ui = new shaka.ui.Overlay(player, videoContainer, video);
      uiRef.current = ui;

      // Configure UI
      const config = {
        addSeekBar: false,
        addBigPlayButton: false,
        controlPanelElements: [
          'play_pause',
          'mute',
          'volume',
          'fullscreen'
        ],
        overflowMenuButtons: [
          'quality',
          'captions',
          'cast'
        ],
        fadeDelay: 3000,
        doubleClickForFullscreen: true,
        singleClickForPlayAndPause: true,
        enableKeyboardPlaybackControls: true,
        enableFullscreenOnRotation: true,
        forceLandscapeOnFullscreen: true
      };
      ui.configure(config);

      // Listen for error events
      player.addEventListener('error', (event: any) => {
        console.error('Shaka Player Error:', event.detail);
        const errorDetail = event.detail;
        
        if (errorDetail.severity === shaka.util.Error.Severity.CRITICAL) {
          setError(`Critical error: ${errorDetail.message || 'Unable to play the stream'}`);
          setIsLoading(false);
        } else {
          console.warn('Non-critical Shaka error:', errorDetail.message);
        }
      });

      // Listen for adaptation events
      player.addEventListener('adaptation', () => {
        const tracks = player.getVariantTracks();
        const activeTrack = tracks.find(track => track.active);
        if (activeTrack) {
          setCurrentQuality(activeTrack.height || 0);
        }
      });

      // Listen for loading events
      player.addEventListener('loading', () => {
        setIsLoading(true);
      });

      player.addEventListener('loaded', () => {
        setIsLoading(false);
        const tracks = player.getVariantTracks();
        setQualityLevels(tracks);
        setStreamInfo({
          levels: tracks.length,
          audioTracks: player.getAudioLanguages().length,
          subtitles: player.getTextTracks().length
        });
      });

      // Load the manifest
      player.load(streamUrl).then(() => {
        console.log('Stream loaded successfully');
        setIsLoading(false);
        video.play().catch((err) => {
          console.warn('Auto-play failed:', err);
          setIsPlaying(false);
        });
      }).catch((error) => {
        console.error('Error loading stream:', error);
        setError(`Failed to load stream: ${error.message}`);
        setIsLoading(false);
      });

    } else {
      setError('Browser not supported for adaptive streaming');
      setIsLoading(false);
    }

    return () => {
      if (uiRef.current) {
        uiRef.current.destroy();
        uiRef.current = null;
      }
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
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
    } else {
      video.play().catch(console.error);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
  };

  const handleVolumeChange = (newVolume: number) => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = newVolume;
    setVolume(newVolume);
    if (newVolume === 0) {
      video.muted = true;
    } else if (video.muted) {
      video.muted = false;
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoContainerRef.current?.requestFullscreen().catch(console.error);
      setIsPlayerFullscreen(true);
      onFullscreenChange?.(true);
    } else {
      document.exitFullscreen().catch(console.error);
      setIsPlayerFullscreen(false);
      onFullscreenChange?.(false);
    }
  };

  const restartStream = () => {
    const player = playerRef.current;
    const video = videoRef.current;
    if (!player || !video) return;

    setIsLoading(true);
    setError(null);
    
    player.load(streamUrl).then(() => {
      video.play().catch(console.error);
    }).catch((error) => {
      setError(`Failed to restart stream: ${error.message}`);
      setIsLoading(false);
    });
  };

  const changeQuality = (height: number) => {
    const player = playerRef.current;
    if (!player) return;

    if (height === -1) {
      // Enable adaptive bitrate
      player.configure({ abr: { enabled: true } });
    } else {
      // Disable ABR and select specific quality
      player.configure({ abr: { enabled: false } });
      const tracks = player.getVariantTracks();
      const selectedTrack = tracks.find(track => track.height === height);
      if (selectedTrack) {
        player.selectVariantTrack(selectedTrack, true);
      }
    }
    setCurrentQuality(height);
    setShowSettings(false);
  };

  const getQualityLabel = (track: any) => {
    if (track.height) {
      return `${track.height}p`;
    } else if (track.bandwidth) {
      return `${Math.round(track.bandwidth / 1000)}k`;
    }
    return 'Unknown';
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

        {/* Video Player Container */}
        <div className="relative bg-black">
          <div 
            ref={videoContainerRef}
            className={`relative ${isPlayerFullscreen ? 'h-screen' : 'aspect-video'}`}
          >
            <video
              ref={videoRef}
              className="w-full h-full bg-black"
              autoPlay
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
            />
          </div>

          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
              <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
                <p className="text-white text-lg mb-2">Loading Stream...</p>
                <p className="text-gray-400 text-sm">Connecting to {channelName}</p>
              </div>
            </div>
          )}

          {/* Error Overlay */}
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/90 z-10">
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
            <div className="absolute top-4 right-4 bg-black/95 backdrop-blur-sm rounded-xl p-6 min-w-64 border border-gray-700 z-20">
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
                    {qualityLevels.map((track, index) => (
                      <button
                        key={index}
                        onClick={() => changeQuality(track.height)}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                          currentQuality === track.height ? 'bg-orange-500 text-white' : 'text-gray-300 hover:bg-gray-700'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{getQualityLabel(track)} - {Math.round(track.bandwidth / 1000)}kbps</span>
                          <Smartphone size={16} />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Custom Controls Overlay */}
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
                  <p className="text-white font-medium">Live Adaptive Stream</p>
                </div>
                <div>
                  <p className="text-gray-300 text-sm">Quality</p>
                  <p className="text-white font-medium">
                    {currentQuality === -1 ? 'Auto' : 
                     currentQuality > 0 ? `${currentQuality}p` : 'Auto'}
                  </p>
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