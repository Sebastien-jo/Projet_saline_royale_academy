import React from 'react';
import CardColumn from "../card/cardColumn";
import FiltersCard from "../filters/filtersCard";

const ListLibraryMasterclass = ({list}) => {

    return (
        <div className="container-list">
            <div className="list-row">
                <div className="container__header">
                    <h2>Récemment ajoutés</h2>
                    <FiltersCard/>
                </div>

                <div className="container-list__content">

                    {
                        list.map((item, index) => {
                            return(
                                <CardColumn key={index} image={item.portrait} title={item.name} subtitle={item.birth} description={""} link={`#/library/compositeur/${item.id}`}/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default ListLibraryMasterclass;