import React from 'react';
import {Outlet} from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import TitleBar from "./components/titleBar/TitleBar";


function GlobalLayout({children}) {

  return (
    <div className="App">

        <Navbar />
        <div className="main">
            <TitleBar title="Home" />
            <Outlet />
        </div>
    </div>
  );
}

export default GlobalLayout;
