import React from 'react';
import "../../styles/components/pastille.css";

const Pastille = ({text, color}) => {
    return(
        <div className={`pastille ${color}`}>
            {text}
        </div>
    )
}

export default Pastille;