import React, { useState, useEffect } from "react";
import "../../styles/components/filters.css";
import useCategories from "../../hooks/api/useCategories";
import SelectFilter from "./selectFilter";

const FiltersModal = ({ list, setSortedList, isMasterclass = false }) => {
    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState([]);

    const { loading, error, handleGetAll } = useCategories();

    useEffect(() => {
        handleGetAll()
            .then(response => {
                setCategories(response);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const applyFilters = (selectedFilters) => {

        if (selectedFilters.length === 0) {
            setSortedList(list); // No filters applied, set the original list
        } else {
            const filteredList = list.filter(item => {
                if (item.categories) {
                    // If the item has categories, check if any of them match the selected filters
                    return item.categories.some(category => selectedFilters.includes(category.name));
                } else {
                    // If the item doesn't have categories, check if its category name matches any selected filter
                     if (isMasterclass) {
                         return selectedFilters.includes(item.work.category.name);
                     } else {
                         return selectedFilters.includes(item.category.name);
                     }
                }
            });

            console.log(filteredList);
            setSortedList(filteredList); // Set the filtered list
        }
    };

    return (
        <div className="filters-container">
            <div className="filter-button" onClick={() => setOpen(!open)}>
                Filtres <span className="filter-icon"></span>{" "}
            </div>

            <div className={`filters-card ${open ? "active" : ""}`}>
                <div className="filters-card__header">
                    <h2>Filtrer par</h2>
                    <span className="close-icon" onClick={() => setOpen(false)}></span>
                </div>

                <div className="filters-card__content">
                    <div className="filters-card__content__item">
                        <div className="item__list">
                            <SelectFilter items={categories} applyFilters={applyFilters} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FiltersModal;
