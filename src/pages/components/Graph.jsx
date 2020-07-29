import React, {useContext, useState,useEffect} from "react";
import { Radio, Input } from 'antd';
import Axios from "axios";


export default props =>{

    const [datas, setData] = useState('')
    useEffect(()=>{
        Axios.get('https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=100&api_key=4159168a1743c1005c8a3805c9b2cd52e2e882ce4f4bc60608b51e07d5657b58')
        .then(
            res=>setData(res.data.Data.Data)
        )
    },[]) 

    return (
        <div>
            {datas}
        </div>
    )




}
