import React, {useEffect, useState} from 'react';
import CardColumn from "../card/cardColumn";
import FiltersCard from "../filters/filtersCard";
import Loader from "../loader/loader";

const ListCompositors = ({compositors, error, favoris= false, updateSidebarContent}) => {

    const [selectedComposerId, setSelectedComposerId] = useState(null);

    const handleItemSelect = (item) => {
        setSelectedComposerId(item.id);
        updateSidebarContent(item);
    };

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
                                    <CardColumn
                                        key={index}
                                        image={item.picture}
                                        title={item.name}
                                        subtitle={item.birth}
                                        description={item.description}
                                        category={item.categories}
                                        favoris={favoris}
                                        id={item.id}
                                        handleSelect={() => handleItemSelect(item)}
                                        isSelected={selectedComposerId === item.id}
                                    />
                                )
                            }).reverse()
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