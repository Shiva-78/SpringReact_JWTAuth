import React, { Component } from 'react'
import { Empty, Modal } from 'antd';

class DashboardPage extends Component {
    success() {
        Modal.success({
            content: '',
            title: 'WELCOME!'
        });
    }

    componentDidMount = () => {
        this.success()
    }
    render() {
        return (
            <Empty />
        );
    }
}
export default DashboardPage