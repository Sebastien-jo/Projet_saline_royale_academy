import React, {useState} from 'react';
import '../../styles/components/tooltip.css';
import tooltip from '../../assets/icones/icon-infos-Default.svg';

const Tooltip = () => {

    const [show, setShow] = useState(false);

    return (
        <div className="tooltip">
            <div className="tooltip-content" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
                <img src={tooltip} alt={"tooltip"} />
            </div>

            <div className={`tooltip-infos ${show ? "show" : "close"}`}>
                <h3>Titre du tooltip</h3>
                <p>Contenu du tooltip</p>
            </div>
        </div>
    );
}

export default Tooltip;