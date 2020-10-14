import React, {useContext, useEffect, useState} from 'react';
import DashboardPage from "./layout/DashboardPage";
import {Button, Card, Input, Form, Select, Space, Divider, Switch, Alert} from "antd";
import {useTranslation} from "react-i18next";
import CategoryService from "../../service/CategoryService";
import '../../util/use/Functions'

import StateContext from "../../util/context/StateContext";
import {Functions} from "../../util/use/Functions";
import {useHistory} from "react-router-dom";
import { useParams} from "react-router";

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
    const [data, setData] = useState(null)
    const [categoryOptions, setCategoryOptions] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    const appState = useContext(StateContext)
    const history = useHistory();
    let { key } = useParams();
    let publish = true;


    useEffect(()=>{
        let isMounted = true;
        if (key === undefined) {
            setData({
                az: {name: "", keyword: "", description: "", key_name: ""},
                en: {name: "", keyword: "", description: "", key_name: ""},
                publish: true,
                topCategoryKey: undefined
            })
            service.getAllTopCategories().then(response => {
                if (isMounted) setCategoryOptions(response.categories)
            }).catch(function (error) {
                console.log(error);
            })
        } else {
            service.getCategory(key).then(response => {
                console.log(response)
                if (response.category === null) {
                    setErrorMessage(t('its_failed'))
                } else {
                    if (isMounted){
                        setCategoryOptions(response.categories)
                        const category = response.category
                        const aze = category.translation[0]
                        const eng = category.translation[1]
                        publish = category.is_publish === 1
                        setData(
                            {
                                az: {name: aze.name, keyword: aze.keyword, description: aze.description, key_name: aze.key_name},
                                en: {name: eng.name, keyword: eng.keyword, description: eng.description, key_name: eng.key_name},
                                publish: true,
                                topCategoryKey: category.top_category_key
                            }
                        )
                    }
                }

            }).catch(error => {
                setErrorMessage(t('have_some_issues'))
                console.log(error.message)
            })
        }

        return () => { isMounted = false };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const onFinish = data => {
        data.az.key_name = Functions.slug(data.az.name)
        data.en.key_name = Functions.slug(data.en.name)
        data.publish = publish
        if (key === undefined) {
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
        } else {
            service.updateCategory(appState.user.token, data, key).then(response => {
                console.log(response.data)
                // if (response.data.status ==='ok'){
                //     history.push({
                //         pathname:`${global.variable.dashboardPath}/categories`,
                //         state: { detail: 'update'}
                //     });
                // } else {
                //     console.log(response.data)
                // }
            })
        }
    };
    const onReset = () => {
        form.resetFields();
    };
    const onChange = (checked) => {
        publish = checked
    }
    const handleCloseError = () => {

    }
    const breadcrumbItems = {items: [
            {key: 1, name: t('dashboard'), link: global.variable.dashboardPath},
            {key: 1, name: t('categories'), link: global.variable.dashboardPath+'/categories'},
            {key: 2, name: props.title},
        ]}

    return (
        <DashboardPage title={props.title} menuKey={props.menuKey} breadcrumbItems={breadcrumbItems}>

            {errorMessage !== '' ? (
                <Alert style={{marginTop:10}} message={errorMessage} type="warning" closable afterClose={handleCloseError} />
            ) : null}

            <Card className="dashboard-card" title={props.title}>
                {data === null ? null :
                    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish} initialValues={data}>

                        <Form.Item name="topCategoryKey" label={t('top_category')}>
                            <Select
                                allowClear
                            >
                                {
                                    categoryOptions.map((item) => {
                                        return <Option key={item.key} value={item.key}>{item.translation.find(el => el.language_id === appState.language.id).name}</Option>
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

                        <Form.Item name={['az', 'name']} label={t('name')} rules={[{ required: true, message: t('please_input') }]}>
                            <Input />
                        </Form.Item>

                        <Form.Item name={['az', 'key_name']} label={t('slug')} rules={[{ required: true, message: t('please_input') }]}>
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

                        <Form.Item name={['en', 'key_name']} label={t('slug')} rules={[{ required: true, message: t('please_input') }]}>
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
                }
            </Card>

        </DashboardPage>
    )
};

export default CategoryDetail;