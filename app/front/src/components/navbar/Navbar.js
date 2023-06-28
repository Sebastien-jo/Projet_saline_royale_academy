import React, {useState} from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import logo from "../../assets/logo/logo-full.svg";
import logo_small from "../../assets/logo/logo-small.svg";
import "../../styles/components/navbar.css"
import PopupParametre from "../popup/popupParametre";
import {useSelector} from "react-redux";

const Navbar = () => {

    const [navbarOpen, setNavbarOpen] = useState(false);
    const [activeLink, setActiveLink] = useState("");

    const user = useSelector(state => state.auth.user);


    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    return (
        <div className={`navbar ${navbarOpen ? "open" : "close"}`} onMouseEnter={() => setNavbarOpen(true)} onMouseLeave={() => setNavbarOpen(false)}>
            <div className="navbar__logo">
                <img className={navbarOpen ? "full" : "small"} src={navbarOpen ? logo : logo_small} alt="logo" />
            </div>

            <div className="navbar__line"></div>

            {
                user.roles[0] !== "TEACHER" ?
                <div className="navbar__links">
                    <Link to="/" className={activeLink === "home" ? "active" : ""} onClick={() => handleLinkClick("home")}><span className="navbar__icon home"></span><p>Home</p></Link>
                    <Link to="/masterclass" className={activeLink === "masterclass" ? "active" : ""} onClick={() => handleLinkClick("masterclass")}><span className="navbar__icon masterclass"></span><p>Masterclass</p></Link>
                    <Link to="/mystudy" className={activeLink === "mystudy" ? "active" : ""} onClick={() => handleLinkClick("mystudy")}><span className="navbar__icon mystudy"></span><p>MyStudy</p></Link>
                    <Link to="/signets" className={activeLink === "signets" ? "active" : ""} onClick={() => handleLinkClick("signets")}><span className="navbar__icon signets"></span><p>Signets</p></Link>
                    <Link to="/library" className={activeLink === "library" ? "active" : ""} onClick={() => handleLinkClick("library")}><span className="navbar__icon library"></span><p>Library</p></Link>
                </div>
                :
                <div className="navbar__links">
                    <Link to="/" className={activeLink === "mystudy" ? "active" : ""} onClick={() => handleLinkClick("mystudy")}><span className="navbar__icon mystudy"></span><p>My Course</p></Link>
                    <Link to="/notations" className={activeLink === "notation" ? "active" : ""} onClick={() => handleLinkClick("notation")}><span className="navbar__icon notation"></span><p>Notations</p></Link>
                    <Link to="/gestion" className={activeLink === "gestion" ? "active" : ""} onClick={() => handleLinkClick("gestion")}><span className="navbar__icon gestion"></span><p>Gestion</p></Link>
                </div>
            }

            <div className="navbar__line"></div>

            <div className="navbar__user">
                <div className={`navbar__links_link ${activeLink === "params" ? "active" : ""}`} onClick={() => handleLinkClick("params")}><span className="navbar__icon parameters"></span><p>Paramètres</p></div>
                <Link to="/account" className="navbar__user__avatar">
                    <div className="navbar__user__avatar__img"></div>
                    <div className="navbar__user__infos">
                        <div className="navbar__user__name">{ user.username }</div>
                        {
                            user.roles[0] !== "TEACHER" ?
                                <div className="navbar__user__status">Student</div>
                                :
                                <div className="navbar__user__status">Teacher</div>
                        }
                    </div>
                </Link>
            </div>

            <PopupParametre closePopup={activeLink === "params" ? true : false} />

        </div>
    );
}

export default Navbar;