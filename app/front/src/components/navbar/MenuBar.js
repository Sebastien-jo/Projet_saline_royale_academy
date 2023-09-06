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
                            <Link to={item.link} state={{title: item.name }} key={index} onClick={() => handleLinkToggle(item.name)} className={`menu-bar__item ${isLinkActive === item.name ? "active" : null}`} >
                                <div key={index} className={`menu-bar__item ${isLinkActive === item.name ? "active" : ""}`} >{item.name}</div>
                            </Link>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default MenuBar;