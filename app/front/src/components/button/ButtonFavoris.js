import React, {useState} from 'react';
import favorite from "../../assets/icones/icon-signet-Blue-stroke.svg";
import useFavoris from "../../hooks/api/useFavoris";
import {useSelector} from "react-redux";
import "../../styles/components/button.css";

const ButtonFavoris = ({favoris, id}) => {

    const [isFavoris, setIsFavoris] = useState(favoris);
    const { loading, error, handleAddFavorisOeuvre, handleAddFavorisMasterclass, handleAddFavorisComposer } = useFavoris();

    //redux user
    const user = useSelector(state => state.auth.user);

    const handleFavoris = () => {
        isFavoris === "oeuvre" ?
        handleAddFavorisOeuvre({ "user": `api/users/${user.id}`, "work": `api/works/${id}` })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
        : isFavoris === "masterclass" ?
                handleAddFavorisMasterclass({ "user": `api/users/${user.id}`, "masterclass": `api/masterclasses/${id}` })
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                })
        : isFavoris === "composer" ?
            handleAddFavorisComposer({ "user": `api/users/${user.id}`, "composer": `api/composers/${id}` })  // Fixed 'masterclass' to 'composer'
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                })
                    : null;

    }

    return(
        <button className={`button-round favorite`} onClick={handleFavoris}>
            <img src={favorite} className={"isArrow"}/>
        </button>
    )
}

export default ButtonFavoris;