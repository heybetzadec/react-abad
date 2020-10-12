import React, {useEffect, useRef, useState} from 'react';
import DashboardPage from "./layout/DashboardPage";
import {Button, Card, Input, Form, Select, Space, Divider} from "antd";
import {useTranslation} from "react-i18next";
import CategoryService from "../../service/CategoryService";
import '../../util/use/Functions'
import {Functions} from "../../util/use/Functions";
import {
    ThunderboltOutlined
} from '@ant-design/icons';
import CategoryEditDetail from "./layout/CategoryEditDetail";

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


    const childRefAz = useRef();
    const childRefEn = useRef();

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

    const onFinishAz = values => {
        console.log(values);
    };
    const onFinishEn = values => {
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
    // const changeName = (e) => {
    //     setSlugName(Functions.slug(e.target.value))
    // }



    const addSlug = () => {
        const slug = Functions.slug(document.getElementById("control-hooks_name").value)
        setSlugName(slug)
    }


    const submitAll = () => {
        childRefAz.current.doSubmit()
        childRefEn.current.doSubmit()
    }

    return (
        <DashboardPage title={props.title} menuKey={props.menuKey} breadcrumbItems={breadcrumbItems}>



            <Card className="dashboard-card" title={props.title}>

                <CategoryEditDetail categoryOptions={categoryOptions} langId={1} languageName="English" onFinish={onFinishAz} ref={childRefAz}/>
                <CategoryEditDetail categoryOptions={categoryOptions} langId={2} languageName="Azərbaycan" onFinish={onFinishEn} ref={childRefEn}/>

                <Button onClick={submitAll} type="primary">Primary Button</Button>

                <Divider orientation="left" plain>
                    Left Text
                </Divider>
                <Form {...layout} form={form} name="control-hooks" onFinish={onFinishEn}>
                    <Form.Item name="name" label={t('name')} rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="slug" label={t('slug')} rules={[{ required: true }]} valuePropName={slugName}>
                        <Input
                            onChange={e => setSlugName(e.target.value)}
                            value={slugName}
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
                                    return <Option key={item.slug} value={item.slug}>{item.translation.find(el => el.language_id === 1).name}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>

                    <Form.Item name="keyword" label={t('keywords')} help={t('separate_keywords_with_comma')}>
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item name="description" label={t('description')} style={{marginTop:5}}>
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