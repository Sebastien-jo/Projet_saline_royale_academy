import React from "react";
import Button from "../../../components/button/button";
import CardFull from "../../../components/card/cardFull";

import "../../../styles/singleOeuvre.css";

const SingleOeuvre = () => {

    const test = [1,2,3,4,5];

    return (
        <div className="main-container">
            <div className="main-content">
                <div className="oeuvre-container">
                    <div className="oeuvre-content">

                        <div className="oeuvre-img">
                            <img src="https://picsum.photos/200/300" alt="oeuvre"/>
                        </div>

                        <div className="oeuvre-infos">
                            <h2 className="oeuvre-title">Nom de L'oeuvre </h2>
                            <span className={"subtitle"}>Compositeur : Nom du compositeur</span>
                            <span className={"subtitle"}>Instrument : Piano, Violin, Cello, Viola, Flute</span>
                           <p className={"oeuvre-description"}>Lorem ipsum dolor sit amet consectetur. Maecenas feugiat sed platea vulputate vulputate fringilla sit convallis in. Aliquet aliquam ullamcorper magna mauris hendrerit tellus dignissim cras eget. Tellus at cursus sagittis senectus ut mollis.
                               Ac in augue nisl porta maecenas interdum consequat scelerisque sollicitudin. Tincidunt imperdiet vitae urna lectus id. Ornare nisl nunc rhoncus aliquet bibendum tempor ipsum. Viverra dignissim neque enim donec urna nam id fringilla dui. Molestie cras quisque neque justo.

                               Lorem ipsum dolor sit amet consectetur. Maecenas feugiat sed platea vulputate vulputate fringilla sit convallis in. Aliquet aliquam ullamcorper magna mauris hendrerit tellus dignissim cras eget. Tellus at cursus sagittis senectus ut mollis.
                               Ac in augue nisl porta maecenas interdum consequat scelerisque sollicitudin. Tincidunt imperdiet vitae urna lectus id. Ornare nisl nunc rhoncus aliquet bibendum tempor ipsum. Viverra dignissim neque enim donec urna nam id fringilla dui. Molestie cras quisque neque justo.</p>
                            <div className="oeuvre-infos-row">
                                <Button text={"Voir la partition"} link={"#"} className={"red-full"} isIcon={true}/>
                                <Button text={"Télécharger l'audio"} link={"#"} className={"red-stroke"} isArrow={true}/>
                            </div>
                        </div>

                    </div>

                    <div className="oeuvre-other">
                        <h2 className="oeuvre-title">Vous voulez apprendre cette oeuvres ?</h2>
                        <div className="masterclass-infos-row">
                            {
                                test.map((item, index) => {
                                    return <CardFull key={index} title={"Masterclass de piano"} subtitle={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec"} bouton={"Voir la masterclass"} link={"#"}/>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleOeuvre;
