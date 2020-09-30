import React from 'react';
import DashboardPage from "./layout/DashboardPage";

const PostDetail = props => {
    return (
        <DashboardPage title={props.title} menuKey={props.menuKey}>
            PostDetail
        </DashboardPage>
    )
};

export default PostDetail;