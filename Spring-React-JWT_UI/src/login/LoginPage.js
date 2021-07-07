import React, { Component } from 'react'
import { Card, Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import AuthenticationService from '../service/AuthenticationService';
import '../App.css'



class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }
    render() {
        const onLogin = (values) => {
            console.log(values)
            AuthenticationService
                .executeJwtAuthenticationService(values.username, values.password)
                .then((response) => {
                    AuthenticationService.registerSuccessfulLoginForJwt(values.username, response.data.token, response.data.role)
                    this.props.history.push(`/dashboard`)
                }).catch(() => {
                    // this.setState({ showSuccessMessage: false })
                    // this.setState({ hasLoginFailed: true })
                    message.error("Invalid Username or Password")
                })

        }
        return (
            <Card className="login-card" title="Log In to your Account">
                <div className="login-div">
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onLogin}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                { required: true, message: "Please input your Username!" },
                            ]}
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="Username"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                { required: true, message: "Please input your Password!" },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <a className="login-form-forgot" href="">
                                Forgot password
                            </a>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="login-form-button"
                            >
                                Log in
                            </Button><br />
                            Or <a href="/register">register now!</a>
                        </Form.Item>
                    </Form>
                </div>
            </Card>
        );
    }
}
export default LoginPage