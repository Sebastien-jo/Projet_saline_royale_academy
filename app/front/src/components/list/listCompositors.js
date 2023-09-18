import React, {useEffect, useState} from 'react';
import CardColumn from "../card/cardColumn";
import FiltersModal from "../filters/filtersModal";
import Loader from "../loader/loader";
import SortModal from "../filters/sortModal";
import PopupDelete from "../popup/popupDelete";
import usePagination from "../../hooks/usePagination";
import Pagination from "../pagination/pagination";
import {useTranslation} from "react-i18next";

const ListCompositors = ({compositors, error, loading, favoris= false, updateSidebarContent, isAdmin, deleteFunction, setId, setIsReload }) => {

    const [selectedComposerId, setSelectedComposerId] = useState(null);
    const [sortedList, setSortedList] = useState([]);
    const [openPopup, setOpen] = useState(false);
    const { currentPage, itemsPerPage, itemsToDisplay, totalPages, nextPage, prevPage, goToPage } = usePagination(sortedList);

    const { i18n, t } = useTranslation();

    const handleItemSelect = (item) => {
        setSelectedComposerId(item.id);
        updateSidebarContent(item);
    };

    useEffect(() => {
        compositors ? setSortedList(compositors) : setSortedList([]);
    }, [compositors]);

    const cutDescription = (description) => {
        if(description.length > 100) {
            return description.slice(0, 100) + "...";
        } else {
            return description;
        }
    }

    return (
        <div className="container-list">
            <div className="list-row">
                <div className="container__header">
                    <h2>{ t('library.title') }</h2>
                    <div className="container__header__buttons">
                        <FiltersModal list={sortedList} setSortedList={setSortedList} originalList={compositors} />
                        <SortModal list={sortedList} setSortedList={setSortedList} />
                    </div>
                </div>

                <div className="container-list__content">

                    {
                        itemsToDisplay.length > 0 ? (
                                itemsToDisplay.map((item, index) => {
                                    return(
                                        <CardColumn
                                            key={index}
                                            image={item.composerImage ? item.composerImage.contentUrl : "https://images.unsplash.com/photo-1621368286550-f54551f39b91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80"}
                                            title={item.name}
                                            subtitle={item.birth}
                                            description={cutDescription(item.description)}
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
                                            setIsReload={setIsReload}
                                        />
                                    )
                                })
                            )
                        : error?
                            <p>{ t('error.error_data') }</p>
                        : loading ?
                            <Loader />
                        :
                        <p>{ t('library.no_composer') }</p>
                    }
                </div>
                <Pagination currentPage={currentPage} totalPages={totalPages} nextPage={nextPage} prevPage={prevPage} goToPage={goToPage} />
            </div>
            <PopupDelete deleteFunc={deleteFunction} openPopup={openPopup} setOpen={setOpen} title={"Supprimer un compositeur"} text={"Êtes-vous sûr de vouloir supprimer ce(tte) compositeur(trice) ?"} />
        </div>
    );
}

export default ListCompositors;