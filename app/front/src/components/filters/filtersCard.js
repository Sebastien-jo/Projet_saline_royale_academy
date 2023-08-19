import React, {useState} from "react";
import "../../styles/components/filters.css";

const FiltersCard = () => {

    const [filters, setFilters] = useState({
        instruments: [],
        recent: false,
        alphabetical: false,
    });

     const [open, setOpen] = useState(false);

    const handleInstrumentChange = (e) => {
        const instrument = e.target.value;
        const isChecked = e.target.checked;

        setFilters((prevFilters) => {
            let updatedInstruments = [...prevFilters.instruments];

            if (isChecked) {
                updatedInstruments.push(instrument);
            } else {
                updatedInstruments = updatedInstruments.filter(
                    (item) => item !== instrument
                );
            }

            return {
                ...prevFilters,
                instruments: updatedInstruments,
            };
        });
    };

    const handleOptionChange = (e) => {
        const option = e.target.name;
        const isChecked = e.target.checked;

        setFilters((prevFilters) => ({
            ...prevFilters,
            [option]: isChecked,
        }));
    };

    // Filter data based on selected filters
    const filteredData = /* Your filtering logic here */ [];

    return (
        <div className="filters-container">
            <div className="filter-button" onClick={() => setOpen(true)}>
                Filtres <span className="filter-icon"></span>{" "}
            </div>

            <div className="filter-button" onClick={() => setOpen(true)}>
                Trier <span className="filter-icon"></span>{" "}
            </div>

            <div className={`filters-card ${open ? "active" : ""}`}>
                <div className="filters-card__header">
                    <h2>Filtrer par</h2>
                    <span className="close-icon" onClick={() => setOpen(false)}></span>
                </div>

                <div className="filters-card__content">
                    <div className="filters-card__content__item">
                        <div className="item__list">
                            <div className="item__list__item">
                                <label htmlFor="guitare">Guitare</label>
                                <input
                                    type="checkbox"
                                    id="guitare"
                                    name="guitare"
                                    value="guitare"
                                    onChange={handleInstrumentChange}
                                />
                            </div>
                            <div className="item__list__item">
                                <label htmlFor="piano">Piano</label>
                                <input
                                    type="checkbox"
                                    id="piano"
                                    name="piano"
                                    value="piano"
                                    onChange={handleInstrumentChange}
                                />
                            </div>
                            <div className="item__list__item">
                                <label htmlFor="batterie">Batterie</label>
                                <input
                                    type="checkbox"
                                    id="batterie"
                                    name="batterie"
                                    value="batterie"
                                    onChange={handleInstrumentChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FiltersCard;