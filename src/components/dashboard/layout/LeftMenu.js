import React, {useEffect, useState} from 'react';
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
import {useTranslation} from "react-i18next";

const { Sider } = Layout;



const LeftMenu = props => {
    const {t} = useTranslation();
    const size = useWindowSize();

    return (
        <>

            <Sider
                trigger={null}
                collapsible
                collapsed={props.collapsed}
                {...(size.width < 991 ? {breakpoint: 'lg', collapsedWidth:0} : {})}
            >
                <div className="logo" />
                <Menu  theme="dark" mode="inline" defaultSelectedKeys={[props.menuKey]}>
                    <Menu.Item key="1" icon={<HomeOutlined />}>
                        <Link to={global.variable.dashboardPath}>
                            {t('dashboard')}
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<UnorderedListOutlined />}>
                        <Link to={global.variable.dashboardPath + '/categories'}>
                            {t('categories')}
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<FormOutlined />}>
                        <Link to={global.variable.dashboardPath + '/posts'}>
                            {t('posts')}
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="4" icon={<FileImageOutlined />}>
                        <Link to={global.variable.dashboardPath + '/slider'}>
                            {t('slider')}
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="5" icon={<UserOutlined />}>
                        <Link to={global.variable.dashboardPath + '/users'}>
                            {t('users')}
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="6" icon={<CheckSquareOutlined />}>
                        <Link to={global.variable.dashboardPath + '/roles'}>
                            {t('roles')}
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="7" icon={<SettingOutlined />}>
                        <Link to={global.variable.dashboardPath + '/setting'}>
                            {t('setting')}
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        </>
    )
};

function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        // Add event listener
        window.addEventListener("resize", handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount

    return windowSize;
}

export default LeftMenu;