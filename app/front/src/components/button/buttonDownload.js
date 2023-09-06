import React from 'react';
import "../../styles/components/button.css";
import arrow from "../../assets/icones/icon-arrow-White.svg";

function DownloadButton({fileUrl, fileName, className, isArrow = false, isIcon = false, icon = "", text, link, click = false}) {
    const handleDownload = () => {
        const fileUrl = fileUrl;
        const link = document.createElement('a');
        link.href = fileUrl;
        link.setAttribute('download', fileName); // Set the desired filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <a className={`button ${className}`} href={link} onClick={handleDownload} target={"_blank"}>
            { isIcon ? <img src={icon} /> : null }
            { text !== "" ? text : null }
            { isArrow ? <img src={arrow} className={"isArrow"}/>  : null }
        </a>
    );
}

export default DownloadButton;
