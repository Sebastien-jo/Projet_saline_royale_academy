import React from 'react';
import CardColumn from "../card/cardColumn";
import FiltersCard from "../filters/filtersCard";

const ListLibraryCompositors = ({list}) => {

    return (
        <div className="container-library">
            <div className="library-row">
                <div className="container__header">
                    <h2>Récemment ajoutés</h2>
                    <FiltersCard/>
                </div>

                <div className="container-library__content">

                    {
                        list.map((item, index) => {
                            return(
                                <CardColumn key={index} image={item.portrait} title={item.name} subtitle={item.birth} description={""} link={`/compositeur/${item.id}`}/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default ListLibraryCompositors;