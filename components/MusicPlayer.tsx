
import React, { useState, useRef, useEffect } from 'react';

interface MusicPlayerProps {
    src: string;
    title: string;
    artist: string;
    coverParams: string; // URL for the cover image
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ src, title, artist, coverParams }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(0.5);
    const [showVolume, setShowVolume] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Autoplay attempt on mount
        const attemptPlay = async () => {
            if (audioRef.current) {
                audioRef.current.volume = volume;
                try {
                    await audioRef.current.play();
                    setIsPlaying(true);
                } catch (error) {
                    console.log("Autoplay blocked:", error);
                    setIsPlaying(false);
                }
            }
        };
        attemptPlay();
    }, []); // Run once on mount

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(error => {
                    console.log("Playback failed:", error);
                    setIsPlaying(false);
                });
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', updateDuration);

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', updateDuration);
        };
    }, []);

    const formatTime = (time: number) => {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const time = Number(e.target.value);
        setCurrentTime(time);
        if (audioRef.current) {
            audioRef.current.currentTime = time;
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const vol = Number(e.target.value);
        setVolume(vol);
        if (audioRef.current) {
            audioRef.current.volume = vol;
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 items-end animate-in fade-in slide-in-from-bottom-8 duration-700">

            {/* Volume Slider Popup */}
            {showVolume && (
                <div className="bg-white/90 dark:bg-black/80 backdrop-blur-md p-3 rounded-xl shadow-xl mb-2 flex flex-col items-center gap-2 border border-primary/10 animate-in fade-in slide-in-from-bottom-2 duration-200">
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="h-24 -rotate-90 accent-primary cursor-pointer w-6"
                    />
                    <span className="material-symbols-outlined text-gray-500 text-sm mt-1">volume_up</span>
                </div>
            )}

            {/* Main Player Card */}
            <div className="bg-white/90 dark:bg-black/80 backdrop-blur-md p-3 rounded-2xl shadow-2xl border border-primary/20 flex gap-4 items-center max-w-[320px] transition-all hover:bg-white dark:hover:bg-black/90">

                {/* Album Art with Spin */}
                <div className={`relative w-14 h-14 shrink-0 rounded-full overflow-hidden border-2 border-primary/20 shadow-inner ${isPlaying ? 'animate-spin-slow' : ''}`}>
                    <img src={coverParams} alt="Album Art" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/10 rounded-full"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full shadow-sm"></div>
                    </div>
                </div>

                {/* Controls & Info */}
                <div className="flex flex-col gap-1 w-[180px]">
                    <div className="flex justify-between items-start">
                        <div className="overflow-hidden">
                            <p className="text-xs font-bold text-gray-800 dark:text-gray-100 truncate">{title}</p>
                            <p className="text-[10px] text-primary font-medium truncate">{artist}</p>
                        </div>

                        <div className="flex gap-1" onMouseLeave={() => setShowVolume(false)}>
                            <button
                                onClick={() => setShowVolume(!showVolume)}
                                className="text-gray-400 hover:text-primary transition-colors p-1"
                            >
                                <span className="material-symbols-outlined text-lg">volume_up</span>
                            </button>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="flex items-center gap-2 text-[9px] font-medium text-gray-500 font-mono">
                        <span>{formatTime(currentTime)}</span>
                        <input
                            type="range"
                            min="0"
                            max={duration || 100}
                            value={currentTime}
                            onChange={handleSeek}
                            className="grow h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                        <span>{formatTime(duration)}</span>
                    </div>
                </div>

                {/* Play/Pause Button */}
                <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-10 h-10 shrink-0 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary/90 transition-transform active:scale-95 shadow-lg shadow-primary/20"
                >
                    <span className="material-symbols-outlined text-xl ml-0.5">
                        {isPlaying ? 'pause' : 'play_arrow'}
                    </span>
                </button>
            </div>

            <audio
                ref={audioRef}
                src={src}
                loop
                onEnded={() => setIsPlaying(false)}
            />
        </div>
    );
};

export default MusicPlayer;
