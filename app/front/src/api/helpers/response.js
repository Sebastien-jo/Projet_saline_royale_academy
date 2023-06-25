import React from "react";

export const parseResponse = (response) => {
    // Perform common response parsing tasks
    return response.data;
};

export const handleErrorResponse = (error) => {
    // Perform common error handling tasks
    throw error;
};

export default {
    parseResponse,
    handleErrorResponse,
};