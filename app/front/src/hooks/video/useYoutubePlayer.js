import { useEffect, useState } from 'react';

const useYouTubePlayer = (videoId) => {
    const [player, setPlayer] = useState(null);
    const [playing, setPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        // Load the YouTube API script
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        // Initialize the YouTube player when the script loads
        window.onYouTubeIframeAPIReady = () => {
            const newPlayer = new window.YT.Player('youtube-player', {
                videoId: videoId,
                events: {
                    onStateChange: (event) => {
                        if (event.data === window.YT.PlayerState.PLAYING) {
                            setPlaying(true);
                        } else {
                            setPlaying(false);
                        }
                    },
                    onReady: (event) => {
                        setPlayer(event.target);
                    },
                    onPlaybackRateChange: (event) => {
                        // Handle playback rate change if needed
                    },
                    onTimeUpdate: (event) => {
                        setCurrentTime(event.target.getCurrentTime());
                    },
                },
            });
        };
    }, [videoId]);

    const togglePlay = () => {
        if (playing) {
            player.pauseVideo();
        } else {
            player.playVideo();
        }
    };

    // Other functions and states related to YouTube video control

    return {
        player,
        playing,
        currentTime,
        togglePlay,
        // Other functions and states you might need
    };
};

export default useYouTubePlayer;
