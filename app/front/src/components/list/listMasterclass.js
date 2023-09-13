import React, {useState, useEffect} from 'react';
import CardColumn from "../card/cardColumn";
import FiltersModal from "../filters/filtersModal";
import Loader from "../loader/loader";
import SortModal from "../filters/sortModal";
import PopupDelete from "../popup/popupDelete";
import Pagination from "../pagination/pagination";
import usePagination from "../../hooks/usePagination";
import {useTranslation} from "react-i18next";

const ListMasterclass = ({masterclass, error, loading, favoris= false, isAdmin, deleteFunction, setId, updateSidebarContent, setIsReload}) => {

    const [sortedList, setSortedList] = useState([]);
    const [openPopup, setOpen] = useState(false);
    const [selectedMasterclassId, setSelectedMasterclassId] = useState(null);
    const { currentPage, itemsPerPage, itemsToDisplay, totalPages, nextPage, prevPage, goToPage } = usePagination(sortedList);

    const { i18n, t } = useTranslation();

    const handleItemSelect = (item) => {
        setSelectedMasterclassId(item.id);
        updateSidebarContent(item);
    };

    useEffect(() => {
        masterclass ? setSortedList(masterclass) : setSortedList([]);
    }, [masterclass]);


    return (
        <div className="container-list">
            <div className="list-row">
                <div className="container__header">
                    <h2>{ t('library.title') }</h2>
                    <div className="container__header__buttons">
                        <FiltersModal list={sortedList} setSortedList={setSortedList} isMasterclass={true} originalList={masterclass} />
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
                                        image={item.masterclassImage ? item.masterclassImage.contentUrl : "https://images.unsplash.com/photo-1471478331149-c72f17e33c73?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2938&q=80"}
                                        title={item.name}
                                        subtitle={`${t('card.professor')} : ${item.teacher.firstName} ${item.teacher.lastName}`}
                                        description={""}
                                        favoris={favoris}
                                        isFavorite={item.favorite}
                                        isAdmin={isAdmin}
                                        handleDelete={() => {
                                            setId(item.id);
                                            setOpen(true);
                                        }}
                                        handleSelect={() => handleItemSelect(item)}
                                        create={item.createdAt}
                                        id={item.id}
                                        category={[item.work.category]}
                                        isSelected={selectedMasterclassId === item.id}
                                        setIsReload={setIsReload}
                                       /* link={isAdmin ? "#/masterclass/" + item.id : ""}*/
                                    />
                                )
                        }))
                        : error ?
                            <p>{ t('error.error_data') }</p>
                        : loading ?
                            <Loader/>
                        : <p>{ t('library.no_masterclass') }</p>

                    }
                </div>
                <Pagination currentPage={currentPage} totalPages={totalPages} nextPage={nextPage} prevPage={prevPage} goToPage={goToPage} />
            </div>
            <PopupDelete deleteFunc={deleteFunction} openPopup={openPopup} setOpen={setOpen} title={"Supprimer une masterclass"} text={"Êtes-vous sûr de vouloir supprimer cette masterclass ?"} />
        </div>
    );
}

export default ListMasterclass;