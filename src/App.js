import React, {Component} from 'react';
import './App.css';
import {Route, Link, Switch, withRouter} from "react-router-dom";
import Registration from "./components/Registration";
import Login from './components/Login';
import Verify from "./components/Verify";
import Password from "./components/Password";
import ResetPassword from "./components/ResetPassword";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./components/Dashboard";
import PublicRoute from "./components/PublicRoute";
import {resetLocal} from "./utils";

class App extends Component {


  render() {
    return (
        <div className="App">
          <nav className="navbar">
            <h2 className="log-app">Log-app</h2>
            <ul>
              <li>
                <Link to="/login">login</Link>
              </li>
              <li>
                <Link to="/registration">registration</Link>
              </li>
              <li>
                <Link to="/password">password</Link>
              </li>
              <li>
                <input type="button" value="RESET" onClick={resetLocal} />
              </li>
            </ul>
          </nav>

          <Switch>
            <Route exact path="/">
              <div>Hello</div>
            </Route>
            <Route path="/verify">
              <Verify/>
            </Route>
            <Route path="/password">
              <Password/>
            </Route>
            <Route path="/reset-password">
              <ResetPassword/>
            </Route>
            <PublicRoute restricted={true} component={Login} path="/login" exact/>
            <PublicRoute restricted={true} component={Registration} path="/registration" exact/>
            <PrivateRoute path='/dashboard' component={Dashboard} exact />
          </Switch>

        </div>
    );
  }

}


export default App;
