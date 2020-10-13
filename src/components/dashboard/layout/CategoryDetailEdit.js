import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {Button, Col, Divider, Input, Row} from "antd";
import {useTranslation} from "react-i18next";

const CategoryDetailEdit = forwardRef((props, ref) => {

    const {t} = useTranslation();
    const [formValue, setFormValue] = useState({
        name:'',
        slug:'',
        topCategory: '',
        keywords: '',
        description: ''
    })

    useImperativeHandle(ref, () => ({
        doSubmit() {
            console.log(props.languageName)
            document.getElementById("doSubmit").click();
        }
    }));

    function onSubmit(value) {
        props.onSubmit(value)
    }

    return (
        <form onSubmit={onSubmit}>
            <Divider orientation="left">{props.languageName}</Divider>
            <Row>
                <Col flex="0 1 100px">{t('name')}</Col>
                <Col flex="1 1 400px">
                    <Input id="formName" name='name'/>
                </Col>
                <Col flex="0 1 400px"/>
            </Row>
            <Row>
                <Col flex="0 1 100px">{t('slug')}</Col>
                <Col flex="1 1 400px">
                    <Input id="formName" name='slug' />
                </Col>
                <Col flex="0 1 400px"/>
            </Row>
            <Row>
                <Col flex="0 1 100px">{t('keywords')}</Col>
                <Col flex="1 1 400px">
                    <Input id="formName" name='keywords'/>
                </Col>
                <Col flex="0 1 400px"/>
            </Row>

            <Row>
                <Col flex="0 1 100px">{t('description')}</Col>
                <Col flex="1 1 400px">
                    <Input id="formName" name='description' />
                </Col>
                <Col flex="0 1 400px"/>
            </Row>
            <Button id="doSubmit" type="primary" htmlType="submit">
                Submit
            </Button>
        </form>
    );

});

export default CategoryDetailEdit;