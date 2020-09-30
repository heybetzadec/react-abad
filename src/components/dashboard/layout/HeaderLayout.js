import React from 'react';
import {MenuFoldOutlined, MenuUnfoldOutlined, SearchOutlined} from "@ant-design/icons";
import {Avatar, Dropdown, Layout, Menu, Space} from "antd";

const { Header } = Layout;

const HeaderLayout = props => {
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
                <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
                    Logout
                </a>
            </Menu.Item>
        </Menu>
    );

    return (
        <>
            <Header className="site-layout-background" style={{ padding: 0 }}>
                {React.createElement(props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: props.toggle,
                })}

                <Space className="float-right right-margin-25">
                    <Avatar size={40} icon={<SearchOutlined />} />
                    <Dropdown overlay={menu} placement="bottomRight" trigger={["click"]} arrow>
                        <Avatar size={40} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    </Dropdown>
                </Space>

            </Header>
        </>
    )
};

export default HeaderLayout;