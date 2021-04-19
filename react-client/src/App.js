import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
//
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
//
import Header from "./components/Header";
import Prediction from "./components/Prediction";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
      <div className="body">
        <div className="allPage">
          <Header/>
          <Prediction/>
          <Footer/>
        </div>
      </div>
  );
}
export default App;
