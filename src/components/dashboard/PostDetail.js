import React, {useContext, useEffect, useState} from 'react';
import DashboardPage from "./layout/DashboardPage";
import {Button, Card, Input, Form, Select, Space, Switch, Alert, Tag, Tooltip, Upload} from "antd";
import {useTranslation} from "react-i18next";
import CategoryService from "../../service/CategoryService";
import '../../util/use/style'

import StateContext from "../../util/context/StateContext";
import {functions} from "../../util/use/functions";
import {useHistory, useLocation} from "react-router-dom";
import {useParams} from "react-router";
import {PlusOutlined, LoadingOutlined} from "@ant-design/icons";

import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const {Option} = Select;

const tagStyle = {
    marginTop: 5,
    marginBottom: 5,
};

const PostDetail = props => {
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

    //tags
    const [tags, setTags] = useState([])
    const [inputVisible, setInputVisible] = useState(false)
    const [inputValue, setInputValue] = useState('')
    const [editInputIndex, setEditInputIndex] = useState(-1)
    const [editInputValue, setEditInputValue] = useState('')

    // image upload
    const [loading, setLoading] = useState('')
    const [imageUrl, setImageUrl] = useState(false)

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
                az: {name: "", keyword: "", meta_description: "", key_name: ""},
                en: {name: "", keyword: "", meta_description: "", key_name: ""},
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
                                    meta_description: aze.meta_description,
                                    key_name: aze.key_name
                                },
                                en: {
                                    name: eng.name,
                                    keyword: eng.keyword,
                                    meta_description: eng.meta_description,
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

    const handleChangeCheck = (checked) => {
        setPublish(checked)
    }

    const handleCloseError = () => {
        history.replace({ ...history.location, state:{} });
        setErrorMessage('')
    }

    // tags
    const handleClose = removedTag => {
        const filteredTags = tags.filter(tag => tag !== removedTag);
        console.log(filteredTags);
        setTags(filteredTags)
    };

    const showInput = () => {
        setInputVisible(true)
    };

    const handleInputChange = e => {
        setInputValue(e.target.value)
    };

    const handleInputConfirm = () => {
        if (inputValue && tags.indexOf(inputValue) === -1) {
            setTags([...tags, inputValue])
        }
        console.log(tags);
        setInputValue('')
        setInputVisible(false)
    };

    const handleEditInputChange = e => {
        setEditInputValue(e.target.value)
    };

    const handleEditInputConfirm = () => {
        const newTags = [...tags];
        newTags[editInputIndex] = editInputValue;
        setEditInputIndex(-1)
        setEditInputValue('')
    };
    // end tags

    // upload
    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    function beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            setErrorMessage('jpg_png_error')
            // message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            setErrorMessage('mp_error')
            // message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    const handleChange = info => {
        if (info.file.status === 'uploading') {
            setLoading(true)
            return;
        }
        if (info.file.status === 'done') {
            // Get url from response in real world.
            getBase64(info.file.originFileObj, url =>
                {
                    setImageUrl(url)
                    setLoading(false)
                }
                // setState({
                //     imageUrl,
                //     loading: false,
                // }),
            );
        }
    };
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    // end upload

    return (
        <DashboardPage title={props.title} menuKey={props.menuKey} breadcrumbItems={breadcrumbItems}>

            {errorMessage !== '' ? (
                <Alert style={{marginTop: 10}} message={errorMessage} type="warning" closable
                       afterClose={handleCloseError}/>
            ) : null}

            <Card className="dashboard-card" title={props.title}>
                {data === null ? null :
                    <Form labelCol={{span: 3, offset: 6}} {...global.style.formLayout} form={form} name="control-hooks" onFinish={handleFinish} initialValues={data}>


                        <Form.Item name={['az', 'name']} label={t('name')}
                                   rules={[{required: true, message: t('please_input')}]}>
                            <Input/>
                        </Form.Item>

                        <Form.Item name={['az', 'key_name']} label={t('slug')}
                                   rules={[{required: true, message: t('please_input')}]}>
                            <Input/>
                        </Form.Item>

                        <Form.Item name="language" label={t('language')}>
                            <Select >
                                <Option value="1">Azərbaycan</Option>
                                <Option value="2">English</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item name="categoryKey" label={t('category')}>
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

                        <Form.Item name="image" label={t('image')} valuePropName="fileList">
                            <Upload
                                name="avatar"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                beforeUpload={beforeUpload}
                                onChange={handleChange}
                            >
                                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                            </Upload>
                        </Form.Item>

                        <Form.Item name={['az', 'meta_keyword']} label={t('tags')}>
                            {
                                <>
                                    {tags.map((tag, index) => {
                                        if (editInputIndex === index) {
                                            return (
                                                <Input
                                                    key={tag}
                                                    size="small"
                                                    className="tag-input"
                                                    value={editInputValue}
                                                    onChange={handleEditInputChange}
                                                    onBlur={handleEditInputConfirm}
                                                    onPressEnter={handleEditInputConfirm}
                                                />
                                            );
                                        }

                                        const isLongTag = tag.length > 20;

                                        const tagElem = (
                                            <Tag
                                                style={tagStyle}
                                                className="edit-tag"
                                                key={tag}
                                                closable={true}
                                                onClose={() => handleClose(tag)}
                                            >
              <span
                  onDoubleClick={e => {
                      if (index !== 0) {
                          setEditInputIndex(index)
                          setEditInputValue(tag)
                          e.preventDefault();
                      }
                  }}
              >
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
              </span>
                                            </Tag>
                                        );
                                        return isLongTag ? (
                                            <Tooltip title={tag} key={tag}>
                                                {tagElem}
                                            </Tooltip>
                                        ) : (
                                            tagElem
                                        );
                                    })}
                                    {inputVisible && (
                                        <Input
                                            style={{
                                                width:100,
                                            }}
                                            type="text"
                                            size="small"
                                            className="tag-input"
                                            value={inputValue}
                                            autoFocus={true}
                                            onChange={handleInputChange}
                                            onBlur={handleInputConfirm}
                                            onPressEnter={handleInputConfirm}
                                        />
                                    )}
                                    {!inputVisible && (
                                        <Tag style={tagStyle} className="site-tag-plus" onClick={showInput}>
                                            <PlusOutlined /> {t('new_tag')}
                                        </Tag>
                                    )}
                                </>
                            }
                        </Form.Item>

                        <Form.Item name={['az', 'meta_keyword']} label={t('meta_keywords')}
                                   help={t('separate_keywords_with_comma')}>
                            <Input.TextArea/>
                        </Form.Item>

                        <Form.Item name={['az', 'meta_description']} label={t('meta_description')} style={{marginTop: 5}}>
                            <Input.TextArea/>
                        </Form.Item>

                        <Form.Item label={t('publish')} style={{marginTop: 5}}>
                            <Switch defaultChecked onChange={handleChangeCheck}/>
                        </Form.Item>

                        <CKEditor
                            editor={ ClassicEditor }
                            data="<p>Hello from CKEditor 5!</p>"
                            style={{height:500}}
                            config={{ckfinder: {
                                    // Upload the images to the server using the CKFinder QuickUpload command
                                    // You have to change this address to your server that has the ckfinder php connector
                                    uploadUrl: 'https://example.com/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images&responseType=json'
                                }}}
                            // onInit={ editor => {
                            //     // You can store the "editor" and use when it is needed.
                            //     // console.log( 'Editor is ready to use!', editor );
                            // } }
                            // onChange={ ( event, editor ) => {
                            //     const data = editor.getData();
                            //     console.log( { event, editor, data } );
                            // } }
                            // onBlur={ ( event, editor ) => {
                            //     console.log( 'Blur.', editor );
                            // } }
                            // onFocus={ ( event, editor ) => {
                            //     console.log( 'Focus.', editor );
                            // } }
                        />

                        <Form.Item {...global.style.formTailLayout} className="form_button_group">
                            <Space style={{marginTop:30}}>
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

export default PostDetail;