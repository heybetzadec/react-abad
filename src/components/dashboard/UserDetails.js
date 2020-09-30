import React from 'react';
import DashboardPage from "./layout/DashboardPage";

const UserDetails = props => {
    return (
        <DashboardPage title={props.title} menuKey={props.menuKey}>
            UserDetails
        </DashboardPage>
    )
};

export default UserDetails;