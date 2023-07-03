import React, {useState, useEffect} from "react";
import "../../styles/components/darklightswitch.css";
import {applyDarkModeStyles, removeDarkModeStyles, loadDarkModePreference, saveDarkModePreference} from "../../utils/darkModeUtils";


const DarkLightSwitch = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Load the user's dark mode preference
        const darkModePreference = loadDarkModePreference();
        const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;


        if (darkModePreference === "true" || (!darkModePreference && prefersDarkMode)) {
            // If the preference is true, enable dark mode
            setIsDarkMode(true);
            applyDarkModeStyles();
            saveDarkModePreference(true);
        } else {
            // If the preference is false or not set, disable dark mode
            setIsDarkMode(false);
            removeDarkModeStyles();
            saveDarkModePreference(false);
        }
    }, []);

    const handleSwitchToggle = () => {
        setIsDarkMode((prevMode) => !prevMode);

        if (isDarkMode) {
            removeDarkModeStyles();
            saveDarkModePreference(false);

        } else {
            applyDarkModeStyles();
            saveDarkModePreference(true);
        }
    }

    return (
        <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
            <label className="switch">
                <input
                    type="checkbox"
                    checked={isDarkMode}
                    onChange={handleSwitchToggle}
                />
                <span className="slider"></span>
            </label>
        </div>
    );
}

export default DarkLightSwitch;