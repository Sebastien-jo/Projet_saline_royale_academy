import React from "react";
import "../../styles/components/card.css";
import Button from "../button/button";
import Pastille from "../pastille/pastille";
import icon from "../../assets/icones/icon-infos-White-stroke.svg";
import ButtonFavoris from "../button/ButtonFavoris";
import {useParseDate} from "../../hooks/useParseDate";
import {useTranslation} from "react-i18next";


const CardColumn = ({image, title, subtitle, description, link, category, favoris = false , id, handleSelect, isSelected, isFavorite = false, create, isAdmin, handleDelete, setIsReload}) => {

    const {parseDate} = useParseDate();

    const { i18n, t } = useTranslation();

        const handleClick = () => {
            handleSelect();
        }

        return (
            <div className={`card-column ${isSelected ? "selected" : ""}`}>
                <div className="card-image">
                    {favoris ? <ButtonFavoris favoris={favoris} id={id} isFavorite={isFavorite} setIsReload={setIsReload} /> : null}
                    <img src={image} alt="image" />
                </div>

                <div className="card-content">
                    <div className="card-header">
                        <div className="card-title-infos">
                            <h3>{ title }</h3>
                            <span className={"title-subtitle"}>{ subtitle }</span>
                        </div>
                        {
                            category.length > 1 ?
                                category.map((item, index) => {
                                    return(
                                        <Pastille key={index} text={item.name} className={item.name.toLowerCase()} />
                                    )
                                }
                            ) :

                                category.length === 1 ?
                                    <Pastille text={category[0].name} className={category[0].name.toLowerCase()} />
                                : category.name ?
                                    <Pastille text={category.name} className={category.name.toLowerCase()} />
                                    : null
                            }
                    </div>

                    <div className="card-body">
                        <p>{description}</p>
                    </div>

                    {
                        create &&
                        <p className={"subtitle"}>{t('card.add_at') }  {parseDate(create)}</p>
                    }

                    <div className={"card-column__buttons"}>
                        <Button className={"blue-full"} isIcon={true} icon={icon} link={link} text={t('bouton.snippet') } click={handleClick} />
                        {
                            isAdmin &&
                            <Button className={"red-full"} text={t('bouton.delete') } click={handleDelete} />
                        }
                    </div>
                </div>

            </div>
        );
}

export default CardColumn;