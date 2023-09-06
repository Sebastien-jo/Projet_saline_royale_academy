import React, { useState, useEffect } from 'react';
import Pastille from '../pastille/pastille';

const SelectFilter = ({ items, applyFilters }) => {
    const [selectedFilters, setSelectedFilters] = useState([]);

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
            <h1>Filterable List</h1>
            <div className="filter-container">
                <label htmlFor="filterSelect" className="filter-label">
                    Filter by category:
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
                    <Pastille
                        key={item.id}
                        text={item.name}
                        className="red"
                        click={() => handlePastilleClick(item.name)}
                    />
                ))}
            </div>
        </div>
    );
};

export default SelectFilter;
