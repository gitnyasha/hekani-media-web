import React from 'react';
import {Link} from 'react-router-dom';

const Dashboard = props => {
    return (
        <div>
            <Link to="/"><h1>Home</h1></Link>
            <h1>Dashboard status: {props.isLoggedIn}</h1>
        </div>
    );
}

export default Dashboard;