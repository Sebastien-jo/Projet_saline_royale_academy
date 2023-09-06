import React from 'react';
import { useTranslation } from 'react-i18next';

const userFilterList = () => {

    const sortByCategory = (list, category) => {
        let sortedList = [];
        sortedList = list.filter(item => item.category === category);
        return sortedList;
    }

    const sortByComposer = (list, composer) => {
        let sortedList = [];
        sortedList = list.filter(item => item.composer === composer);
        return sortedList;
    }

}

export default userFilterList;
