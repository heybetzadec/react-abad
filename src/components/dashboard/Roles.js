import React from 'react';
import DashboardPage from "./layout/DashboardPage";

const Roles = props => {
    return (
        <DashboardPage title={props.title} menuKey={props.menuKey}>
            Roles
        </DashboardPage>
    )
};

export default Roles;