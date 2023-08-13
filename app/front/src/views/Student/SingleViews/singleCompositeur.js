import React, {useEffect, useState} from "react";
import "../../../styles/singleOeuvre.css";
import { useParams } from 'react-router-dom';
import {getCompositor} from "../../../api/endpoints/compositor";
import Loader from "../../../components/loader/loader";

const SingleCompositeur = () => {

        const [compositor, setCompositor] = useState({});

       const {id} = useParams();

       useEffect(() => {
           getCompositor(id).then((response) => {
                setCompositor(response);
                console.log(response);
           }).catch((error) => {
                    console.log(error);
           });
       }, [id]);

    return compositor ? (
        <div className="main-container">
            <div className="main-content">
                <div className="oeuvre-container">
                    <div className="oeuvre-content">

                        <div className="oeuvre-img">
                            <img src={compositor.picture} alt="oeuvre"/>
                        </div>

                        <div className="oeuvre-infos">
                            <h2 className="oeuvre-title">{compositor.name}</h2>
                            <span className={"subtitle"}>Née le : { compositor.birth }</span>
                            <span className={"subtitle"}>Instrument : { compositor.categories }</span>
                           <p className={"oeuvre-description"}>{ compositor.description}</p>
                        </div>

                    </div>

                    <div className="oeuvre-other">
                        <h2 className="oeuvre-title">Apprendre de ce compositeurs ?</h2>
                        <div className="masterclass-infos-row">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : <Loader />
}

export default SingleCompositeur;
