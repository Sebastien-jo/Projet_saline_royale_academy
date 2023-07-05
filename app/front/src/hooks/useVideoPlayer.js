import { useState, useEffect } from "react";

const useVideoPlayer = (videoElement) => {

    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [speed, setSpeed] = useState(1);
    const [muted, setMuted] = useState(false);

    const togglePlay = () => setPlaying(!playing);

    const toggleMute = () =>  setMuted(!muted);

    const handleVideoSpeed = (event) => {
        const speed = Number(event.target.value);
        videoElement.current.playbackRate = speed;
        setSpeed(speed);
    }

    const handleOnTimeUpdate = () => {
        const progress = (videoElement.current.currentTime / videoElement.current.duration) * 100;
        setProgress(progress);
    }


    const handleVideoProgress = (event) => {
        const manualChange = Number(event.target.value);
        videoElement.current.currentTime = (videoElement.current.duration / 100) * manualChange;

        setProgress(manualChange);
    }

    const handleVideoBackward = () => {
        const progress = Number(videoElement.current.currentTime - 5);
        videoElement.current.currentTime = progress;
        setProgress(progress);
    }

    const handleVideoForward = () => {
        const progress = videoElement.current.currentTime + 5;
        videoElement.current.currentTime = progress;
        setProgress(progress);
    }



    useEffect(() => {
        playing ? videoElement.current.play() : videoElement.current.pause();
    }, [playing, videoElement]);

    useEffect(() => {
        muted
            ? (videoElement.current.muted = true)
            : (videoElement.current.muted = false);
    }, [muted, videoElement]);




    return{
        playing,
        progress,
        speed,
        muted,
        togglePlay,
        handleOnTimeUpdate,
        handleVideoProgress,
        handleVideoSpeed,
        handleVideoBackward,
        handleVideoForward,
        toggleMute,
    }


}

export default useVideoPlayer;
