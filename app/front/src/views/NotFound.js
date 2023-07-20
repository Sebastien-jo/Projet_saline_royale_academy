import React from 'react';
import Button from "../components/button/button";
import icon_add from "../assets/icones/icon-add-White.svg";
import ListUsers from "../components/list/listUsers";

const NotFound= () => {

    return (
        <div className="main-container">
            <div className="main-content">

                <h1>404 Not Found</h1>
                <p>The page you are looking for does not exist.</p>
            </div>
        </div>
    );
}

export default NotFound;