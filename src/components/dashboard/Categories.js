import React, {useContext, useEffect, useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import {useTranslation} from "react-i18next";
import { useLocation } from "react-router-dom";
import {Table, Tag, Space, PageHeader, Button, Alert, Pagination, Popconfirm} from 'antd';
import DashboardPage from "./layout/DashboardPage";
import CategoryService from "../../service/CategoryService";
import LoadingTable from "./layout/LoadingTable";
import StateContext from "../../util/context/StateContext";
import {PlusOutlined} from '@ant-design/icons';

const Categories = (props) => {
    let per = 10
    const {t} = useTranslation();
    const [dataSource, setDataSource] = useState([])
    const [dataIsLoad, setDataIsLoad] = useState('loading')
    const service = new CategoryService()
    const location = useLocation();
    const history = useHistory()
    const [warningMessage, setWarningMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [currentPagination, setCurrentPagination] = useState(1)
    const [totalPagination, setTotalPagination] = useState(1)
    const appState = useContext(StateContext)

    const breadcrumbItems = {items: [
            {key: 1, name: t('dashboard'), link: global.variable.dashboardPath},
            {key: 2, name: t('categories')},
    ]}

    const columns = [
        {
            title: t('name'),
            dataIndex: 'name',
            key: 'name',
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            render: text => text,
        },
        {
            title: t('slug'),
            dataIndex: 'key_name',
            key: 'key_name',
        },
        {
            title: t('top_category'),
            dataIndex: 'top_category_name',
            key: 'top_category_name',
        },
        {
            title: t('publish'),
            key: 'is_publish',
            dataIndex: 'is_publish',
            render: is_publish => (
                <Tag color={is_publish === 1 ? 'green' : 'volcano'} key={is_publish}>
                    {is_publish === 1 ? t('publish') : t('pending')}
                </Tag>
            ),
        },
        {
            title:  t('action'),
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Link
                        to={{
                            pathname: global.variable.dashboardPath+'/category/edit/key/'+record.key,
                            state: {pagination: currentPagination}
                        }}
                    >Edit</Link>
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
                        <Link to="#">Delete</Link>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

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
        if (location.state !== undefined)
            setCurrentPagination(location.state.pagination)
        if (location.state !== undefined) {
            if (location.state.detail === 'add') {
                setSuccessMessage(t('added_successfully'))
            } else if (location.state.detail === 'update') {
                setSuccessMessage(t('updated_successfully'))
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);


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
        history.replace({ ...history.location, state:{} });
        setWarningMessage('')
    };
    
    const handleCloseSuccess = () => {
        history.replace({ ...history.location, state:{} });
        setSuccessMessage('')
    };

    const handleChangePagination = (value) => {
        setCurrentPagination(value)
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

            {dataIsLoad === 'loading' ?
                    <LoadingTable/> :
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
                        <Pagination style={{float:"right", marginTop:20}} current={currentPagination} total={totalPagination} pageSize={per} onChange={handleChangePagination} />
                    </>
            }
        </DashboardPage>
    )
};

export default Categories;