import React from 'react';
import DashboardPage from "./layout/DashboardPage";

const Setting = props => {
    return (
        <DashboardPage title={props.title} menuKey={props.menuKey}>
            Setting
        </DashboardPage>
    )
};

export default Setting;