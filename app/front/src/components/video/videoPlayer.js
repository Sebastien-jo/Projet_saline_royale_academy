import React, {useState, useRef} from 'react';

import play from "../../assets/icones/icon-play-White-stroke.svg";
import pause from "../../assets/icones/icon-pause-White-stroke.svg";
import backward from "../../assets/icones/icon-backward-White.svg";
import forward from "../../assets/icones/icon-forward-White.svg";
import unmute from "../../assets/icones/icon-sound-Default.svg";
import "../../styles/components/videoPlayer.css";
import useVideoPlayer from "../../hooks/video/useVideoPlayer";

const VideoPlayer = (url) => {

    const videoElement = useRef(null);
    const {
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
    } = useVideoPlayer(videoElement);

    return (
        <div className="container-player">
            <video id="video-player" ref={videoElement} onTimeUpdate={handleOnTimeUpdate} className="video" src={'https://d1a2y8pfnfh44t.cloudfront.net/b9fe11607cc311e49fc083969fd37b20/full/540p/index.mp4'} />

            <div className="controlsContainer">
                <div className={"actions"}>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={progress}
                        onChange={(e) => handleVideoProgress(e)}
                    />

                    <div className="controls-row">

                        <button className="mute-btn" onClick={toggleMute}>
                            {!muted ? (
                                <img className="controlsIcon--small" alt="" src={unmute}/>
                            ) : (
                                <img className="controlsIcon--small" alt="" src={unmute}/>
                            )}
                        </button>

                        <div className="controls">
                            <img className="controlsIcon--small" alt="" src={backward} onClick={handleVideoBackward}/>
                            {
                                playing ? (
                                    <img className="controlsIcon--small" alt="" src={pause} onClick={togglePlay}/>
                                ) : (
                                    <img className="controlsIcon--small" alt="" src={play} onClick={togglePlay}/>
                                )}
                            <img className="controlsIcon--small"  alt="" src={forward} onClick={handleVideoForward}/>
                        </div>


                        <select
                            className="velocity"
                            value={speed}
                            onChange={(e) => handleVideoSpeed(e)}
                        >
                            <option value="0.50">0.50x</option>
                            <option value="1">1x</option>
                            <option value="1.25">1.25x</option>
                            <option value="2">2x</option>
                        </select>


                    </div>
                </div>

            </div>
        </div>
    );
}

export default VideoPlayer;
