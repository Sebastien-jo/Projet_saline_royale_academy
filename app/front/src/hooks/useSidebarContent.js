import React from 'react';

import { useState } from 'react';

const useSidebarContent = () => {
    const [sidebarContent, setSidebarContent] = useState(null);

    const updateSidebarContent = (cardInfo) => {
        setSidebarContent(cardInfo);
    };

    const clearSidebarContent = () => {
        setSidebarContent(null);
    };

    return {
        sidebarContent,
        updateSidebarContent,
        clearSidebarContent,
    };
};

export default useSidebarContent;
