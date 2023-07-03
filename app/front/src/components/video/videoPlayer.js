import React, {useState} from 'react';

import play from "../../assets/icones/icon-play-White-stroke.svg";
import pause from "../../assets/icones/icon-pause-White-stroke.svg";
import backward from "../../assets/icones/icon-backward-Default.svg";
import forward from "../../assets/icones/icon-forward-Default.svg";
import "../../styles/components/videoPlayer.css";

const VideoPlayer = () => {

    const [playing, setPlaying] = useState(false);

    return (
        <div className="container-player">
            <video id="video-player" className="video" src="https://www.w3schools.com/html/mov_bbb.mp4"></video>


            <div className="controlsContainer">
                <div className="controls">
                    <img className="controlsIcon--small" alt="" src={backward}/>

                    {
                        playing ? (
                        <img className="controlsIcon--small" alt="" src={pause}/>
                    ) : (
                        <img className="controlsIcon--small" alt="" src={play}/>
                    )}
                    <img className="controlsIcon--small"  alt="" src={forward}/>
                </div>
            </div>

            {/* <div className="timecontrols">
                <p className="controlsTime">
                    {Math.floor(currentTime / 60) +
                        ":" +
                        ("0" + Math.floor(currentTime % 60)).slice(-2)}
                </p>
                <div className="time_progressbarContainer">
                    <div
                        style={{ width: `${progress}%` }}
                        className="time_progressBar"
                    ></div>
                </div>
                <p className="controlsTime">
                    {Math.floor(videoTime / 60) +
                        ":" +
                        ("0" + Math.floor(videoTime % 60)).slice(-2)}
                </p>
            </div> */}
        </div>
    );
}

export default VideoPlayer;
