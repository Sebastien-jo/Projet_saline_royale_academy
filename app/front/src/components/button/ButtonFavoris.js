import React, {useEffect, useState} from 'react';
import favorite from "../../assets/icones/icon-signet-Blue-stroke.svg";
import favoriteFull from "../../assets/icones/icon-signet-Blue-full.svg";
import useFavoris from "../../hooks/api/useFavoris";
import {useSelector} from "react-redux";
import "../../styles/components/button.css";
import {useReload} from "../../hooks/useReload";

const ButtonFavoris = ({favoris, id, isFavorite, setIsReload}) => {

    const [isFavoris, setIsFavoris] = useState(favoris);
    const [hasFavorite, setHasFavorite] = useState(false);
    const {
        loading,
        error,
        handleAddFavorisOeuvre,
        handleAddFavorisMasterclass,
        handleAddFavorisComposer,
        handleDeleteFavorisOeuvre,
        handleDeleteFavorisMasterclass,
        handleDeleteFavorisComposer
    } = useFavoris();

    useEffect(() => {
        setIsFavoris(favoris);
        setHasFavorite(isFavorite);
    }, [favoris, hasFavorite]);

    //redux user
    const user = useSelector(state => state.auth.user);

    const handleFavoris = () => {
        !hasFavorite ?
            isFavoris === "oeuvre" || isFavoris === "work" ?
                handleAddFavorisOeuvre({"user": `api/users/${ user.id }`, "work": `api/works/${ id }`})
                .then((response) => {
                    setIsReload(true);
                })
                .catch((error) => {
                    console.log(error);
                })
            :
            isFavoris === "masterclass" || isFavoris === "courses" ?
                handleAddFavorisMasterclass({
                    "user": `api/users/${ user.id }`,
                    "masterclass": `api/masterclasses/${ id }`
                })
                .then((response) => {
                    setIsReload(true);
                })
                .catch((error) => {
                    console.log(error);
                })
            : isFavoris === "composer" ?
                handleAddFavorisComposer({
                    "user": `api/users/${ user.id }`,
                    "composer": `api/composers/${ id }`
                })  // Fixed 'masterclass' to 'composer'
                .then((response) => {
                    setIsReload(true);
                })
                .catch((error) => {
                    console.log(error);
                })
                : null
            :
            /*isFavoris === "oeuvre" || isFavoris === "work" ?
               handleDeleteFavorisOeuvre({"user": `api/users/${ user.id }`, "work": `api/works/${ id }`})
                   .then((response) => {
                       console.log(response);
                   }).catch((error) => {
                   console.log(error);
               })
           : isFavoris === "masterclass" || isFavoris === "courses" ?
               handleDeleteFavorisMasterclass({
                   "user": `api/users/${ user.id }`,
                   "masterclass": `api/masterclasses/${ id }`
               }).then((response) => {
                       console.log(response);
               }).catch((error) => {
                   console.log(error);
               }
           ) : isFavoris === "composer" ?
               handleDeleteFavorisComposer({
                   "user": `api/users/${ user.id }`,
                   "composer": `api/composers/${ id }`
               }).then((response) => {
                   console.log(response);
               }).catch((error) => {
                   console.log(error);
               }) :*/ null
    }


    return (
        <button className={ `button-round favorite` } onClick={ handleFavoris }>
            <img src={ isFavorite ? favoriteFull : favorite } alt="favorite"/>
        </button>
    )
}

export default ButtonFavoris;