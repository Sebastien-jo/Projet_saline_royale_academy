import React, {useState, useEffect} from 'react';
import CardColumn from "../card/cardColumn";
import FiltersCard from "../filters/filtersCard";
import useMasterclassUser from "../../hooks/api/useMasterclassUser";
import Loader from "../loader/loader";

const ListMasterclass = ({masterclass, error, favoris}) => {


    return (
        <div className="container-list">
            <div className="list-row">
                <div className="container__header">
                    <h2>Récemment ajoutés</h2>
                    <FiltersCard/>
                </div>

                <div className="container-list__content">

                    {
                        masterclass ?
                            masterclass.map((item, index) => {
                                return(
                                    <CardColumn key={index} image={"https://picsum.photos/200/300"} title={item.name} description={""} link={"#/masterclass/" + item.id} favoris={favoris} id={item.id}/>
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

export default ListMasterclass;