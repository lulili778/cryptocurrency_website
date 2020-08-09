
import React, { Component, useState, useEffect,useContext,useReducer } from 'react';
import {Layout, Menu, Breadcrumb, Icon, Card, Col, Row} from 'antd';
// import initialState from "../in";

import {SelectCryptoContext,StateContext,reducer, createAction, actions} from '../allCryptocurrency_hook'


export default props => {
    const state = useContext(StateContext);
    const dispatch = useContext(SelectCryptoContext);

    // const [state, dispatch] = useReducer(reducer, initialState);

    console.log("TEST",dispatch)
    return (
        <div>
        <div>heeellllooooooo</div>
        <Row gutter={24}>
            <Col span={12}>
        <Card>
            HELLLOOOOOO
        </Card>
        </Col>
        <Col span={12}>
        <Card>
            HELLLOOOOOO
        </Card>
        </Col>
        </Row>
        </div>


    )
}