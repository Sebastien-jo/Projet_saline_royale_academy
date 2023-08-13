import React, {useState, useEffect} from 'react';
import CardColumn from "../card/cardColumn";
import FiltersCard from "../filters/filtersCard";
import useOeuvres from "../../hooks/api/useOeuvres";
import Loader from "../loader/loader";

const ListOeuvres = ({oeuvres, error, favoris}) => {

    return (
        <div className="container-list">
            <div className="list-row">
                <div className="container__header">
                    <h2>Récemment ajoutés</h2>
                    <FiltersCard/>
                </div>

                <div className="container-list__content">

                    {
                        oeuvres ?
                            oeuvres.map((item, index) => {
                                return(
                                    <CardColumn key={index} image={"https://picsum.photos/200/300"} title={item.name} subtitle={item.composer.name} description={""} link={`#/oeuvre/${item.id}`} category={item.category.name} favoris={favoris} id={item.id}/>
                                )
                            })
                        : error ?
                                <p>Une erreur est survenue</p>
                                :
                                <Loader/>
                    }
                </div>
            </div>
        </div>
    );
}

export default ListOeuvres;