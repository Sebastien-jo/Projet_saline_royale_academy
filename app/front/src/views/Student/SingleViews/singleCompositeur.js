import React, {useEffect, useState} from "react";
import "../../../styles/singleOeuvre.css";
import { useParams } from 'react-router-dom';

import Loader from "../../../components/loader/loader";
import Pastille from "../../../components/pastille/pastille";
import useCompositors from "../../../hooks/api/useCompositors";
import useMasterclass from "../../../hooks/api/useMasterclass";

const SingleCompositeur = () => {

        const [compositor, setCompositor] = useState(false);
        const [composer, setComposer] = useState(false); // [state, function to update state
        const {loading, error, handleGet: getCompositor} = useCompositors();
        const {loading: masterclassLoading, error: masterclassError, handleGetByComposer: getMasterclassByComposer} = useMasterclass();

       const {id} = useParams();

       useEffect(() => {
           getCompositor(id).then((response) => {
                setCompositor(response);
                console.log(response);
           }).catch((error) => {
                    console.log(error);
           });

           getMasterclassByComposer(compositor.id).then((response) => {
            setComposer(response);
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
                           <img src={compositor.composerImage ? compositor.composerImage.contentUrl : ""} alt={compositor.name} />
                        </div>

                        <div className="oeuvre-infos">
                            <h2 className="oeuvre-title">{compositor.name}</h2>
                            <span className={"subtitle"}>Née le : { compositor.birth }</span>
                            <span className={"subtitle"}>Instrument :
                                {
                                    compositor.categories.map((item, index) => {
                                        return(
                                           <Pastille key={index} text={item.name} className={item.name} />
                                        )
                                    })
                                }
                            </span>
                           <p className={"oeuvre-description"}>{ compositor.description}</p>
                        </div>

                    </div>

                    <div className="oeuvre-other">
                        <h2 className="oeuvre-title">Apprendre de ce compositeurs ?</h2>
                        <div className="masterclass-infos-row">
                            <p>Aucune masterclass n'est disponible pour le moment</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : <Loader />
}

export default SingleCompositeur;
