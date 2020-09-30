import React from 'react';
import DashboardPage from "./layout/DashboardPage";

const Users = props => {
    return (
        <DashboardPage title={props.title} menuKey={props.menuKey}>
            Users
        </DashboardPage>
    )
};

export default Users;