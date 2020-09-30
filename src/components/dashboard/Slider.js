import React from 'react';
import DashboardPage from "./layout/DashboardPage";

const Slider = props => {
    return (
        <DashboardPage title={props.title} menuKey={props.menuKey}>
            Slider
        </DashboardPage>
    )
};

export default Slider;