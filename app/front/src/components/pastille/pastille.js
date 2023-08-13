import React from 'react';
import "../../styles/components/pastille.css";

const Pastille = ({text, className}) => {
    return(
        <div className={`pastille ${className}`}>
            {text}
        </div>
    )
}

export default Pastille;