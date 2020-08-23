import React, { useReducer, useEffect } from "react";
import {Layout, Menu, Breadcrumb, Icon, Card,Col, Row} from 'antd';
import {Link} from "react-router-dom";

// Styles
// import "./styles.css";

// Data
import initialState from "./initialstate";
// import { reducer, StateContext, CryptoContext, actions } from "./reducer_hook";

// Components
import AddItem from "./components/AddItem";
import CryptocurrencyList from "./components/CryptocurrencyList";
import Graph from "./components/Graph";
import AllCryptocurrency from "./components/AllCryptocurrency"
import { reducer, StateContext, SelectCryptoContext, actions } from "./allCryptocurrency_hook";



export default props =>{

    // const [state, dispatch] = useReducer(reducer, initialState);





    return (
        <SelectCryptoContext.Provider >
        <div>
    <AllCryptocurrency/>
        </div>
    </SelectCryptoContext.Provider>
        
    )
}

