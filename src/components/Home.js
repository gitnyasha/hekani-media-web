import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Login from './auth/Login';
import Registration from './auth/Registration';
import axios from 'axios';

export default class Home extends Component {
    constructor (props) {
        super(props);
        this.handleSuccess = this.handleSuccess.bind(this);
        this.handleLogoutButton = this.handleLogoutButton.bind(this);
    }

    handleSuccess(data) {
        // Todo: Handle success
        this.props.handleLogin(data);
        this.props.history.push('/dashboard');
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

    render() {
        return (
            <div>
                <Link to="/dashboard"><h1>Dashboard</h1></Link>
                <h1>Home status: {this.props.isLoggedIn}</h1>
                {this.props.isLoggedIn 
                ? <button onClick={() => this.handleLogoutButton()}>Logout</button> 
                : <div><Registration handleSuccess={this.handleSuccess}/><Login handleSuccess={this.handleSuccess}/></div>}
            </div>
        );
    }
}