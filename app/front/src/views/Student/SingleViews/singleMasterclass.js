import React from "react";
import Button from "../../../components/button/button";
import VideoPlayer from "../../../components/video/videoPlayer";
import "../../../styles/singleMasterclass.css";

const SingleMasterclass = () => {
    return (
        <div className="main-container">
            <div className="main-content">
                <div className="masterclass-container">
                    <div className="masterclass-video">
                        <VideoPlayer/>
                    </div>

                    <div className="masterclass-content">
                        <div className="masterclass-infos">
                            <div className="masterclass-infos-row">
                                <h2 className="masterclass-title">Masterclass de piano</h2>
                                <p className="masterclass-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec</p>
                            </div>

                            <div className="masterclass-infos-row">
                                <h2 className="masterclass-subtitle">Partitions</h2>
                                <Button text={"Télécharger la partition"} link={"#"} className={"red-full"} isIcon={true}/>
                            </div>
                        </div>

                        <div className="masterclass-compositeur">
                            <div className={"masterclass-compositeur-image"}>
                                <img src="https://picsum.photos/200/300" alt="compositeur"/>
                            </div>

                            <div className={"masterclass-compositeur-infos"}>
                                <h2 className="masterclass-compositeur-name">Compositrice : Ludwig van Beethoven</h2>
                                <p className="masterclass-compositeur-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec</p>
                                <Button text={"En savoir plus"} link={"#"} className={"red-stroke"} isArrow={true}/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default SingleMasterclass;