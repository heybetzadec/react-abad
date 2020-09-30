import React, {useContext, useEffect, useState} from 'react';
import StateContext from "../../util/context/StateContext";
import DispatchContext from "../../util/context/DispatchContext";
import {Alert, Button, Checkbox, Form, Input} from "antd";
import {useTranslation} from "react-i18next";
import LoginService from "../../service/LoginService";
import '../../service/LoginService'
import {useHistory} from "react-router-dom";

const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
};
const tailLayout = {
    wrapperCol: { offset: 7, span: 13 },
};

const Login = props => {
    const appState = useContext(StateContext)
    const appDispatch = useContext(DispatchContext)
    const [warning, setWarning] = useState(<></>)
    const {t} = useTranslation();
    const history = useHistory();


    useEffect(() => {
        document.title = `${t('login')} | ${global.final.appName}`
    }, [props.title, t])



    const onFinish = values => {
        const service  = new LoginService()
        service.getLoginAuthentication(values).then(data => {
            if (data.status === 'ok'){
                appDispatch({ type: "login", data: data })
            } else {
                setWarning(getWarning(t('not_match')))
            }
        }).catch(e => {
            setWarning(getWarning(t('server_not_working')))
        });
    };


    const getWarning = (warning)=>{
        return (
            <Alert
                style={{marginBottom:20}}
                message={warning}
                type="warning"
                closable
                onClose={onClose}
            />
        )
    }

    const onClose = (e) => {
        setWarning(<></>)
    };

    return (
        <div className="container-login100">
            <div className="wrap-login100">
                <h1 style={{textAlign:"center", paddingBottom:10}}>Login</h1>
                {warning}
                <Form
                    {...layout}
                    className="login-form"
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >

                    <Form.Item
                        label={t('mail')}
                        name="email"
                        rules={[{ required: true, message: t('input_email') }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label={t('password')}
                        name="password"
                        rules={[{ required: true, message: t('input_password') }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
};

export default Login;