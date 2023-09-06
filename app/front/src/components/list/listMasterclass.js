import React, {useState, useEffect} from 'react';
import CardColumn from "../card/cardColumn";
import FiltersModal from "../filters/filtersModal";
import Loader from "../loader/loader";
import SortModal from "../filters/sortModal";
import PopupDelete from "../popup/popupDelete";
import useMasterclassUser from "../../hooks/api/useMasterclassUser";
import {useSelector} from "react-redux";

const ListMasterclass = ({masterclass, error, favoris= false, isAdmin, deleteFunction, setId, updateSidebarContent}) => {

    const [sortedList, setSortedList] = useState([]);
    const [openPopup, setOpen] = useState(false);
    const [selectedMasterclassId, setSelectedMasterclassId] = useState(null);

    const handleItemSelect = (item) => {
        setSelectedMasterclassId(item.id);
        updateSidebarContent(item);
    };


    useEffect(() => {
        setSortedList(masterclass);
    }, [masterclass]);


    return (
        <div className="container-list">
            <div className="list-row">
                <div className="container__header">
                    <h2>Récemment ajoutés</h2>
                    <div className="container__header__buttons">
                        <FiltersModal list={sortedList} setSortedList={setSortedList} isMasterclass={true} />
                        <SortModal list={sortedList} setSortedList={setSortedList} />
                    </div>

                </div>

                <div className="container-list__content">

                    {
                        sortedList ?
                            sortedList.map((item, index) => {
                                return(
                                    <CardColumn
                                        key={index}
                                        image={item.masterclassImage ? item.masterclassImage.contentUrl : ""}
                                        title={item.name}
                                        subtitle={`Professeur : ${item.teacher.firstName} ${item.teacher.lastName}`}
                                        description={""}
                                        favoris={favoris}
                                        isFavorite={item.isFavorite}
                                        isAdmin={isAdmin}
                                        handleDelete={() => {
                                            setId(item.id);
                                            setOpen(true);
                                        }}
                                        handleSelect={() => handleItemSelect(item)}
                                        create={item.createdAt}
                                        id={item.id}
                                        category={[item.work.category]}
                                    />
                                )
                        })
                         : error ?
                            <p>Une erreur est survenue</p>
                        :
                        <Loader/>
                    }
                </div>
            </div>
            <PopupDelete deleteFunc={deleteFunction} openPopup={openPopup} setOpen={setOpen} title={"Supprimer une masterclass"} text={"Êtes-vous sûr de vouloir supprimer cette masterclass ?"} />
        </div>
    );
}

export default ListMasterclass;