import React from 'react';
import {Table, Tag, Space, PageHeader, Button} from 'antd';
import DashboardPage from "./layout/DashboardPage";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {
    PlusOutlined
} from '@ant-design/icons';
import CategoryService from "../../service/CategoryService";

const Categories = (props) => {
    const {t} = useTranslation();

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            render: text => text,
        },
        {
            title: 'Slug',
            dataIndex: 'slug',
            key: 'slug',
        },
        {
            title: 'Tags',
            key: 'is_publish',
            dataIndex: 'is_publish',
            render: is_publish => (
                <Tag color={is_publish === 1 ? 'green' : 'volcano'} key={is_publish}>
                    {is_publish}
                </Tag>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Link to={"#"}>Edit</Link>
                    <Link to={"#"}>Delete</Link>
                </Space>
            ),
        },
    ];

    const data = [
        {
            key: '1',
            name: 'John Brown',
            slug: 'John_brown',
            address: 'New York No. 1 Lake Park',
            is_publish: 0,
        },
        {
            key: '2',
            name: 'Jim Green',
            slug: 'Jim_Green',
            address: 'London No. 1 Lake Park',
            is_publish: 1,
        },
        {
            key: '3',
            name: 'Joe Black',
            slug: 'joe_black',
            address: 'Sidney No. 1 Lake Park',
            is_publish: 1,
        },
    ];

    const service = new CategoryService()

    service.getAllCategories('az').then(data => {
        console.log(data)
    })

    const breadcrumbItems = {items: [
            {key: 1, name: t('dashboard'), link: global.final.dashboardPath},
            {key: 2, name: t('categories')},
        ]}

    return (
        <DashboardPage title={props.title} menuKey={props.menuKey}  breadcrumbItems={breadcrumbItems}>
            <PageHeader
                title={t('categories')}
                extra={[
                    <Link key='categoryAdd' to={global.final.dashboardPath+'/category/add'}>
                        <Button type="primary" size="large" shape="circle" icon={<PlusOutlined />} >

                        </Button>
                    </Link>

                ]}
            />
            <Table
                columns={columns}
                pagination={{ position: [ 'bottomRight'] }}
                dataSource={data}
            />
        </DashboardPage>
    )
};

export default Categories;