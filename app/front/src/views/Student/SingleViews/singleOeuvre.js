import React, {useState, useEffect} from "react";
import Button from "../../../components/button/button";
import CardFull from "../../../components/card/cardFull";
import "../../../styles/singleOeuvre.css";
import useOeuvres from "../../../hooks/api/useOeuvres";
import {useParams} from "react-router-dom";

const SingleOeuvre = () => {

    const [oeuvre, setOeuvre] = useState(false); // [state, function to update state
    const {loading, error, handleGet} = useOeuvres();

    const id = useParams().id;

    useEffect(() => {
        handleGet(id).then((response) => {
            setOeuvre(response);
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
                            <img src="https://picsum.photos/200/300" alt="oeuvre"/>
                        </div>

                        <div className="oeuvre-infos">
                            <h2 className="oeuvre-title">{oeuvre.name}</h2>
                            <span className={"subtitle"}>Compositeur : { oeuvre.composer.name }</span>
                            <span className={"subtitle"}>Instrument : {oeuvre.category.name}</span>
                            <p className={"oeuvre-description"}>{ oeuvre.description}</p>
                            <div className="oeuvre-infos-row">
                                {
                                    oeuvre.workScores ? <Button text={"Voir la partition"} link={"#"} className={"red-full"} isIcon={true}/> : null
                                }
                                {
                                    oeuvre.workAudio ? <Button text={"Télécharger l'audio"} link={"#"} className={"red-stroke"} isArrow={true}/> : null
                                }
                               </div>
                        </div>

                    </div>

                    <div className="oeuvre-other">
                        <h2 className="oeuvre-title">Vous voulez apprendre cette oeuvres ?</h2>
                        <div className="masterclass-infos-row">
                            {/*
                                test.map((item, index) => {
                                    return <CardFull key={index} title={"Masterclass de piano"} subtitle={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec"} bouton={"Voir la masterclass"} link={"#"}/>
                                })
                           */ }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : "";
}

export default SingleOeuvre;
