import React from 'react';

const Pagination = ({currentPage, totalPages, nextPage, prevPage, goToPage}) => {

    return(
        <div className="pagination">
            <button onClick={prevPage} disabled={currentPage === 1}>
                Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index}
                    onClick={() => goToPage(index + 1)}
                    disabled={currentPage === index + 1}
                >
                    {index + 1}
                </button>
            ))}
            <button onClick={nextPage} disabled={currentPage === totalPages}>
                Next
            </button>
        </div>
    )
}

export default Pagination;