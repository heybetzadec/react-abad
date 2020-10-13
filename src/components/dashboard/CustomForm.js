import React from 'react';
import {Button, Form, Input, Select, Space} from "antd";
import {ThunderboltOutlined} from "@ant-design/icons";
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 10 },
};

const CustomForm = (props) => {

    const [form] = Form.useForm();

    const onFinish = (value) => {
        console.log(value)
    }

    return (
        <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
            {props.children}
        </Form>
    )
};

export default CustomForm;