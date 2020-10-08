import React from 'react';
import '../../util/use/variable'
import '../../App.css'

import DashboardPage from "./layout/DashboardPage";




const Dashboard = (props) => {

    return (
        <DashboardPage title={props.title} menuKey={props.menuKey}>
            Dashboard
        </DashboardPage>
    )
};

export default Dashboard;