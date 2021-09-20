import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Home from './Home';
import Dashboard from './Dashboard';
import axios from 'axios';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: "No",
      user: {}
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  checkLogin() {
    axios.get('http://localhost:3001/logged_in', {withCredentials: true}).then(res => {
      console.log("Is he? ",res);
      if (res.data.logged_in && this.state.isLoggedIn === "No") {
        this.setState({
          isLoggedIn: "Yes",
          user: res.data.user
        });
      } else if (!res.data.logged_in && this.state.isLoggedIn === "Yes") {
        this.setState({
          isLoggedIn: "No",
          user: {}
        });
      }
    }).catch(err => {
      console.log("No", err);
    });
  }
   
  componentDidMount() {
    this.checkLogin();
  }

  handleLogin(data) {
    this.setState({
      isLoggedIn: "Yes",
      user: data.user
    });
  }

  handleLogout() {
    this.setState({
      isLoggedIn: "No",
      user: {}
    });
  }

  render() {
    return (
      <div className='app'>
        <BrowserRouter>
          <Switch>
            <Route exact path={'/'} render={
              (props) => (
                <Home {...props} handleLogout={this.handleLogout} isLoggedIn={this.state.isLoggedIn} handleLogin={this.handleLogin} />
              )
            }/>
            <Route exact path={'/dashboard'}render={
              (props) => (
                <Dashboard {...props} isLoggedIn={this.state.isLoggedIn} />
              )
            }/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
