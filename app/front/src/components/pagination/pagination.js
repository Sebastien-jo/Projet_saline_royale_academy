import React from 'react';
import '../../styles/components/pagination.css';
import {useTranslation} from "react-i18next";

const Pagination = ({currentPage, totalPages, nextPage, prevPage, goToPage}) => {

    const { i18n, t } = useTranslation();

    return totalPages === 1 ? null : (
        <div className="pagination">
            <button className={"button-prev"} onClick={prevPage} disabled={currentPage === 1}>
                { t('pagination.previous') }
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    className={`pagination__item ${currentPage === index + 1 ? "active" : ""}`}
                    key={index}
                    onClick={() => goToPage(index + 1)}
                    disabled={currentPage === index + 1}
                >
                    {index + 1}
                </button>
            ))}
            <button className={"button-next"} onClick={nextPage} disabled={currentPage === totalPages}>
                { t('pagination.next') }
            </button>
        </div>
    )
}

export default Pagination;