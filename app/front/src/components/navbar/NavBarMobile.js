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
                    user.roles[0] == "ROLE_USER" ?
                    <div className="navbar__links">
                        <Link to="/" className={activeLink === "home" ? "active" : ""} onClick={() => handleLinkClick("home")}><span className="navbar__icon home"></span></Link>
                        <Link to="/signets" className={activeLink === "signets" ? "active" : ""} onClick={() => handleLinkClick("signets")}><span className="navbar__icon signets"></span></Link>
                        <Link to="/mystudy" className={activeLink === "mystudy" ? "active" : ""} onClick={() => handleLinkClick("mystudy")}><span className="navbar__icon mystudy"></span></Link>
                        <Link to="/forum" className={activeLink === "forum" ? "active" : ""} onClick={() => handleLinkClick("forum")}><span className="navbar__icon forum"></span></Link>
                        <Link to="/library" className={activeLink === "library" ? "active" : ""} onClick={() => handleLinkClick("library")}><span className="navbar__icon library"></span></Link>
                    </div>
                    : user.roles[0] == "ROLE_TEACHER" ?
                    <div className="navbar__links">
                    </div>
                    :
                    <div className="navbar__links">
                    </div>

                }
        </div>
    );
}

export default NavBarMobile;