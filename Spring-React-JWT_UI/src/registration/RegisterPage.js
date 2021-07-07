import React, { Component, useState } from 'react'
import '../App.css'
import { Card, Steps, Button, Form, Input, message, Checkbox, Cascader, Select, Row, Col } from 'antd';
import { CreditCardOutlined, LockOutlined } from "@ant-design/icons"
import { current } from 'immer';
import RegisterationService from '../service/RegisterationService';
const { Option } = Select;

const { Step } = Steps;



class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,

        }
    }

    next() {
        this.setState({ current: current + 1 })
    };

    prev = () => {
        this.setState({ current: current - 1 })
    };

    registerUser = () => {

    }

    render() {

        const formItemLayout = {
            labelCol: {
                xs: {
                    span: 24,
                },
                sm: {
                    span: 8,
                },
            },
            wrapperCol: {
                xs: {
                    span: 24,
                },
                sm: {
                    span: 16,
                },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        const { current } = this.state

        const AccountDetailForm = () => {
            const [form] = Form.useForm();

            const onFinish = (values) => {
                RegisterationService.executeUserRegistration(values.username, values.password)
                    .then((response) => {
                        if (response.data = "Success") {
                            message.success("Registeration Completed")
                            this.props.history.push('/login')
                        }
                        else {
                            message.error("Error while registeration")
                        }
                    })
            };




            return (
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}

                    scrollToFirstError
                >
                    <Form.Item
                        name="username"
                        label="Username"
                        tooltip="Your EmailId"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your EmailId!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType='submit'
                        // onClick={() => {
                        //     this.registerUser()
                        //     message.success('Processing complete!')
                        //     this.props.history.push('/login')
                        // }}
                        >
                            Done
                        </Button>
                    </Form.Item>
                </Form>
            )
        }



        const UserInfoForm = () => {
            const [form] = Form.useForm();

            const onFinish = (values) => {
                console.log('Received values of form: ', values);
            };




            return (
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    onSubmitCapture={this.next()}
                    scrollToFirstError
                >
                    <Form.Item
                        name="firstname"
                        label="Firstname"
                        tooltip="Tell us your Firstname"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Firstname!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="lastname"
                        label="Lastname"
                        tooltip="Tell us your Lastname"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Lastname!',
                                whitespace: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="phone"
                        label="Phone Number"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone number!',
                            },
                        ]}
                    >
                        <Input

                            style={{
                                width: '100%',
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="gender"
                        label="Gender"
                        rules={[
                            {
                                required: true,
                                message: 'Please select gender!',
                            },
                        ]}
                    >
                        <Select placeholder="select your gender">
                            <Option value="male">Male</Option>
                            <Option value="female">Female</Option>
                            <Option value="other">Other</Option>
                        </Select>
                    </Form.Item>



                    <Form.Item
                        name="agreement"
                        valuePropName="checked"
                        rules={[
                            {
                                validator: (_, value) =>
                                    value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                            },
                        ]}
                        {...tailFormItemLayout}
                    >
                        <Checkbox>
                            I have read the <a href="">agreement</a>
                        </Checkbox>
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            );
        };

        const steps = [
            {
                title: 'Card Details',
                content: (
                    <Card className="login-card" title="Welcome!">
                        <div className="login-div">
                            <Form
                                name="normal_login"
                                className="login-form"
                                initialValues={{ remember: true }}
                            // onSubmitCapture={this.next.bind(this)}
                            // onFinish={onFinish}
                            >
                                <Form.Item
                                    name="card"
                                    rules={[
                                        { required: true, message: "Please input your Card Number!" },
                                    ]}
                                >
                                    <Input
                                        prefix={<CreditCardOutlined className="site-form-item-icon" />}
                                        placeholder="Card Details"
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[
                                        { required: true, message: "Please input your Security!" },
                                    ]}
                                >
                                    <Input
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="Security Code"
                                    />
                                </Form.Item>

                                {/* <Form.Item> */}

                                {/* </Form.Item> */}
                            </Form>
                            <Button
                                type="primary"
                                htmlType="submit"
                                // className="login-form-button"
                                onClick={() => { this.setState({ current: current + 1 }) }}
                            >
                                Next
                            </Button>
                        </div>
                    </Card>
                ),
            },
            {
                title: 'User Information',
                content: (
                    <Card className="register">
                        <Form
                            {...formItemLayout}
                            // form={form}
                            name="register"
                        // onFinish={onFinish}
                        // onSubmitCapture={this.next()}
                        // scrollToFirstError
                        >
                            <Form.Item
                                name="firstname"
                                label="Firstname"
                                tooltip="Tell us your Firstname"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Firstname!',
                                        whitespace: true,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="lastname"
                                label="Lastname"
                                tooltip="Tell us your Lastname"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Lastname!',
                                        whitespace: true,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="email"
                                label="E-mail"
                                rules={[
                                    {
                                        type: 'email',
                                        message: 'The input is not valid E-mail!',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your E-mail!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="phone"
                                label="Phone Number"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your phone number!',
                                    },
                                ]}
                            >
                                <Input

                                    style={{
                                        width: '100%',
                                    }}
                                />
                            </Form.Item>

                            <Form.Item
                                name="gender"
                                label="Gender"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select gender!',
                                    },
                                ]}
                            >
                                <Select placeholder="select your gender">
                                    <Option value="male">Male</Option>
                                    <Option value="female">Female</Option>
                                    <Option value="other">Other</Option>
                                </Select>
                            </Form.Item>



                            <Form.Item
                                name="agreement"
                                valuePropName="checked"
                                rules={[
                                    {
                                        validator: (_, value) =>
                                            value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                                    },
                                ]}
                                {...tailFormItemLayout}
                            >
                                <Checkbox>
                                    I have read the <a href="">agreement</a>
                                </Checkbox>
                            </Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                // className="login-form-button"
                                onClick={() => {
                                    this.setState({ current: current + 1 })
                                    console.log("working")
                                }}
                            >
                                Next
                            </Button>
                        </Form>
                    </Card>
                ),
            },
            {
                title: 'Account Credentials',
                content: (
                    <Card className="register">
                        <AccountDetailForm />
                    </Card>
                ),
            },
        ];


        return (
            <>
                <Steps current={current}>
                    {steps.map(item => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
                <div className="steps-content">{steps[current].content}</div>
                {/* <div className="steps-action">
                    {current < steps.length - 1 && (
                        <Button type="primary" onClick={() => this.next()}>
                            Next
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button type="primary" onClick={() => message.success('Processing complete!')}>
                            Done
                        </Button>
                    )}
                    {current > 0 && (
                        <Button style={{ margin: '0 8px' }} onClick={() => this.prev()}>
                            Previous
                        </Button>
                    )}
                </div> */}
            </>
        );
    }
}
export default RegisterPage