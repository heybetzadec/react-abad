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

const { Sider } = Layout;



const LeftMenu = props => {
    // const [inputProps, setInputProps] = useEffect({
    //     breakpoint: 'lg',
    //     collapsedWidth: 0
    // })
    const size = useWindowSize();


    // useEffect(()=>{
    //     if (size.width < 991)
    //         setInputProps({})
    // }, [size])



    return (
        <>

            <Sider
                trigger={null}
                collapsible
                collapsed={props.collapsed}
                {...(size.width < 991 ? {breakpoint: 'lg', collapsedWidth:0} : {})}
            >
            {/*<Sider*/}
            {/*    breakpoint="lg"*/}
            {/*    collapsedWidth="0"*/}
            {/*    {...inputProps}*/}
            {/*>*/}
                <div className="logo" />
                <Menu  theme="dark" mode="inline" defaultSelectedKeys={[props.menuKey]}>
                    <Menu.Item key="1" icon={<HomeOutlined />}>
                        <Link to={global.variable.dashboardPath}>
                            Dashboard
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<UnorderedListOutlined />}>
                        <Link to={global.variable.dashboardPath + '/categories'}>
                            Categories
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<FormOutlined />}>
                        <Link to={global.variable.dashboardPath + '/posts'}>
                            Posts
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="4" icon={<FileImageOutlined />}>
                        <Link to={global.variable.dashboardPath + '/slider'}>
                            Slider
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="5" icon={<UserOutlined />}>

                        <Link to={global.variable.dashboardPath + '/users'}>
                            Users
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="6" icon={<CheckSquareOutlined />}>

                        <Link to={global.variable.dashboardPath + '/roles'}>
                            Roles
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="7" icon={<SettingOutlined />}>

                        <Link to={global.variable.dashboardPath + '/setting'}>
                            Setting
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        </>
    )
};

function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
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