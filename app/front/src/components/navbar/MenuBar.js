import React, {useState} from "react";
import {Link} from "react-router-dom";
import "../../styles/components/menubar.css";

const MenuBar = ({items}) => {

    const [isLinkActive, setIsLinkActive] = useState("");

    const handleLinkToggle = (name) => {
        setIsLinkActive(name);
    }




    return (
        <div className="menu-bar">
            <div className="menu-bar__row">
                {
                    items.map((item, index) => {
                        return (
                            <div key={index} className={`menu-bar__item ${isLinkActive === item.name ? "active" : ""}`} onClick={() => handleLinkToggle(item.name)}>
                                <Link to={item.link} >{item.name}</Link>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default MenuBar;