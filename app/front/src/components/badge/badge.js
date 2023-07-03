import React from 'react';
import '../../styles/components/badge.css';
import Tooltip from '../tooltip/tooltip';


const Badge = () => {
    return (
        <div className={"badge"}>
            <div className={"badge-card"}>
                <div className={"badge-card-img"}>
                    <img src={"https://via.placeholder.com/150"} alt={"badge"} />
                </div>

                <Tooltip />
            </div>

            <div className={"badge-card-infos"}>
                <h3>Nom du badge</h3>
            </div>

        </div>
    );
}

export default Badge;