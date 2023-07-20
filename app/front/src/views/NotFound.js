import React from 'react';
import notfound from "../assets/logo/notfound.svg";
import '../styles/notFound.css'
import ButtonIcon from "../components/button/buttonIcon";
import Button from "../components/button/button";


const NotFound= () => {

    return (
        <div className="main-container">
            <div className="main-content">
                <div className={"container-row"}>

                    <div className={"not-found"}>
                        <img src={notfound} alt="not found" />
                    </div>

                    <h1>Cette page est introuvable</h1>
                    <Button className={"btn red-full"}  text={"Retourner à l'accueil"} isArrow={true} link={"/#/"} />
                </div>
            </div>
        </div>
    );
}

export default NotFound;