import React from 'react';

const Dashboard = props => {
    return (
        <div className="container-fluid">
            <h1>Dashboard status: {props.isLoggedIn}</h1>
        </div>
    );
}

export default Dashboard;