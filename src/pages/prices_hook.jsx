import React, { useReducer, useEffect } from "react";
import {Layout, Menu, Breadcrumb, Icon, Card,Col, Row} from 'antd';
import {Link} from "react-router-dom";

// Styles
// import "./styles.css";

// Data
import initialState from "./initialstate";
import { reducer, StateContext, CryptoContext, actions } from "./reducer_hook";

// Components
import AddItem from "./components/AddItem";
import CryptocurrencyList from "./components/CryptocurrencyList";
import Graph from "./components/Graph";



const {Header, Content, Sider, Footer} = Layout; 

export default props => {
  // initialState1()
  // const initialState = (localStorage.getItem('unfav'))
  console.log("--------")
  console.log((initialState))
  console.log("--------")
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // simulate loading of items from an API
    dispatch({
      type: actions.GET_CRYPTO
    });

    setTimeout(() => {
      dispatch({
        type: actions.GET_CRYPTO_SUCCESS
      });
    }, 2000);
  }, []);

  return (
    <CryptoContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <Layout className="layout">
        <Header>
            <div className="logo" />
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                style={{ lineHeight: '64px' }}>
                <Menu.Item key="1"><Link to ="/News">Cryptocurrency News</Link></Menu.Item>
                <Menu.Item key="2">Price</Menu.Item>
            </Menu>
        </Header>        
        <Content style={{ padding: '0 50px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>Price</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-card-border-less-wrapper">
            <Card title="Bitcoin Historical Price Graph (SGD v.s Date)" bordered={false} style={{ span: 8 }}>
              <Graph />
            </Card>
            </div>
            <br/>
            <div className="site-card-wrapper">
            <Row gutter={24}>
            <Col span={12}>
              <Card title="Favourite Cryptocurrency list" bordered={false}>
                <CryptocurrencyList />
              </Card>
            </Col>
            <Col span={12}>
              <Card title="All Cryptocurrency list" bordered={false}>
                <AddItem />
              </Card>
            </Col>
            </Row>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </StateContext.Provider>
    </CryptoContext.Provider>
  );
};
