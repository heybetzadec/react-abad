import React, {useContext, useEffect, useState} from 'react';
import DashboardPage from "./layout/DashboardPage";
import {Button, Card, Input, Form, Select, Space, Divider, Switch} from "antd";
import {useTranslation} from "react-i18next";
import CategoryService from "../../service/CategoryService";
import '../../util/use/Functions'

import StateContext from "../../util/context/StateContext";
import {Functions} from "../../util/use/Functions";
import {useHistory} from "react-router-dom";

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
    const appState = useContext(StateContext)
    const history = useHistory();
    let publish = true;

    useEffect(()=>{
        let isMounted = true;
        service.getAllTopCategories().then(response => {
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
    const onFinish = data => {
        data.az.slug_name = Functions.slug(data.az.name)
        data.en.slug_name = Functions.slug(data.en.name)
        data.publish = publish
        service.saveCategory(appState.user.token, data).then(response => {
            if (response.data.status ==='ok'){
                history.push({
                    pathname:`${global.variable.dashboardPath}/categories`,
                    state: { detail: 'add'}
                });
            } else {
                console.log(response.data)
            }
        })
    };
    const onReset = () => {
        form.resetFields();
    };
    const onChange = (checked) => {
        publish = checked
    }
    const breadcrumbItems = {items: [
            {key: 1, name: t('dashboard'), link: global.variable.dashboardPath},
            {key: 1, name: t('categories'), link: global.variable.dashboardPath+'/categories'},
            {key: 2, name: props.title},
        ]}

    return (
        <DashboardPage title={props.title} menuKey={props.menuKey} breadcrumbItems={breadcrumbItems}>

            <Card className="dashboard-card" title={props.title}>

                <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>

                    <Form.Item name="topCategorySlug" label={t('top_category')}>
                        <Select
                            onChange={onGenderChange}
                            allowClear
                        >
                            {
                                categoryOptions.map((item) => {
                                    return <Option key={item.slug} value={item.slug}>{item.translation.find(el => el.language_id === appState.language.id).name}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>

                    <Form.Item label={t('publish')} style={{marginTop:5}}>
                        <Switch defaultChecked onChange={onChange} />
                    </Form.Item>

                    <Divider orientation="left" plain>
                        Azərbaycan
                    </Divider>
                    <Form.Item name={['az', 'name']} label={t('name')} rules={[{ required: true, message: t('please_input_name') }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name={['az', 'keyword']} label={t('keywords')} help={t('separate_keywords_with_comma')}>
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item  name={['az', 'description']} label={t('description')} style={{marginTop:5}}>
                        <Input.TextArea />
                    </Form.Item>

                    <Divider orientation="left" plain>
                        English
                    </Divider>

                    <Form.Item name={['en', 'name']} label={t('name')} rules={[{ required: true, message: t('please_input_name') }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name={['en', 'keyword']} label={t('keywords')} help={t('separate_keywords_with_comma')}>
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item name={['en', 'description']} label={t('description')} style={{marginTop:5}}>
                        <Input.TextArea />
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