import React, { useState, useEffect } from 'react';
import Pastille from '../pastille/pastille';
import {useTranslation} from "react-i18next";

const SelectFilter = ({ items, applyFilters }) => {
    const [selectedFilters, setSelectedFilters] = useState([]);

    const { i18n, t } = useTranslation();

    const handleFilterChange = (event) => {
        const category = event.target.value;
        if (selectedFilters.includes(category)) {
            setSelectedFilters((prevSelected) =>
                prevSelected.filter((selected) => selected !== category)
            );
        } else {
            setSelectedFilters((prevSelected) => [...prevSelected, category]);
        }
    };

    useEffect(() => {
        applyFilters(selectedFilters);
    }, [selectedFilters]);

    const handlePastilleClick = (category) => {
        setSelectedFilters((prevSelected) =>
            prevSelected.filter((selected) => selected !== category)
        );
    };

    const categories = [...new Set(items.map((item) => item.name))];

    const filteredItems = items.filter((item) =>
        selectedFilters.includes(item.name)
    );

    return (
        <div className="select-filter">
            <div className="filter-container">
                <label htmlFor="filterSelect" className="filter-label">
                    { t('filters.filter_category') }
                </label>
                <select
                    id="filterSelect"
                    multiple
                    value={selectedFilters}
                    onChange={handleFilterChange}
                    className="filter-select"
                >
                    {categories.map((categoryName) => (
                        <option key={categoryName} value={categoryName}>
                            {categoryName}
                        </option>
                    ))}
                </select>
            </div>
            <div className="item-container">
                {filteredItems.map((item) => (
                    <div className={"filter-item"} key={item.id} onClick={() => handlePastilleClick(item.name)}>
                        <p>{item.name}</p>
                        <span>x</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SelectFilter;
