import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Link, useLocation} from "react-router-dom";
import logo from "../../assets/logo/logo-full.svg";
import logo_small from "../../assets/logo/logo-small.svg";
import "../../styles/components/navbar.css"
import PopupParametre from "../popup/popupParametre";
import {useSelector} from "react-redux";
import { useTranslation } from 'react-i18next';

const Navbar = () => {

    const [navbarOpen, setNavbarOpen] = useState(false);
    const [activeLink, setActiveLink] = useState("");

    const user = useSelector(state => state.auth.user);
    const location = useLocation();
    const { t } = useTranslation();



    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    useEffect(() => {

        setActiveLink(location.pathname.split("/")[1]);

    }, [location]);

    return (
        <div className={`navbar ${navbarOpen ? "open" : "close"}`} onMouseEnter={() => setNavbarOpen(true)} onMouseLeave={() => setNavbarOpen(false)}>
            <div className="navbar__logo">
                <img className={navbarOpen ? "full" : "small"} src={navbarOpen ? logo : logo_small} alt="logo" />
            </div>

            <div className="navbar__line"></div>

            {
                user.roles[0] == "ROLE_USER" ?
                <div className="navbar__links">
                    <Link to="/" className={activeLink === "home" ? "active" : ""} onClick={() => handleLinkClick("home")}><span className="navbar__icon home"></span><p>{t('navbar.links.0.text')}</p></Link>
                    <Link to="/mystudy" className={activeLink === "mystudy" ? "active" : ""} onClick={() => handleLinkClick("mystudy")}><span className="navbar__icon mystudy"></span><p>{t('navbar.links.2.text')}</p></Link>
                    <Link to="/forum" className={activeLink === "forum" ? "active" : ""} onClick={() => handleLinkClick("forum")}><span className="navbar__icon forum"></span><p>{t('navbar.links.3.text')}</p></Link>
                    <Link to="/signets" className={activeLink === "signets" ? "active" : ""} onClick={() => handleLinkClick("signets")}><span className="navbar__icon signets"></span><p>{t('navbar.links.4.text')}</p></Link>
                    <Link to="/library" className={activeLink === "library" ? "active" : ""} onClick={() => handleLinkClick("library")}><span className="navbar__icon library"></span><p>{t('navbar.links.5.text')}</p></Link>
                </div>
                : user.roles[0] == "ROLE_TEACHER" ?
                <div className="navbar__links">
                    <Link to="/" className={activeLink === "mystudy" ? "active" : ""} onClick={() => handleLinkClick("mystudy")}><span className="navbar__icon mystudy"></span><p>{t('navbar.links.6.text')}</p></Link>
                    <Link to="/notations" className={activeLink === "notation" ? "active" : ""} onClick={() => handleLinkClick("notation")}><span className="navbar__icon notation"></span><p>{t('navbar.links.7.text')}</p></Link>
                    <Link to="/gestion" className={activeLink === "gestion" ? "active" : ""} onClick={() => handleLinkClick("gestion")}><span className="navbar__icon gestion"></span><p>{t('navbar.links.8.text')}</p></Link>
                </div>
                :
                <div className="navbar__links">
                    <Link to="/masterclass" className={activeLink === "masterclass" ? "active" : ""} onClick={() => handleLinkClick("masterclass")}><span className="navbar__icon masterclass"></span><p>masterclass</p></Link>
                    <Link to="/oeuvres" className={activeLink === "oeuvres" ? "active" : ""} onClick={() => handleLinkClick("oeuvres")}><span className="navbar__icon oeuvres"></span><p>oeuvres</p></Link>
                    <Link to="/compositeurs" className={activeLink === "compositeurs" ? "active" : ""} onClick={() => handleLinkClick("compositeurs")}><span className="navbar__icon compositeurs"></span><p>compositeur</p></Link>
                    <Link to="/badges" className={activeLink === "badges" ? "active" : ""} onClick={() => handleLinkClick("badges")}><span className="navbar__icon badges"></span><p>badge</p></Link>
                    <Link to="/users" className={activeLink === "users" ? "active" : ""} onClick={() => handleLinkClick("users")}><span className="navbar__icon users"></span><p>user</p></Link>
                </div>

            }

            <div className="navbar__line"></div>

            <div className="navbar__user">
                <div className={`navbar__links_link ${activeLink === "params" ? "active" : ""}`} onClick={() => handleLinkClick("params")}><span className="navbar__icon parameters"></span><p>{t('navbar.links.9.text')}</p></div>
                <Link to="/account" className="navbar__user__avatar">
                    <div className="navbar__user__avatar__img"></div>
                    <div className="navbar__user__infos">
                        <div className="navbar__user__name">{ user.firstname } {user.lastname}</div>
                        {
                            user.roles[0] !== "ROLE_TEACHER" ?
                                <div className="navbar__user__status">{t('navbar.roles.0')}</div>
                                :
                                <div className="navbar__user__status">{t('navbar.roles.1')}</div>
                        }
                    </div>
                </Link>
            </div>

            <PopupParametre closePopup={activeLink === "params" ? true : false} />

        </div>
    );
}

export default Navbar;