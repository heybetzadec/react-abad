import React, {useContext, useEffect, useState} from 'react';
import {Table, Tag, Space, PageHeader, Button, Alert, Pagination, Popconfirm} from 'antd';
import DashboardPage from "./layout/DashboardPage";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import { useLocation } from "react-router-dom";
import {
    PlusOutlined
} from '@ant-design/icons';
import CategoryService from "../../service/CategoryService";
import LoadingTable from "./layout/LoadingTable";
import StateContext from "../../util/context/StateContext";

const Categories = (props) => {
    const {t} = useTranslation();
    const [dataSource, setDataSource] = useState([])
    const [dataIsLoad, setDataIsLoad] = useState('loading')
    const service = new CategoryService()
    const location = useLocation();
    const [warningMessage, setWarningMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [currentPagination, setCurrentPagination] = useState(1)
    const [totalPagination, setTotalPagination] = useState(1)
    const appState = useContext(StateContext)
    let per = 8


    useEffect(()=>{
        let isMounted = true;
        service.getPaginationCategories(per, 'en', currentPagination).then(response => {
            if (isMounted) {
                setDataSource(response.categories.data)
                setTotalPagination(response.categories.total)
                setDataIsLoad('loaded')
            }
        }).catch(function (error) {
            console.log(error);
            setDataIsLoad('error')
        });
        return () => { isMounted = false };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currentPagination])

    useEffect(() => {
        if (location.state !== undefined) {
            if (location.state.detail === 'add') {
                setSuccessMessage(t('added_successfully'))
            } else if (location.state.detail === 'update') {
                setSuccessMessage(t('updated_successfully'))
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);


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
            dataIndex: 'key_name',
            key: 'key_name',
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
                    <Link to={global.variable.dashboardPath+'/category/edit/key/'+record.key}>Edit</Link>
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                        <Link to="#">Delete</Link>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    const handleDelete = key => {
        service.removeCategory(appState.user.token, key).then(response => {
            if (response.data.status ==='ok'){
                setDataSource(dataSource.filter(item => item.key !== key))
                setSuccessMessage(t('deleted_successfully'))
            } else if (response.data.status === 'unsuccessful'){
                setWarningMessage(t('its_failed'))
            } else {
                setWarningMessage(t('have_some_issues'))
                console.log(response.data)
            }
        })
    };

    const handleCloseWarning = () => {
        setWarningMessage('')
    };

    const handleCloseSuccess = () => {
        setSuccessMessage('')
    };

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
                        size="middle"
                        columns={columns}
                        pagination={{
                            total: dataSource.length,
                            pageSize: dataSource.length,
                            hideOnSinglePage: true
                        }}
                        dataSource={dataSource}
                    />

                    <Pagination style={{float:"right", marginTop:20}} current={currentPagination} total={totalPagination} pageSize={per} onChange={onChangePagination} />
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


            {warningMessage !== '' ? (
                <Alert message={warningMessage} type="warning" closable afterClose={handleCloseWarning} />
            ) : null}

            {successMessage !== '' ? (
                <Alert message={successMessage} type="success" closable afterClose={handleCloseSuccess} />
            ) : null}

            {loadDataTable ()}

        </DashboardPage>
    )
};

export default Categories;