import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Results from "./components/Results";
import Home from "./components/Home";
import "./App.css";

class App extends Component {
    render() {
        return (
            
            <Router>
                <Switch>
                    <Route exact path="/search" component={Results} />
                    <Route path="/" component={Home} />
                </Switch>
            </Router>
        );
    }
}

export default App;
