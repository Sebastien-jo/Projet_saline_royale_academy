import { useState } from 'react';

export const useParseDate = () => {

    const parseDate = (dateStr) => {
        const date = new Date(dateStr);
        const day = date.getDate();
        const month = formatWithLeadingZero(date.getMonth() + 1); // Format month with leading zero
        const year = date.getFullYear();

        const formattedDate = `${day}/${month}/${year}`;

        return formattedDate;
    };

    return {
        parseDate
    };
};

function formatWithLeadingZero(value) {
    return value < 10 ? `0${value}` : value.toString();
}
