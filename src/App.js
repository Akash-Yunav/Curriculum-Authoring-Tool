import React from "react";
import "./App.scss";
import MainView from "./MainView";
import WrapContext from "./appContext";
import NavbarLoadSave from "./NavbarLoadSave";


function App() {
  return (
    <WrapContext>
      <NavbarLoadSave />
      <MainView />
    </WrapContext>
  );
}

export default App;
