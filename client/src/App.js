import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Results from "./components/Results";
import Artist from "./components/Artist";
import "./App.css";

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Results} />
                    {/* <Route path="/artist/:id" component={Artist} /> */}
                </Switch>
            </Router>
        );
    }
}

export default App;
