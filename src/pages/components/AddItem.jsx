import React, {useContext, useState,useEffect} from "react";
import axios from 'axios'
//state
import {CryptocurrencyContext, actions, createAction} from "../reducer";


export default props =>{
    const _defaultFields ={
        name : "",
        id: 0,
        price : ""
    };
    const dispatch = useContext(CryptocurrencyContext);
    const [fields, setFeilds] = useState({..._defaultFields});


    const handleAddItem = id => {
        dispatch(createAction(actions.ADD_FAVOURITE, id));
        };

    const cryptocurrencyList = [];
    const [currency, setcurrency] = useState([{}])
    useEffect(()=>{
        axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,DASH,XRP,EOS,LTC,BCH,TRX,PRC,YBC,DANK,GIVE,KOBO,DT,CETI,SUP,XPD,NXTI&tsyms=SGD,USD&api_key=4159168a1743c1005c8a3805c9b2cd52e2e882ce4f4bc60608b51e07d5657b58')
    .then(
        res=>setcurrency(res.data),
    )
} ,[])
    Object.keys(currency).map((key)=>(
        cryptocurrencyList.push({
            id: cryptocurrencyList.length,
            price : currency[key].SGD,
            name:key
        })
        ))

    return(
        <div>
        {cryptocurrencyList &&cryptocurrencyList.map(item => (
            <tr key={item.id}>
            <td>{item.name}</td>
            <td>${item.price}</td>
            <td>
            <button onClick ={() => handleAddItem(item.id)}> Add</button>
            </td>
            </tr>
    ))};
    </div>)
};