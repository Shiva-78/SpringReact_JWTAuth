import React, { Component } from "react";
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { Layout, Menu } from "antd";
// import Background from "./svg/amex-logo.svg";
import LoginPage from './login/LoginPage'
import RegisterPage from './registration/RegisterPage.js'
import DashboardPage from './dashboard/DashboardPage.js'
import "./App.css";

const { Header, Content, Footer } = Layout;


class App extends Component {
  render() {
    return (
      <Router>
        <Layout className="layout">
          <Header className="amex-header">
            <div
              className="logo"
            // style={{ backgroundImage: `url(${Background})` }}
            />
            <Menu
              className="amex-header-menu"
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["2"]}

            >
              <Menu.Item key="1" disabled>My Account</Menu.Item>
              <Menu.Item key="2">Cards</Menu.Item>
              <Menu.Item key="3">Savings & Loans</Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: "0 50px" }}>
            <Route exact path={'/'} component={LoginPage} />
            <Route exact path={'/login'} component={LoginPage} />
            <Route exact path={'/register'} component={RegisterPage} />
            <Route exact path={'/dashboard'} component={DashboardPage} />
          </Content>
          {/* <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer> */}
        </Layout>
      </Router>
    );
  }
}

export default App;
