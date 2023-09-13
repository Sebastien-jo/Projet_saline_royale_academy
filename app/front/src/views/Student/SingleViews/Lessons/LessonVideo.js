import React from 'react';
import VideoPlayer from "../../../../components/video/videoPlayer";
import Button from "../../../../components/button/button";

const LessonVideo = ({lesson}) => {
    console.log("lesson", lesson);

    return(
        <div className="masterclass-container">
            <div className="masterclass-video">
                <VideoPlayer url={"https://d1a2y8pfnfh44t.cloudfront.net/b9fe11607cc311e49fc083969fd37b20/full/540p/index.mp4"}/>
            </div>

            <div className="masterclass-content">
                <div className="masterclass-infos">
                    <div className="masterclass-infos-row">
                        <h2 className="masterclass-title">Leçon vidéo : {lesson.name}</h2>
                        <p className="masterclass-description">{lesson.description}</p>
                    </div>

                </div>
            </div>
        </div>
    )

}

export default LessonVideo;
