import React, {useEffect, useState} from 'react';
import {Table, Tag, Space, PageHeader, Button} from 'antd';
import DashboardPage from "./layout/DashboardPage";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {
    PlusOutlined
} from '@ant-design/icons';
import CategoryService from "../../service/CategoryService";
import LoadingTable from "./layout/LoadingTable";

const Categories = (props) => {
    const {t} = useTranslation();
    const [data, setData] = useState([])
    const service = new CategoryService()

    useEffect(()=>{
        let isMounted = true;
        if (isMounted) {
            service.getAllCategories(5, 'az').then(response => {
                setData(response.categories.data)
            })
        }
        return () => { isMounted = false };
    },[])

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
            dataIndex: 'slug_name',
            key: 'slug_name',
        },
        {
            title: 'Top category',
            dataIndex: 'top_category_name',
            key: 'top_category_name',
        },
        {
            title: 'Publish',
            key: 'is_publish',
            dataIndex: 'is_publish',
            render: is_publish => (
                <Tag color={is_publish === 1 ? 'green' : 'volcano'} key={is_publish}>
                    {is_publish === 1 ? t('publish') : t('pending')}
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
            {data.length === 0 ? <LoadingTable/> :
                <Table
                columns={columns}
                pagination={{ position: [ 'bottomRight'] }}
                dataSource={data}
                />
            }

        </DashboardPage>
    )
};

export default Categories;