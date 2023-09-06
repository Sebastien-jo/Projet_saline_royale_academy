import React from 'react';

const useSortList = () => {

    //sort list by alphabetical order new and old
    const sortList = (list, type) => {
        let sortedList = [];

        if (type === "alphabetical") {
            sortedList = list.sort((a, b) => (a.name > b.name) ? 1 : -1);
        }if (type === "alphabeticalReverse") {
            sortedList = list.sort((a, b) => (a.name > b.name) ? -1 : 1);
        }if (type === "recent") {
            sortedList = list.sort((a, b) => (a.id > b.id) ? -1 : 1);
        }if (type === "old") {
            sortedList = list.sort((a, b) => (a.id > b.id) ? 1 : -1);
        }

        return sortedList;
    }

    return { sortList };


}

export default useSortList;