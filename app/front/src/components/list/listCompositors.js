import React, {useEffect, useState} from 'react';
import CardColumn from "../card/cardColumn";
import FiltersModal from "../filters/filtersModal";
import Loader from "../loader/loader";
import SortModal from "../filters/sortModal";
import PopupDelete from "../popup/popupDelete";
import usePagination from "../../hooks/usePagination";
import Pagination from "../pagination/pagination";

const ListCompositors = ({compositors, error, loading, favoris= false, updateSidebarContent, isAdmin, deleteFunction, setId}) => {

    const [selectedComposerId, setSelectedComposerId] = useState(null);
    const [sortedList, setSortedList] = useState([]);
    const [openPopup, setOpen] = useState(false);
    const { currentPage, itemsPerPage, itemsToDisplay, totalPages, nextPage, prevPage, goToPage } = usePagination(sortedList);



    const handleItemSelect = (item) => {
        setSelectedComposerId(item.id);
        updateSidebarContent(item);
    };

    useEffect(() => {
        compositors ? setSortedList(compositors) : setSortedList([]);
    }, [compositors]);

    return (
        <div className="container-list">
            <div className="list-row">
                <div className="container__header">
                    <h2>Récemment ajoutés</h2>
                    <div className="container__header__buttons">
                        <FiltersModal list={sortedList} setSortedList={setSortedList} />
                        <SortModal list={sortedList} setSortedList={setSortedList} />
                    </div>
                </div>

                <div className="container-list__content">

                    {
                        error?
                            <p>Une erreur est survenue</p>
                            :
                            loading ?
                                <Loader />
                                : itemsToDisplay.length > 0 ? (
                                itemsToDisplay.map((item, index) => {
                                    return(
                                        <CardColumn
                                            key={index}
                                            image={item.composerImage ? item.composerImage.contentUrl : ""}
                                            title={item.name}
                                            subtitle={item.birth}
                                            description={item.description}
                                            category={item.categories}
                                            favoris={favoris}
                                            isFavorite={item.isFavorite}
                                            id={item.id}
                                            create={item.createdAt}
                                            isAdmin={isAdmin}
                                            handleDelete={() => {
                                                setId(item.id);
                                                setOpen(true);
                                            }}
                                            handleSelect={() => handleItemSelect(item)}
                                            isSelected={selectedComposerId === item.id}
                                        />
                                    )
                                })
                            )
                            :
                            <p>Aucun compositeur ajouté pour le moment </p>
                    }
                </div>
                <Pagination currentPage={currentPage} totalPages={totalPages} nextPage={nextPage} prevPage={prevPage} goToPage={goToPage} />
            </div>
            <PopupDelete deleteFunc={deleteFunction} openPopup={openPopup} setOpen={setOpen} title={"Supprimer un compositeur"} text={"Êtes-vous sûr de vouloir supprimer ce(tte) compositeur(trice) ?"} />
        </div>
    );
}

export default ListCompositors;