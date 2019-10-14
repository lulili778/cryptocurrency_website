import React, { Component } from 'react';
import logo from './logo.svg';
import {Button} from 'antd';
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import {blue} from '@ant-design/colors';
import {generate,presetPalettes} from '@ant-design/colors';

const {SubMenu} = Menu;
const {Header, Content, Sider, Footer} = Layout; 
const colors = generate('#1890ff');

class DashBoard extends Component {
  render() {
    return (
      <div> 
      <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1">DashBoard</Menu.Item>
          <Menu.Item key="2">Prices</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ background: '#fff', padding: 24, minHeight: 350 }}>Price Graph</div>
        <div style={{ minHeight: 20 }}></div>
        <div style={{ background: '#fff', padding: 24, minHeight: 350 }}>WatchList</div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>,
     </div>
    );
  }
}

export default DashBoard;
