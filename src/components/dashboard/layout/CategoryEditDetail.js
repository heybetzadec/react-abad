import React, {useState, useImperativeHandle, forwardRef} from 'react';
import {Button, Divider, Form, Input, Select, Space} from "antd";
import {ThunderboltOutlined} from "@ant-design/icons";
import {useTranslation} from "react-i18next";
import {Functions} from "../../../util/use/Functions";

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 10 },
};
const tailLayout = {
    wrapperCol: { offset: 4, span: 10 },
};
const { Option } = Select;
const CategoryEditDetail = forwardRef((props, ref) => {
    const {t} = useTranslation();
    const [form] = Form.useForm();
    const [slugName, setSlugName] = useState("")

    const addSlug = () => {
        const slug = Functions.slug(document.getElementById("control-hooks_name").value)
        setSlugName(slug)
    }

    useImperativeHandle(ref, () => ({
        doSubmit() {
            console.log(props.languageName)
            document.getElementById("editFormSubmit").click();
        }
    }));


    return (
        <>
            <Divider orientation="left" plain>
                {props.languageName}
            </Divider>

            <Form id="editForm" {...layout} form={form} name="control-hooks" onFinish={props.onFinish} style={{marginBottom:50}}>

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
                        allowClear
                    >
                        {
                            props.categoryOptions.map((item) => {
                                return <Option key={item.slug} value={item.slug}>{item.translation.find(el => el.language_id === props.langId).name}</Option>
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

                <Form.Item {...tailLayout} className="form_button_group" style={{display:"none"}}>
                    <Space>
                        <Button id="editFormSubmit" type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Space>
                </Form.Item>

            </Form>
        </>
    )
});

export default CategoryEditDetail;