import React from 'react';
import "../../styles/components/pastille.css";

const Pastille = ({text, className, click = () => {}}) => {
    return(
        <div className={`pastille ${className}`} onClick={click}>
            {text}
        </div>
    )
}

export default Pastille;