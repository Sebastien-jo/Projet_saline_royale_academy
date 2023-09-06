import React from "react";

import {getCategory, getCategories, getCategoriesNoToken}  from "../../api/endpoints/category";

const useCategories = () => {
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const handleGet = async (id) => {
        try {
            const response = await getCategory(id);
            return response; // Return the response from the function
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    };

    const handleGetAll = async () => {
        try {
            const response = await getCategories();
            return response; // Return the response from the function
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    };

    const handleGetNoToken = async () => {
        try {
            const response = await getCategoriesNoToken();
            return response; // Return the response from the function
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }

    return {
        loading,
        error,
        handleGet,
        handleGetAll,
        handleGetNoToken
    };
}

export default useCategories;