import React, {useEffect, useState} from 'react';
import CardColumn from "../card/cardColumn";
import FiltersCard from "../filters/filtersCard";
import Loader from "../loader/loader";

const ListCompositors = ({compositors, error, favoris= false}) => {

    return (
        <div className="container-list">
            <div className="list-row">
                <div className="container__header">
                    <h2>Récemment ajoutés</h2>
                    <FiltersCard />
                </div>

                <div className="container-list__content">

                    {
                        compositors ?
                            compositors.map((item, index) => {
                                return(
                                    <CardColumn key={index} image={item.picture} title={item.name} subtitle={item.birth} description={item.description} link={`#/compositeur/${item.id}`} category={item.categories} favoris={favoris} id={item.id}/>
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

export default ListCompositors;