import React, {useState, useEffect} from "react";
import Button from "../../../components/button/button";
import CardFull from "../../../components/card/cardFull";
import "../../../styles/singleOeuvre.css";
import useOeuvres from "../../../hooks/api/useOeuvres";
import {useParams} from "react-router-dom";
import bg_work from "../../../assets/images/bg_work.jpg";
import ButtonDownload from "../../../components/button/buttonDownload";
import audio from "../../../assets/icones/icon-sound-Red.svg";
import file from "../../../assets/icones/icon-oeuvres-White.svg";
import useMasterclass from "../../../hooks/api/useMasterclass";

const SingleOeuvre = () => {

    const [oeuvre, setOeuvre] = useState(false); // [state, function to update state
    const [masterclass, setMasterclass] = useState([]); // [state, function to update state
    const {loading, error, handleGet} = useOeuvres();
    const {loading: oeuvreLoading, error: oeuvreError, handleGetByWork} = useMasterclass();

    const id = useParams().id;

    useEffect(() => {
        handleGet(id).then((response) => {
            setOeuvre(response);
            console.log(response);
        }).catch((err) => {
            console.log(err);
        });

        handleGetByWork(oeuvre.id).then((response) => {
            setMasterclass(response);
            console.log(response);
        }).catch((err) => {
            console.log(err);
        });
    }, []);


    return oeuvre ? (
        <div className="main-container">
            <div className="main-content">
                <div className="oeuvre-container">
                    <div className="oeuvre-content">

                        <div className="oeuvre-img">
                            <img src={bg_work} alt=""/>
                        </div>

                        <div className="oeuvre-infos">
                            <h2 className="oeuvre-title">{oeuvre.name}</h2>
                            <span className={"subtitle"}>Compositeur : { oeuvre.composer.name }</span>
                            <span className={"subtitle"}>Instrument : {oeuvre.category.name}</span>
                            <p className={"oeuvre-description"}>{ oeuvre.description}</p>
                            <div className="oeuvre-infos-row">
                                {
                                    oeuvre.workScores.length > 0 ? <ButtonDownload text={"Voir la partition"} link={oeuvre.workScores[0].contentUrl} className={"red-full"} isIcon={true} icon={file}/> : null
                                }
                                {
                                    oeuvre.workAudio ? <ButtonDownload text={"Écouter l'enregistrement"} link={oeuvre.workAudio.contentUrl} className={"red-stroke"} isIcon={true} icon={audio}/> : null
                                }
                               </div>
                        </div>

                    </div>

                    <div className="oeuvre-other">
                        <h2 className="oeuvre-title">Vous voulez apprendre cette oeuvres ?</h2>
                        <div className="masterclass-infos-row">
                            {
                                masterclass.map((item, index) => {
                                    return <CardFull key={index} title={"Masterclass de piano"} subtitle={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec"} bouton={"Voir la masterclass"} link={"#"}/>
                                })
                           }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : "";
}

export default SingleOeuvre;
