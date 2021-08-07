import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar/index";
import Home from "./pages/home/index";
import About from "./pages/about";
import Contact from "./pages/contact/index";
import Portfolio from "./pages/portfolio/index";
import { Helmet } from "react-helmet";
import "./App.css";

function App() {
  return (
    <Router>
      <Helmet>
        <title>Devbox</title>
      </Helmet>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact={true}>
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/portfolio">
            <Portfolio />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          <Route path="*">{/* PAGINA 404 */}</Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
