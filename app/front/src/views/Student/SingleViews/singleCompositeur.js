import React, {useEffect, useState} from "react";
import Button from "../../../components/button/button";
import CardFull from "../../../components/card/cardFull";

import "../../../styles/singleOeuvre.css";
import { useParams } from 'react-router-dom';
import {getCompositor} from "../../../api/endpoints/compositor";

const SingleCompositeur = () => {

        const [compositeur, setCompositeur] = useState({});

       const {id} = useParams();

       useEffect(() => {
           getCompositor(id).then((response) => {
                setCompositeur(response);
                console.log(response);
           }).catch((error) => {
                    console.log(error);
           });
       }, [id]);

    return (
        <div className="main-container">
            <div className="main-content">
                <div className="oeuvre-container">
                    <div className="oeuvre-content">

                        <div className="oeuvre-img">
                            <img src={compositeur.portrait} alt="oeuvre"/>
                        </div>

                        <div className="oeuvre-infos">
                            <h2 className="oeuvre-title">{compositeur.name}</h2>
                            <span className={"subtitle"}>Née le : { compositeur.birth }</span>
                            <span className={"subtitle"}>Instrument : Piano, Violin, Cello, Viola, Flute</span>
                           <p className={"oeuvre-description"}>Lorem ipsum dolor sit amet consectetur. Maecenas feugiat sed platea vulputate vulputate fringilla sit convallis in. Aliquet aliquam ullamcorper magna mauris hendrerit tellus dignissim cras eget. Tellus at cursus sagittis senectus ut mollis.
                               Ac in augue nisl porta maecenas interdum consequat scelerisque sollicitudin. Tincidunt imperdiet vitae urna lectus id. Ornare nisl nunc rhoncus aliquet bibendum tempor ipsum. Viverra dignissim neque enim donec urna nam id fringilla dui. Molestie cras quisque neque justo.

                               Lorem ipsum dolor sit amet consectetur. Maecenas feugiat sed platea vulputate vulputate fringilla sit convallis in. Aliquet aliquam ullamcorper magna mauris hendrerit tellus dignissim cras eget. Tellus at cursus sagittis senectus ut mollis.
                               Ac in augue nisl porta maecenas interdum consequat scelerisque sollicitudin. Tincidunt imperdiet vitae urna lectus id. Ornare nisl nunc rhoncus aliquet bibendum tempor ipsum. Viverra dignissim neque enim donec urna nam id fringilla dui. Molestie cras quisque neque justo.</p>
                        </div>

                    </div>

                    <div className="oeuvre-other">
                        <h2 className="oeuvre-title">Vous voulez apprendre cette oeuvres ?</h2>
                        <div className="masterclass-infos-row">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleCompositeur;
