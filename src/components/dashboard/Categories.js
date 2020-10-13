import React, {useEffect, useState} from 'react';
import {Table, Tag, Space, PageHeader, Button, Alert, Pagination} from 'antd';
import DashboardPage from "./layout/DashboardPage";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import { useLocation } from "react-router-dom";
import {
    PlusOutlined
} from '@ant-design/icons';
import CategoryService from "../../service/CategoryService";
import LoadingTable from "./layout/LoadingTable";

const Categories = (props) => {
    const {t} = useTranslation();
    const [data, setData] = useState([])
    const [dataIsLoad, setDataIsLoad] = useState('loading')
    const service = new CategoryService()
    const location = useLocation();
    const [successMessage, setSuccessMessage] = useState('')
    const [currentPagination, setCurrentPagination] = useState(1)
    const [totalPagination, setTotalPagination] = useState(1)
    let per = 5

    useEffect(()=>{
        let isMounted = true;
        service.getPaginationCategories(per, 'en').then(response => {
            if (isMounted) {
                console.log(response)
                setData(response.categories.data)
                setTotalPagination(response.categories.total)
                setDataIsLoad('loaded')
            }
        }).catch(function (error) {
            console.log(error);
            setDataIsLoad('error')
        });
        return () => { isMounted = false };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    useEffect(() => {
        if (location.state !== undefined) {
            if (location.state.detail === 'add') {
                setSuccessMessage(t('added_successfully'))
            } else if (location.state.detail === 'update') {
                setSuccessMessage(t('updated_successfully'))
            }
        }
    }, [location]);

    const handleClose = () => {
        setSuccessMessage('')
    };

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
            {key: 1, name: t('dashboard'), link: global.variable.dashboardPath},
            {key: 2, name: t('categories')},
    ]}

    const onChangePagination = (value) => {
        setCurrentPagination(value)
    }

    function loadDataTable () {
        if (dataIsLoad === 'loading') {
            return <LoadingTable/>
        } else if (dataIsLoad === 'loaded'){
            return (
                <>
                    <Table
                        columns={columns}
                        pagination={{
                            total: data.length,
                            pageSize: data.length,
                            hideOnSinglePage: true
                        }}
                        dataSource={data}
                    />

                    <Pagination style={{float:"right"}} current={currentPagination} total={totalPagination} pageSize={per} onChange={onChangePagination} />
                </>
            )
        } else {
            return <Alert message={t('have_some_issues')} type="error" showIcon  />
        }
    }


    return (
        <DashboardPage title={props.title} menuKey={props.menuKey}  breadcrumbItems={breadcrumbItems}>
            <PageHeader
                title={t('categories')}
                extra={[
                    <Link key='categoryAdd' to={global.variable.dashboardPath+'/category/add'}>
                        <Button type="primary" size="large" shape="circle" icon={<PlusOutlined />} />
                    </Link>
                ]}
            />

            {successMessage !== '' ? (
                <Alert message={successMessage} type="success" closable afterClose={handleClose} />
            ) : null}

            {loadDataTable ()}

        </DashboardPage>
    )
};

export default Categories;