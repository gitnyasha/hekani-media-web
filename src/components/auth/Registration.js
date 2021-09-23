import axios from 'axios';
import React, { Component } from 'react'

export default class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            passwordConfirm: '',
            error: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSuccess = this.handleSuccess.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSuccess(data) {
        // Todo: Handle success
        this.props.handleLogin(data);
        this.props.history.push('/');
    }

    handleSubmit(e) {
        axios.post(
            "http://localhost:3001/registrations", 
            {
                user: {
                    email: this.state.email,
                    password: this.state.password,
                    passwordConfirm: this.state.passwordConfirm
                }
            },
            { withCredentials: true },
            {headers: { 'Access-Control-Allow-Origin': 'http://localhost:3000' },}
        ).then(response => {
            if (response.data.status === "created") {
                this.handleSuccess(response.data);
            }
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
        e.preventDefault();
    }
    render() {
        return (
            <div className="container banner">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group my-2">
                    <label>Email</label>
                    <input 
                    type="email"
                    name="email"
                    className="form-control" 
                    placeholder="Email" 
                    value={this.state.email} 
                    onChange={this.handleChange}
                    />
                    {this.state.error && <div className="alert alert-danger">{this.state.error}</div>}
                    </div>
                    <div className="form-group my-2">
                    <label>Password</label>
                    <input 
                    type="password"
                    name="password"
                    className="form-control" 
                    placeholder="Password" 
                    value={this.state.password} 
                    onChange={this.handleChange}
                    />
                    </div>
                    <div className="form-group my-2">
                    <label>Password Confirm</label>
                    <input 
                    type="password"
                    name="passwordConfirm"
                    className="form-control" 
                    placeholder="Password Confirm" 
                    value={this.state.passwordConfirm} 
                    onChange={this.handleChange}
                    />
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
            </div>
        )
    }
}
