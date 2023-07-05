import React, {useState} from 'react';
import Button from "../button/button";
import icon from "../../assets/icones/icon-chevron-White-stroke.svg";
import PopupEvent from "../popup/popupEvent";

const CardFull = ({title, bouton, link, background, isPopup = false}) => {

    const [openPopup, setOpenPopup] = useState(false);

    const handleOpen = () => {
        setOpenPopup(true);
    }

    return(
        <div className="card-full" style={{background: `linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${background}) no-repeat center/cover`}}>
            <h1>{title}</h1>
            {
                isPopup ?
                    <>
                        <Button text={bouton} className={"red-full"} isIcon={true} icon={icon} click={() => handleOpen()} />
                        <PopupEvent openPopup={openPopup} setOpen={setOpenPopup} />
                    </>
                    :
                    <Button text={bouton} link={link} className={"red-full"} isIcon={true} icon={icon} />
            }
        </div>
    )
}

export default CardFull;