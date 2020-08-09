import React, { useReducer, useEffect,useContext } from "react";
import {Layout, Menu, Breadcrumb, Icon, Card,Col, Row} from 'antd';
import {Link} from "react-router-dom";

// Styles
// import "./styles.css";

// Data
import initialState from "./initialstate";
// import { reducer, StateContext, CryptoContext, actions } from "./reducer_hook";

// Components

import Compare from "./components/Compare"
import { reducer, StateContext, SelectCryptoContext, actions } from "./allCryptocurrency_hook";



export default props =>{

    // const [state, dispatch] = useReducer(reducer, initialState);
    const state = useContext(StateContext);
    const dispatch = useContext(SelectCryptoContext);




    return (
        <SelectCryptoContext.Provider value={dispatch}>
        <div>
            {/* {props.selectCryptoList} */}
            <Compare/>
        </div>
    </SelectCryptoContext.Provider>
        
    )
}

