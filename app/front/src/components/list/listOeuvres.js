import React, {useState, useEffect} from 'react';
import CardColumn from "../card/cardColumn";
import FiltersModal from "../filters/filtersModal";
import Loader from "../loader/loader";
import SortModal from "../filters/sortModal";
import bg_work from "../../assets/images/bg_work.jpg";
import PopupDelete from "../popup/popupDelete";

const ListOeuvres = ({oeuvres, error, favoris, updateSidebarContent , isAdmin, deleteFunction, setId}) => {
    const [selectedWorkId, setSelectedWorkId] = useState(null);
    const [sortedList, setSortedList] = useState([]);
    const [openPopup, setOpen] = useState(false);


    const handleItemSelect = (item) => {
        setSelectedWorkId(item.id);
        updateSidebarContent(item);
    };

    useEffect(() => {
        setSortedList(oeuvres);
    }, [oeuvres]);


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
                        sortedList.length > 0 ?
                            sortedList.map((item, index) => {
                                return(
                                    <CardColumn
                                        key={index}
                                        image={bg_work}
                                        title={item.name}
                                        subtitle={item.composer.name}
                                        description={item.description}
                                        category={item.category}
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
                                        isSelected={selectedWorkId === item.id}
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

            <PopupDelete deleteFunc={deleteFunction} openPopup={openPopup} setOpen={setOpen} title={"Supprimer une oeuvre"} text={"Êtes-vous sûr de vouloir supprimer cette oeuvre ?"} />
        </div>
    );
}

export default ListOeuvres;