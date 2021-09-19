import React from 'react';
import {Link} from 'react-router-dom';

const Dashboard = () => {
    return (
        <div>
            <Link to="/"><h1>Home</h1></Link>
            <h1>Dashboard</h1>
        </div>
    );
}

export default Dashboard;