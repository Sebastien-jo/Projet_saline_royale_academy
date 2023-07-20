import React, { useState, useEffect } from 'react';
import {Outlet} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import TitleBar from "./components/titleBar/TitleBar";
import {useLocation} from "react-router-dom";
import NavBarMobile from "./components/navbar/NavBarMobile";
import TitleBarMobile from "./components/titleBar/titleBarMobile";
import {useIsMobileScreen} from "./utils/mobileScreenUtils";

function GlobalLayout({children}) {

    //get route name
    const route = useLocation();

    const isMobile = useIsMobileScreen();



  return (
    <>
      { !isMobile ?
          <div className={`App`}>
              <Navbar />
              <div className={"main"}>
                  <TitleBar title="Home"/>
                   <Outlet />
              </div>
          </div>
          :
          <div className={`App mobile`}>
             <NavBarMobile />
              <div className={"main"}>
                  <TitleBarMobile title="Forum"/>
                  <Outlet />
              </div>
          </div>
        }
    </>
  );
}

export default GlobalLayout;
