import "./App.css";
import React from "react";
import Header from "./Component/Header/header";
import Main from "./Component/Main/main";
import Footer from "./Component/Footer/footer";

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
}
