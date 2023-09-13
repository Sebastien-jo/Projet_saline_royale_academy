import { useState, useCallback, useEffect } from 'react';

export const useReload = () => {
    const [reload, setReload] = useState(false);

    const setIsReload = (e) => {
        setReload(e);
    }


    return { reload, setIsReload };
};