import React from 'react';
import Button from "../button/button";
import ButtonFavoris from "../button/ButtonFavoris";
import Pastille from "../pastille/pastille";


const CardRow = ({ title, subtitle, text, bouton, link, image, favoris, id, category = [] }) => {

    const categoryList = Array.isArray(category) ? category : [category]; // Convert single object to an array

    return (
        <div className="card-row">
            <div className="card-row__image">
                {favoris ? <ButtonFavoris favoris={favoris} id={id}/> : null}
                <img src={image} alt="image"/>
            </div>
            <div className="card-row__content">
                {
                    categoryList.length > 0 &&
                    categoryList.map((item, index) => (
                        <Pastille key={index} text={item.name} className={item.name} />
                    ))
                }
                <h2>{title}</h2>
                <h3 className="subtitle">{subtitle}</h3>
                <p>{text}</p>
                <Button text={bouton} link={link} className="blue-full" isArrow={true}/>
            </div>
        </div>
    );
}

export default CardRow;
