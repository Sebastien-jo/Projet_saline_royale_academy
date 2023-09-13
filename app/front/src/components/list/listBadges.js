import React, {useEffect, useState} from 'react';
import FiltersModal from "../filters/filtersModal";
import Button from "../button/button";
import edit from "../../assets/icones/icon-edit-Blue-stroke.svg";
import trash from "../../assets/icones/icon-trash-White.svg";
import PopupDelete from "../popup/popupDelete";
import '../../styles/components/badge.css';
import useBadges from "../../hooks/api/useBadges";
import SortModal from "../filters/sortModal";
import {useTranslation} from "react-i18next";

const ListBadges= ({text, badges, handleRemove, setId}) => {

    const [openPopup, setOpen] = useState(false);
    const [sortedList, setSortedList] = useState([]);

    const { i18n, t } = useTranslation();

    useEffect(() => {
        badges ? setSortedList(badges) : setSortedList([]);
    }, [badges]);

    return (
        <div className="container-list">
            <div className="list-row">
                <div className="container__header">
                    <h2>{ text }</h2>
                    <SortModal list={sortedList} setSortedList={setSortedList} />
                </div>

                <div className="container-list__content">

                    {
                        sortedList.length > 0 ?
                        sortedList.map((badge, index) => {
                            return(
                                <div className={"card-column space-between"} key={index}>
                                    <div className={"card_avatar"}>
                                        {
                                            badge.badgeImage ?
                                                <img src={badge.badgeImage.contentUrl} alt={"avatar"} />
                                                :
                                                <img src={"https://picsum.photos/200/300"} alt={"avatar"} />
                                        }
                                    </div>
                                    <div>
                                        <p className={"card-column__title"}>{badge.name}</p>
                                    </div>
                                    <p className={"card-column__text"}>{badge.description}</p>
                                    <p className={"card-column__text"}>{badge.category}</p>
                                    <div className={"card-column__buttons"}>
                                        <Button text={ t('bouton.modify') } link={`#/badges/edit/${index}`} className={"blue-stroke"} isIcon={true} icon={edit} />
                                        <Button text={ t('bouton.delete') }
                                                click={() => {
                                                    setOpen(true);
                                                    setId({badgeId: badge.id, imageId: badge.badgeImage ? badge.badgeImage.id : null})
                                                }}
                                                className={"red-full"}
                                                isIcon={true}
                                                icon={trash}
                                        />
                                    </div>
                                </div>
                            )
                        })
                        :
                        <p>{ t('badges.no_badges_data') }</p>


                    }
                </div>

                <PopupDelete openPopup={openPopup} setOpen={setOpen} title={ t('popupBadge.title') }  text={ t('popupBadge.text') } deleteFunc={handleRemove} />
            </div>
        </div>
    );
}

export default ListBadges;