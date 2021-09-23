import React, { Component } from 'react';
import {BrowserRouter, Switch, Route, Link} from 'react-router-dom';
import Home from './Home';
import Dashboard from './Dashboard';
import Login from './auth/Login';
import Register from './auth/Registration';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navigation from './Navigation';

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

  handleSuccess(data) {
    // Todo: Handle success
    this.props.handleLogin(data);
    this.props.history.push('/');
}

handleLogoutButton() {
    axios.delete("http://localhost:3001/logout", {withCredentials: true})
    .then(response => {
        this.props.handleLogout();
    })
    .catch(error => {
        console.log("Logout error ", error);
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
         <Navigation isLoggedIn={this.state.isLoggedIn} handleLogout={this.handleLogout}/>
        <BrowserRouter>
          <Switch>
            <Route exact path={'/'} render={
              (props) => (
                <Home {...props} handleLogout={this.handleLogout} isLoggedIn={this.state.isLoggedIn} handleLogin={this.handleLogin} />
              )
            }/>
            <Route exact path={'/dashboard'}render={
              (props) => (
                <Dashboard {...props} handleLogout={this.handleLogout} isLoggedIn={this.state.isLoggedIn} />
              )
            }/>
            <Route exact path={'/login'}render={
              (props) => (
                <Login {...props} isLoggedIn={this.state.isLoggedIn} handleLogin={this.handleLogin}/>
              )
            }/>
            <Route exact path={'/register'}render={
              (props) => (
                <Register {...props} isLoggedIn={this.state.isLoggedIn} handleLogin={this.handleLogin}/>
              )
            }/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
