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


const { Header, Content } = Layout;

const DashboardPage = (props) => {

    const appState = useContext(StateContext)
    const appDispatch = useContext(DispatchContext)

    const history = useHistory();

    useEffect(() => {
        document.title = `${props.title} | ${global.final.appName}`
    }, [props.title])


    const [collapsed, setCollapsed] = useState(false)

    const toggle = () => {
        setCollapsed(toogle => !toogle)
    };

    if (!appState.loggedIn) {
        history.push('login');
        return (<></>)
    }

    const logOut = () => {
        appDispatch({ type: "logout" })
    }

    const menu = (
        <Menu>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                    Profile
                </a>
            </Menu.Item>
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                    Setting
                </a>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item>
                <Button type="link" size="small" onClick={logOut()}>
                    Logout
                </Button>
            </Menu.Item>
        </Menu>
    );

    return (
        <>
            <Layout className="dashboard-container">
                <LeftMenu collapsed={collapsed} menuKey={props.menuKey}/>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: toggle,
                        })}

                        <Space className="float-right right-margin-25">
                            <Avatar size={40} icon={<SearchOutlined />} />
                            <Dropdown overlay={menu} placement="bottomRight" trigger={["click"]} arrow>
                                <Avatar size={40} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            </Dropdown>
                        </Space>

                    </Header>
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