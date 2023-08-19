import React, {useState, useEffect} from 'react';
import CardColumn from "../card/cardColumn";
import FiltersCard from "../filters/filtersCard";
import useOeuvres from "../../hooks/api/useOeuvres";
import Loader from "../loader/loader";
import useSidebarContent from "../../hooks/useSidebarContent";

const ListOeuvres = ({oeuvres, error, favoris, updateSidebarContent}) => {
    const [selectedWorkId, setSelectedWorkId] = useState(null);

    const handleItemSelect = (item) => {
        setSelectedWorkId(item.id);
        updateSidebarContent(item);
    };

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
                                    <CardColumn
                                        key={index}
                                        image={"https://picsum.photos/200/300"}
                                        title={item.name}
                                        subtitle={item.composer.name}
                                        description={item.description}
                                        category={item.category}
                                        favoris={favoris}
                                        id={item.id}
                                        handleSelect={() => handleItemSelect(item)}
                                        isSelected={selectedWorkId === item.id}
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

export default ListOeuvres;