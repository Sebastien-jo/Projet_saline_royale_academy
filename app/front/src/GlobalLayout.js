import React from 'react';
import {Outlet} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import TitleBar from "./components/titleBar/TitleBar";
import {useLocation} from "react-router-dom";

function GlobalLayout({children}) {

    //get route name
    const route = useLocation();


  return (
    <div className="App">

        <Navbar />
        <div className="main">
            <TitleBar title="Home"/>
            <Outlet />
        </div>
    </div>
  );
}

export default GlobalLayout;
