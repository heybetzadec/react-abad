import React, {useContext, useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import '../../../util/config/variable'
import '../../../App.css'
import {Avatar, Button, Dropdown, Layout, Menu, Space} from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    SearchOutlined
} from '@ant-design/icons';
import LeftMenu from "./LeftMenu";
import PageBreadcrumb from "./PageBreadcrumb";
import StateContext from "../../../util/context/StateContext";
import DispatchContext from "../../../util/context/DispatchContext";
import LoadingPage from "../../visitor/layout/LoadingPage";
import DashboardLoading from "./DashboardLoading";
import HeaderLayout from "./HeaderLayout";


const { Header, Content } = Layout;

const DashboardPage = (props) => {

    const appState = useContext(StateContext)
    const appDispatch = useContext(DispatchContext)
    const history = useHistory();

    let defaultCollapsed = localStorage.getItem("dashboardMenuIsOpen");

    if (defaultCollapsed === null) {
        defaultCollapsed = 'false'
        localStorage.setItem("dashboardMenuIsOpen", defaultCollapsed)
    }

    useEffect(() => {
        document.title = `${props.title} | ${global.final.appName}`
    }, [props.title])


    const [collapsed, setCollapsed] = useState(defaultCollapsed==='true')

    const toggle = () => {
        setCollapsed(toogle => !toogle)
        localStorage.setItem("dashboardMenuIsOpen", (!collapsed).toString())
    };


    if (!appState.loggedIn) {
        history.replace(`${global.final.dashboardPath}/login`);
        return (<LoadingPage />)
    }


    return (
        <>
            <Layout className="dashboard-container">
                <LeftMenu collapsed={collapsed} menuKey={props.menuKey}/>
                <Layout className="site-layout">

                    <HeaderLayout collapsed={collapsed} toggle={toggle} appDispatch={appDispatch}/>

                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >

                        <PageBreadcrumb breadcrumbItems={props.breadcrumbItems}/>

                        {props.children}


                    </Content>
                </Layout>
            </Layout>
        </>
    )
};

export default DashboardPage;