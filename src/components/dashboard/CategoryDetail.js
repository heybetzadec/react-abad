import React, {useContext, useEffect, useState} from 'react';
import DashboardPage from "./layout/DashboardPage";
import {Button, Card, Input, Form, Select, Space, Divider, Switch, Alert} from "antd";
import {useTranslation} from "react-i18next";
import CategoryService from "../../service/CategoryService";
import '../../util/use/style'

import StateContext from "../../util/context/StateContext";
import {functions} from "../../util/use/functions";
import {useHistory, useLocation} from "react-router-dom";
import {useParams} from "react-router";

const {Option} = Select;


const CategoryDetail = props => {
    let {key} = useParams()
    const {t} = useTranslation();
    const [form] = Form.useForm();
    const service = new CategoryService()
    const [data, setData] = useState(null)
    const [categoryOptions, setCategoryOptions] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    const [publish, setPublish] = useState(true)
    const appState = useContext(StateContext)
    const history = useHistory()
    const location = useLocation()

    const breadcrumbItems = {
        items: [
            {key: 1, name: t('dashboard'), link: global.variable.dashboardPath},
            {key: 1, name: t('categories'), link: global.variable.dashboardPath + '/categories'},
            {key: 2, name: props.title},
        ]
    }

    useEffect(() => {
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
                    if (isMounted) {
                        setCategoryOptions(response.categories)
                        const category = response.category
                        const aze = category.translation[0]
                        const eng = category.translation[1]
                        setPublish((category.is_publish === 1))
                        setData(
                            {
                                az: {
                                    name: aze.name,
                                    keyword: aze.keyword,
                                    description: aze.description,
                                    key_name: aze.key_name
                                },
                                en: {
                                    name: eng.name,
                                    keyword: eng.keyword,
                                    description: eng.description,
                                    key_name: eng.key_name
                                },
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

        return () => {
            isMounted = false
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleFinish = data => {
        data.az.key_name = functions.slug(data.az.name)
        data.en.key_name = functions.slug(data.en.name)
        data.publish = publish
        if (key === undefined) {
            service.saveCategory(appState.user.token, data).then(response => {
                if (response.data.status === 'ok') {
                    history.push({
                        pathname: `${global.variable.dashboardPath}/categories`,
                        state: {detail: 'add'}
                    });
                } else {
                    console.log(response.data)
                }
            })
        } else {
            service.updateCategory(appState.user.token, data, key).then(response => {
                // console.log(response.data)
                if (response.data.status === 'ok') {
                    history.push({
                        pathname: `${global.variable.dashboardPath}/categories`,
                        state: {detail: 'update', pagination: location.state.pagination}
                    });
                } else {
                    setErrorMessage(t('its_failed'))
                    console.log(response.data)
                }
            })
        }
    };

    const handleReset = () => {
        form.resetFields();
    };

    const handleChange = (checked) => {
        setPublish(checked)
    }

    const handleCloseError = () => {
        history.replace({ ...history.location, state:{} });
        setErrorMessage('')
    }

    return (
        <DashboardPage title={props.title} menuKey={props.menuKey} breadcrumbItems={breadcrumbItems}>

            {errorMessage !== '' ? (
                <Alert style={{marginTop: 10}} message={errorMessage} type="warning" closable
                       afterClose={handleCloseError}/>
            ) : null}

            <Card className="dashboard-card" title={props.title}>
                {data === null ? null :
                    <Form {...global.style.formLayout} form={form} name="control-hooks" onFinish={handleFinish} initialValues={data}>

                        <Form.Item name="topCategoryKey" label={t('top_category')}>
                            <Select
                                allowClear
                            >
                                {
                                    categoryOptions.map((item) => {
                                        return <Option key={item.key}
                                                       value={item.key}>{item.translation.find(el => el.language_id === appState.language.id).name}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>

                        <Form.Item label={t('publish')} style={{marginTop: 5}}>
                            <Switch defaultChecked onChange={handleChange}/>
                        </Form.Item>

                        <Divider orientation="left" plain>
                            Azərbaycan
                        </Divider>

                        <Form.Item name={['az', 'name']} label={t('name')}
                                   rules={[{required: true, message: t('please_input')}]}>
                            <Input/>
                        </Form.Item>

                        <Form.Item name={['az', 'key_name']} label={t('slug')}
                                   rules={[{required: true, message: t('please_input')}]}>
                            <Input/>
                        </Form.Item>

                        <Form.Item name={['az', 'keyword']} label={t('keywords')}
                                   help={t('separate_keywords_with_comma')}>
                            <Input.TextArea/>
                        </Form.Item>

                        <Form.Item name={['az', 'description']} label={t('description')} style={{marginTop: 5}}>
                            <Input.TextArea/>
                        </Form.Item>

                        <Divider orientation="left" plain>
                            English
                        </Divider>

                        <Form.Item name={['en', 'name']} label={t('name')}
                                   rules={[{required: true, message: t('please_input_name')}]}>
                            <Input/>
                        </Form.Item>

                        <Form.Item name={['en', 'key_name']} label={t('slug')}
                                   rules={[{required: true, message: t('please_input')}]}>
                            <Input/>
                        </Form.Item>

                        <Form.Item name={['en', 'keyword']} label={t('keywords')}
                                   help={t('separate_keywords_with_comma')}>
                            <Input.TextArea/>
                        </Form.Item>

                        <Form.Item name={['en', 'description']} label={t('description')} style={{marginTop: 5}}>
                            <Input.TextArea/>
                        </Form.Item>

                        <Form.Item {...global.style.formTailLayout} className="form_button_group">
                            <Space>

                                <Button htmlType="button" onClick={handleReset}>
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