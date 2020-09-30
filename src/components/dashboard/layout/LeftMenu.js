import React from 'react';
import {Link} from 'react-router-dom';
import {Layout, Menu} from "antd";
import {
    CheckSquareOutlined,
    FileImageOutlined,
    FormOutlined,
    HomeOutlined, SettingOutlined,
    UnorderedListOutlined,
    UserOutlined
} from "@ant-design/icons";

const { Sider } = Layout;



const LeftMenu = props => {


    return (
        <>
            <Sider trigger={null} collapsible collapsed={props.collapsed}>
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={[props.menuKey]}>
                    <Menu.Item key="1" icon={<HomeOutlined />}>
                        <Link to={global.final.dashboardPath}>
                            Dashboard
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<UnorderedListOutlined />}>
                        <Link to={global.final.dashboardPath + '/categories'}>
                            Categories
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<FormOutlined />}>
                        <Link to={global.final.dashboardPath + '/posts'}>
                            Posts
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="4" icon={<FileImageOutlined />}>
                        <Link to={global.final.dashboardPath + '/slider'}>
                            Slider
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="5" icon={<UserOutlined />}>

                        <Link to={global.final.dashboardPath + '/users'}>
                            Users
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="6" icon={<CheckSquareOutlined />}>

                        <Link to={global.final.dashboardPath + '/roles'}>
                            Roles
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="7" icon={<SettingOutlined />}>

                        <Link to={global.final.dashboardPath + '/setting'}>
                            Setting
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        </>
    )
};

export default LeftMenu;