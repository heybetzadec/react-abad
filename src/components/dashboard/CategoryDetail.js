import React, {useEffect, useState} from 'react';
import DashboardPage from "./layout/DashboardPage";
import {Button, Card, Input, Form, Select, Space} from "antd";
import {useTranslation} from "react-i18next";
import CategoryService from "../../service/CategoryService";
import '../../util/use/Functions'
import {Functions} from "../../util/use/Functions";
import {
    ThunderboltOutlined
} from '@ant-design/icons';

const { Option } = Select;

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 10 },
};
const tailLayout = {
    wrapperCol: { offset: 4, span: 10 },
};


const CategoryDetail = props => {
    const {t} = useTranslation();
    const [form] = Form.useForm();
    const service = new CategoryService()
    const [categoryOptions, setCategoryOptions] = useState([])
    const [slugName, setSlugName] = useState("")

    useEffect(()=>{
        let isMounted = true;
        service.getAllTopCategories('en').then(response => {
            if (isMounted) setCategoryOptions(response.categories)
        }).catch(function (error) {
            console.log(error);
        });
        return () => { isMounted = false };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const onGenderChange = value => {
        // eslint-disable-next-line default-case
        switch (value) {
            case "male":
                form.setFieldsValue({ note: "Hi, man!" });
                return;
            case "female":
                form.setFieldsValue({ note: "Hi, lady!" });
                return;
        }
    };

    const onFinish = values => {
        console.log(values);
    };
    const onReset = () => {
        form.resetFields();
    };
    const breadcrumbItems = {items: [
            {key: 1, name: t('dashboard'), link: global.variable.dashboardPath},
            {key: 1, name: t('categories'), link: global.variable.dashboardPath+'/categories'},
            {key: 2, name: props.title},
    ]}
    const addSlug = () => {
        setSlugName(Functions.slug(document.getElementById("control-hooks_name").value))
    }

    return (
        <DashboardPage title={props.title} menuKey={props.menuKey} breadcrumbItems={breadcrumbItems}>

            <Card className="dashboard-card" title={props.title}>
                <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                    <Form.Item name="name" label={t('name')} rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="slug" label={t('slug')} valuePropName="slug" rules={[{ required: true }]}>
                        <Input
                            value={slugName}
                            onChange={e => setSlugName(e.target.value)}
                            addonAfter={<Button
                            style={{height:30}}
                            type="link"
                            icon={<ThunderboltOutlined />}
                            onClick={addSlug}
                        />}/>
                    </Form.Item>
                    <Form.Item name="category" label={t('category')} rules={[{ required: true }]}>
                        <Select
                            placeholder={t('select_top_category')}
                            onChange={onGenderChange}
                            allowClear
                        >
                            {
                                categoryOptions.map((item) => {
                                    return <Option key={item.slug} value={item.slug}>{item.name}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>

                    <Form.Item {...tailLayout} className="form_button_group">
                        <Space>
                            <Button htmlType="button" onClick={onReset}>
                                Reset
                            </Button>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>



        </DashboardPage>
    )
};

export default CategoryDetail;