import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import "../../styles/components/navbar.css"
import {useLocation} from "react-router-dom";

const NavBarMobile = () => {

    const [activeLink, setActiveLink] = useState("");
    const user = useSelector(state => state.auth.user);
    const location = useLocation();
    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    useEffect(() => {

        setActiveLink(location.pathname.split("/")[1]);
    }, [location]);

    return (
        <div className="navbar-mobile">
                {
                    user.roles[0] == "ROLE_STUDENT" ?
                    <div className="navbar__links">
                        <Link to="/" className={activeLink === "home" ? "active" : ""} onClick={() => handleLinkClick("home")}><span className="navbar__icon home"></span></Link>
                        <Link to="/signets" className={activeLink === "signets" ? "active" : ""} onClick={() => handleLinkClick("signets")}><span className="navbar__icon signets"></span></Link>
                        <Link to="/mystudy" className={activeLink === "mystudy" ? "active" : ""} onClick={() => handleLinkClick("mystudy")}><span className="navbar__icon mystudy"></span></Link>
                        <Link to="/forum" className={activeLink === "forum" ? "active" : ""} onClick={() => handleLinkClick("forum")}><span className="navbar__icon forum"></span></Link>
                        <Link to="/library" className={activeLink === "library" ? "active" : ""} onClick={() => handleLinkClick("library")}><span className="navbar__icon library"></span></Link>
                    </div>
                    : user.roles[0] == "ROLE_TEACHER" ?
                    <div className="navbar__links">
                        <Link to="/" className={activeLink === "mystudy" ? "active" : ""} onClick={() => handleLinkClick("mystudy")}><span className="navbar__icon mystudy"></span></Link>
                        <Link to="/notations" className={activeLink === "notation" ? "active" : ""} onClick={() => handleLinkClick("notation")}><span className="navbar__icon notation"></span></Link>
                        <Link to="/gestion" className={activeLink === "gestion" ? "active" : ""} onClick={() => handleLinkClick("gestion")}><span className="navbar__icon gestion"></span></Link>
                    </div>
                    :
                    <div className="navbar__links">
                        <Link to="/masterclass" className={activeLink === "masterclass" ? "active" : ""} onClick={() => handleLinkClick("masterclass")}><span className="navbar__icon masterclass"></span></Link>
                        <Link to="/oeuvres" className={activeLink === "oeuvres" ? "active" : ""} onClick={() => handleLinkClick("oeuvres")}><span className="navbar__icon oeuvres"></span></Link>
                        <Link to="/compositeurs" className={activeLink === "compositeurs" ? "active" : ""} onClick={() => handleLinkClick("compositeurs")}><span className="navbar__icon compositeurs"></span></Link>
                        <Link to="/badges" className={activeLink === "badges" ? "active" : ""} onClick={() => handleLinkClick("badges")}><span className="navbar__icon badges"></span></Link>
                        <Link to="/users" className={activeLink === "users" ? "active" : ""} onClick={() => handleLinkClick("users")}><span className="navbar__icon users"></span></Link>
                    </div>

                }
        </div>
    );
}

export default NavBarMobile;