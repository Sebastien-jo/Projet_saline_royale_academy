import React from 'react';
import Navbar from "./components/navbar/Navbar";
import TitleBar from "./components/titleBar/titleBar";


function GlobalLayout({children}) {

    children = React.Children.map(children, child => {
        return React.cloneElement(child, {
            title: child.props.title
        });
    });



  return (
    <div className="App">

        <Navbar />
        <div className="main">
            <TitleBar title="Home" />
            {children}
        </div>
    </div>
  );
}

export default GlobalLayout;
