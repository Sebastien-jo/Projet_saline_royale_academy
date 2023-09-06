import React, {useState} from "react";
import "../../styles/components/filters.css";
import useSortList from "../../hooks/useSortList";



const SortModal = ({list, setSortedList}) => {

    const [open, setOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");

    const { sortList } = useSortList(); // Use the custom hook

    const handleChange = (event) => {
        const { name } = event.target;
        setSelectedOption(name);
        const sortedList = sortList(list, name);
        setSortedList([...sortedList]);
    };


    return (
        <div className="filters-container">
            <div className="filter-button" onClick={() => setOpen(true)}>
                Trier par <span className="sort-icon"></span>{" "}
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
                                <label htmlFor="recent">Récents</label>
                                <input
                                    type="checkbox"
                                    id="recent"
                                    name="recent"
                                    value="recent"
                                    onChange={handleChange}
                                    className={selectedOption === "recent" ? "active" : ""}
                                />
                            </div>
                            <div className="item__list__item">
                                <label htmlFor="old">Anciens</label>
                                <input
                                    type="checkbox"
                                    id="old"
                                    name="old"
                                    value="old"
                                    onChange={handleChange}
                                    className={selectedOption === "old" ? "active" : ""}
                                />
                            </div>
                            <div className="item__list__item">
                                <label htmlFor="alphabetical">Alphabétique</label>
                                <input
                                    type="checkbox"
                                    id="alphabetical"
                                    name="alphabetical"
                                    value="alphabetical"
                                    onChange={handleChange}
                                    className={selectedOption === "alphabetical" ? "active" : ""}
                                />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SortModal;