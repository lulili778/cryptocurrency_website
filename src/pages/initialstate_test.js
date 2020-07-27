
import React, { Component, useState, useEffect } from 'react';
import axios from 'axios'

function GetCryptocurrency(){   

    const _defaultFields ={
        name : "",
        id: 0,
        price : ""
    };
    const dispatch = useContext(CryptocurrencyContext);
    const [fields, setFeilds] = useState({..._defaultFields});

    const handleInputChange = evt => {
        setFeilds({
            ...fields,
            [evt.target.id] :evt.target.value
        });
    };

    const handleFormSubmit = evt =>{
        evt.preventDefault();
        dispatch(createAction(actions.ADD_FAVOURITE, fields));
        setFeilds(_defaultFields);
    };


    // const loadingCryptocurrencies =  false;
    const cryptocurrencyList = [];
    localStorage.setItem('unfav',[])


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
        // cryptocurrency_name.name = key
        // cryptocurrencyList.price = (currency)[key].SGD

        ))
    console.log(cryptocurrencyList)
    console.log(cryptocurrencyList.length)
    localStorage.setItem('unfav',JSON.stringify(cryptocurrencyList))
    // return (localStorage.getItem('unfav'))
        // <li>ji</li>)
        // <div>{Object.keys(currency).map((key)=>(
        //     <div id="news-container">
        //         <div>{key} </div>
        //     </div> ))}
        // </div>)
        
}



// export default {
//     GetCryptocurrency()
//     cryptocurrencyList : [localStorage.getItem('unfav')]


        
// }
export default GetCryptocurrency;
