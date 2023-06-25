import React from "react";
import "../../styles/components/filters.css";

const FiltersCard = () => {
    return (
        <div className="filters-container">
            <div className="filter-button">Filtres <span className="filter-icon"></span> </div>

            <div className="filters-card">
                <div className="filters-card__header">
                    <h2>Filtrer par</h2>
                    <span className="close-icon"></span>
                </div>

                <div className="filters-card__content">
                    <div className="filters-card__content__item">
                        <h3>Instruments</h3>
                        <div className="item__list">
                            <div className="item__list__item">
                                <label htmlFor="guitare">Guitare</label>
                                <input type="checkbox" id="guitare" name="guitare" value="guitare"/>
                            </div>
                            <div className="item__list__item">
                                <label htmlFor="piano">Piano</label>
                                <input type="checkbox" id="piano" name="piano" value="piano"/>
                            </div>
                            <div className="item__list__item">
                                <label htmlFor="batterie">Batterie</label>
                                <input type="checkbox" id="batterie" name="batterie" value="batterie"/>
                            </div>
                        </div>
                    </div>

                    <div className="item__list">
                        <div className="other__list__item">
                            <label htmlFor="recent">Plus récents</label>
                            <input type="checkbox" id="recent" name="recent" value="recent"/>
                        </div>

                        <div className="other__list__item">
                            <label htmlFor="populaire">Plus populaires</label>
                            <input type="checkbox" id="populaire" name="populaire" value="populaire"/>
                        </div>

                        <div className="other__list__item">
                            <label htmlFor="alphabetique">Ordre alphabétique</label>
                            <input type="checkbox" id="alphabetique" name="alphabetique" value="alphabetique"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FiltersCard;