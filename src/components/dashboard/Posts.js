import React from 'react';
import DashboardPage from "./layout/DashboardPage";

const Posts = props => {
    return (
        <DashboardPage title={props.title} menuKey={props.menuKey}>
            Posts
        </DashboardPage>
    )
};

export default Posts;