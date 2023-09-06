import React from "react";
import "../../styles/components/card.css";
import Button from "../button/button";
import Pastille from "../pastille/pastille";
import icon from "../../assets/icones/icon-infos-White-stroke.svg";
import ButtonFavoris from "../button/ButtonFavoris";
import {useParseDate} from "../../hooks/useParseDate";


const CardColumn = ({ setReload, image, title, subtitle, description, link, category, favoris = false , id, handleSelect, isSelected, isFavorite = false, create, isAdmin, handleDelete }) => {

    const {parseDate} = useParseDate();

        const handleClick = () => {
            handleSelect();
        }

        return (
            <div className={`card-column ${isSelected ? "selected" : ""}`}>
                <div className="card-image">
                    {favoris ? <ButtonFavoris favoris={favoris} id={id} isFavorite={isFavorite} setReload={setReload}/> : null}
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
                        <p className={"subtitle"}>Ajouté le {parseDate(create)}</p>
                    }

                    <Button className={"blue-full"} isIcon={true} icon={icon} link={link} text={"Voir"} click={handleClick} />
                    {
                        isAdmin &&
                        <Button className={"red-full"} text={"Supprimer"} click={handleDelete} />
                    }
                </div>

            </div>
        );
}

export default CardColumn;