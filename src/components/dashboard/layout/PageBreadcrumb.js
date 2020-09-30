import React from 'react';
import {Breadcrumb} from "antd";

const PageBreadcrumb = props => {
    if (props.breadcrumbItems !== undefined) {
        return (
            <Breadcrumb separator=">">
                {props.breadcrumbItems.items.map(breadcrumb => {
                    return <Breadcrumb.Item key={breadcrumb.key} {...((breadcrumb.link !== undefined) ? {href: breadcrumb.link} : {})} >{breadcrumb.name}</Breadcrumb.Item>
                })}
            </Breadcrumb>
        )
    }

    return <></>
};

export default PageBreadcrumb;