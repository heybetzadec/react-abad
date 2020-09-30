import React from 'react';
import DashboardPage from "./layout/DashboardPage";

const RoleDetail = props => {
    return (
        <DashboardPage title={props.title} menuKey={props.menuKey}>
            Role Detail
        </DashboardPage>
    )
};

export default RoleDetail;