import React, { useRef, useEffect, useState } from 'react';
import Hls from 'hls.js';
import { X, Volume2, VolumeX, Maximize, Minimize, Play, Pause, RotateCcw, Settings } from 'lucide-react';

interface LiveTVPlayerProps {
  streamUrl: string;
  channelName: string;
  onClose: () => void;
  isFullscreen?: boolean;
}

const LiveTVPlayer: React.FC<LiveTVPlayerProps> = ({ 
  streamUrl, 
  channelName, 
  onClose,
  isFullscreen = false 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    setIsLoading(true);
    setError(null);

    // Clean up previous instance
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

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
        manifestLoadingMaxRetry: 1,
        manifestLoadingRetryDelay: 1000,
        levelLoadingTimeOut: 10000,
        levelLoadingMaxRetry: 4,
        levelLoadingRetryDelay: 1000,
        fragLoadingTimeOut: 20000,
        fragLoadingMaxRetry: 6,
        fragLoadingRetryDelay: 1000,
        startFragPrefetch: false,
        testBandwidth: true
      });
      
      hlsRef.current = hls;
      
      // Load and attach media
      hls.loadSource(streamUrl);
      hls.attachMedia(video);
      
      // Event handlers
      hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
        console.log('M3U8 manifest loaded, found ' + data.levels.length + ' quality levels');
        setIsLoading(false);
        setQualityLevels(data.levels);
        setStreamInfo({
          levels: data.levels.length,
          firstLevel: data.firstLevel,
          audioTracks: data.audioTracks?.length || 0,
          subtitles: data.subtitleTracks?.length || 0
        });
        
        // Auto-play
        video.play().catch((err) => {
          console.warn('Auto-play failed:', err);
          setIsPlaying(false);
        });
      });

      hls.on(Hls.Events.LEVEL_SWITCHED, (event, data) => {
        setCurrentQuality(data.level);
        console.log('Quality switched to level:', data.level);
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error('HLS Error:', data);
        
        if (data.fatal) {
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
          // Non-fatal errors - try to recover
          if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
            hls.recoverMediaError();
          }
        }
      });

      hls.on(Hls.Events.FRAG_LOADED, () => {
        if (error) setError(null); // Clear error if fragments are loading successfully
      });

    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Safari native HLS support
      video.src = streamUrl;
      
      const handleLoadedMetadata = () => {
        setIsLoading(false);
        video.play().catch((err) => {
          console.warn('Auto-play failed:', err);
          setIsPlaying(false);
        });
      };
      
      const handleError = () => {
        setError('Failed to load M3U8 stream. Please try again.');
        setIsLoading(false);
      };

      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      video.addEventListener('error', handleError);
      
      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.removeEventListener('error', handleError);
      };
    } else {
      setError('HLS/M3U8 streaming is not supported in this browser.');
      setIsLoading(false);
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [streamUrl]);

  // Video event handlers
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleVolumeChange = () => {
      setIsMuted(video.muted);
      setVolume(video.volume);
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('volumechange', handleVolumeChange);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('volumechange', handleVolumeChange);
    };
  }, []);

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
      videoRef.current?.requestFullscreen().catch(console.error);
      setIsPlayerFullscreen(true);
    } else {
      document.exitFullscreen().catch(console.error);
      setIsPlayerFullscreen(false);
    }
  };

  const restartStream = () => {
    const video = videoRef.current;
    if (!video) return;

    setIsLoading(true);
    setError(null);
    
    if (hlsRef.current) {
      hlsRef.current.stopLoad();
      hlsRef.current.startLoad();
      video.play().catch(console.error);
    } else {
      video.load();
      video.play().catch(console.error);
    }
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

  return (
    <div className={`fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 ${isPlayerFullscreen ? 'p-0' : ''}`}>
      <div className={`relative bg-gray-900 rounded-xl overflow-hidden shadow-2xl ${isPlayerFullscreen ? 'w-full h-full rounded-none' : 'w-full max-w-5xl'}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <h3 className="text-white font-semibold text-lg">{channelName}</h3>
            <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold">LIVE M3U8</span>
            {streamInfo && (
              <span className="text-gray-400 text-sm">
                {streamInfo.levels} qualities available
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative bg-black">
          <video
            ref={videoRef}
            className={`w-full ${isPlayerFullscreen ? 'h-screen' : 'aspect-video'} bg-black`}
            controls={false}
            autoPlay
            muted={isMuted}
            playsInline
            preload="metadata"
          />

          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                <p className="text-white mb-2">Loading M3U8 stream...</p>
                <p className="text-gray-400 text-sm">Parsing manifest and quality levels</p>
              </div>
            </div>
          )}

          {/* Error Overlay */}
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80">
              <div className="text-center p-6 max-w-md">
                <div className="text-red-500 mb-4">
                  <X size={48} className="mx-auto" />
                </div>
                <p className="text-white mb-4">{error}</p>
                <div className="space-y-2">
                  <button
                    onClick={restartStream}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 mx-auto transition-colors"
                  >
                    <RotateCcw size={16} />
                    <span>Retry Stream</span>
                  </button>
                  <p className="text-gray-400 text-xs">
                    Make sure the M3U8 URL is valid and accessible
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Settings Panel */}
          {showSettings && qualityLevels.length > 0 && (
            <div className="absolute top-4 right-4 bg-black/90 backdrop-blur-sm rounded-lg p-4 min-w-48">
              <h4 className="text-white font-semibold mb-3">Quality Settings</h4>
              <div className="space-y-2">
                <button
                  onClick={() => changeQuality(-1)}
                  className={`w-full text-left px-3 py-2 rounded transition-colors ${
                    currentQuality === -1 ? 'bg-orange-500 text-white' : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  Auto (Recommended)
                </button>
                {qualityLevels.map((level, index) => (
                  <button
                    key={index}
                    onClick={() => changeQuality(index)}
                    className={`w-full text-left px-3 py-2 rounded transition-colors ${
                      currentQuality === index ? 'bg-orange-500 text-white' : 'text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {getQualityLabel(level)} - {Math.round(level.bitrate / 1000)}kbps
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Controls Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={togglePlay}
                  className="text-white hover:text-orange-400 transition-colors p-2 hover:bg-black/50 rounded-lg"
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                </button>
                
                <div className="flex items-center space-x-2">
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
                    className="w-20 accent-orange-500"
                  />
                </div>
                
                <button
                  onClick={restartStream}
                  className="text-white hover:text-orange-400 transition-colors p-2 hover:bg-black/50 rounded-lg"
                  title="Restart Stream"
                >
                  <RotateCcw size={20} />
                </button>
              </div>
              
              <div className="flex items-center space-x-2">
                {qualityLevels.length > 0 && (
                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="text-white hover:text-orange-400 transition-colors p-2 hover:bg-black/50 rounded-lg"
                    title="Quality Settings"
                  >
                    <Settings size={20} />
                  </button>
                )}
                <span className="text-white text-sm bg-black/50 px-2 py-1 rounded">
                  LIVE
                </span>
                <button
                  onClick={toggleFullscreen}
                  className="text-white hover:text-orange-400 transition-colors p-2 hover:bg-black/50 rounded-lg"
                >
                  {isPlayerFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stream Info */}
        <div className="p-4 bg-gray-800 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm">Now Playing</p>
              <p className="text-white font-medium">Live M3U8 Stream</p>
            </div>
            <div className="text-right">
              <p className="text-gray-300 text-sm">Quality</p>
              <p className="text-white font-medium">
                {currentQuality === -1 ? 'Auto' : 
                 qualityLevels[currentQuality] ? getQualityLabel(qualityLevels[currentQuality]) : 'Auto'}
              </p>
            </div>
            {streamInfo && (
              <div className="text-right">
                <p className="text-gray-300 text-sm">Stream Info</p>
                <p className="text-white font-medium text-xs">
                  {streamInfo.levels} levels • {streamInfo.audioTracks} audio
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveTVPlayer;