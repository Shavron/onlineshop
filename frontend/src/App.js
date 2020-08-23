import React, { useState } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Container from "@material-ui/core/Container";

import NavBar from "./components/NavBar";
import Drawer from "./components/Drawer";
import Routes from "./components/Routes";
import Footer from "./components/Footer";

function App() {
  const [drawerState, setdrawerState] = useState({
    open: false,
    position: "left"
  });

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;

  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };

  const _handleDrawer = t => {
    setdrawerState({ ...drawerState, open: t });
  };

  return (
    <>
      <BrowserRouter>
        <NavBar
          onClickNavbar={_handleDrawer}
          status={drawerState}
          onClickOverLay={_handleDrawer}
        />

        <Container maxWidth="lg">
          <Routes />
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
