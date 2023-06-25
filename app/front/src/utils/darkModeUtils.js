import React from "react";

export const applyDarkModeStyles = () => {
    // Apply dark mode styles to your application
    // You can access the DOM or modify CSS classes here
    document.body.classList.add('dark-mode');
};

export const removeDarkModeStyles = () => {
    // Remove dark mode styles from your application
    document.body.classList.remove('dark-mode');
};

export const saveDarkModePreference = (isDarkMode) => {
    // Save the user's dark mode preference to local storage or a backend server
    localStorage.setItem('darkMode', isDarkMode);
};

export const loadDarkModePreference = () => {
    // Load the user's dark mode preference from local storage or a backend server
    return localStorage.getItem('darkMode');
};