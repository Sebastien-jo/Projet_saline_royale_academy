import { useState, useCallback } from 'react';

export const useReload = () => {
    //set reload true to reload the api from parent component

    const [reload, setReload] = useState(false);

    const reloadApi = () => {
        setReload(!reload);
    }

    return { reload, reloadApi };
};