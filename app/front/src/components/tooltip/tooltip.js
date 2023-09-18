import React, {useState} from 'react';
import '../../styles/components/tooltip.css';
import tooltip from '../../assets/icones/icon-infos-Default.svg';

const Tooltip = ({text}) => {

    const [show, setShow] = useState(false);

    return (
        <div className="tooltip">
            <div className="tooltip-content" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
                <img src={tooltip} alt={"tooltip"} />
            </div>

            <div className={`tooltip-infos ${show ? "show" : "close"}`}>
                <p>{ text }</p>
            </div>
        </div>
    );
}

export default Tooltip;