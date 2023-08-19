import React from 'react';
import '../../styles/components/badge.css';
import Tooltip from '../tooltip/tooltip';
import img from '../../assets/logo/logo_badge.png';
import img2 from '../../assets/logo/logo_badge_2.png';
import img3 from '../../assets/logo/logo_badge_3.png';


const Badge = ({name, image}) => {

    return (
        <div className={"badge"}>
            <div className={"badge-card"}>
                <div className={"badge-card-img"}>
                    <img src={image} alt={image}/>
                </div>

                <Tooltip />
            </div>

            <div className={"badge-card-infos"}>
                <h3>{ name }</h3>
            </div>

        </div>
    );
}

export default Badge;