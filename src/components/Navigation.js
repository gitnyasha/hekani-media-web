import React, { Component } from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import axios from 'axios';

export default class Navigation extends Component {
    constructor (props) {
        super(props);
        this.handleLogoutButton = this.handleLogoutButton.bind(this);
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
               <Navbar bg="light" expand="lg">
                    <LinkContainer to="/">
                    <Navbar.Brand>React-Bootstrap</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {this.props.isLoggedIn === "Yes" ? (
                        <Nav className="mr-auto">
                            <LinkContainer to="/dashboard">
                                <Nav.Link>Dashoboard</Nav.Link>
                            </LinkContainer>
                            <Button onClick={() => this.handleLogoutButton()}>Logout</Button>
                        </Nav>
                            ) : ( 
                        <Nav className="mr-auto">
                            <LinkContainer to="/dashboard">
                                <Nav.Link>Dashoboard</Nav.Link>
                            </LinkContainer>                            
                            <LinkContainer to="/login">
                            <Nav.Link>Login</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to="/register">
                            <Nav.Link>Register</Nav.Link>
                            </LinkContainer>
                        </Nav>)}
                   </Navbar.Collapse>
                </Navbar>
           </div>
        )
    }
}
