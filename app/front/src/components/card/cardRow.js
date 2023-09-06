import React from 'react';
import Button from "../button/button";
import ButtonFavoris from "../button/ButtonFavoris";
import Pastille from "../pastille/pastille";
import {useParseDate} from "../../hooks/useParseDate";


const CardRow = ({ setReload, title, subtitle, text, bouton, link, image, favoris, id, category = [], isFavorite = false, create }) => {


    const {parseDate} = useParseDate();
    const categoryList = Array.isArray(category) ? category : [category]; // Convert single object to an array


    return (
        <div className="card-row">
            <div className="card-row__image">
                {favoris ? <ButtonFavoris favoris={favoris} id={id} isFavorite={isFavorite} setReload={{ setReload}}/> : null}
                <img src={image} alt="image"/>
            </div>
            <div className="card-row__content">
                <div className="card-row__content__pastille">
                    {
                        categoryList.length > 0 &&
                        categoryList.map((item, index) => (
                            <Pastille key={index} text={item.name} className={item.name.toLowerCase()} />
                        ))
                    }
                </div>
                <h2>{title}</h2>
                <h3 className="subtitle">{subtitle}</h3>
                <p>{text}</p>
                <Button text={bouton} link={link} className="blue-full" isArrow={true}/>
            </div>
        </div>
    );
}

export default CardRow;
