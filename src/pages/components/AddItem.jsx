import React, {useContext, useState,useEffect} from "react";
import axios from 'axios'
//state
import {CryptoContext, actions, createAction} from "../reducer_hook";
import { Radio, Input } from 'antd';


export default props =>{

    const _defaultCryptoSelected = ("")



    const dispatch = useContext(CryptoContext);
    const [cryptos,setCryptos] = useState()

    // const handleCrptoSelected = evt =>{
    //     console.log("...",cryptos)
    //     setcryptos({
    //         ...cryptos,
    //         "name" : evt.target.value
            

    //     });
    //     console.log("id",evt.target.id)
    //     console.log("value",evt.target.value)
    //     console.log("fields",cryptos)
    // }



    function is_localstorageEmpty(current_fav,crypto){
        if (current_fav === null){
            const fav_string = crypto
            return (fav_string)
        }
        else{
            current_fav = current_fav.split(",")
            const fav_string = [crypto].concat([current_fav])
            return(fav_string)
        } 
    }


    function check_duplicate(crypto){

        // const localStorage_favouritelist = []
        console.log("CHECKINGCHECKING",crypto)
        if (localStorage.getItem('fav') === null){
            return false
        }
        else{
            const localStorage_favouritelist = localStorage.getItem('fav').split(",")
        if (localStorage_favouritelist.includes(crypto)){
            console.log(true)
            return (true)
        }
        else{
            console.log(false)
            return (false)
        }
        }
    }


   const setcrypos = evt =>{
    setCryptos({
        "name" : evt.target.id,
        "price" : evt.target.value
        // [evt.target.id]: evt.target.value});
   })}

    const handleAddItem = evt=>{
        const current_fav = localStorage.getItem("fav")
        const fav_string = is_localstorageEmpty(current_fav,cryptos["name"])
        // console.log("this ",fav_string)
        console.log("NAME OF CRYPTO",cryptos["name"])
        const is_duplicate = check_duplicate(cryptos["name"])
        if (is_duplicate === true){
            console.log("Success ! already added in the favourote list")
            return ("Success ! already added in the favourote list")
        }
        else{
            dispatch(createAction(actions.ADD_CRYPTO_FAV,cryptos));
            localStorage.setItem("fav",fav_string)
            console.log("Success! Added to favourite list")
            return ("Success! Added to favourite list")
        }
    };

    const all_cryptoList = [];
    const [currency, setcurrency] = useState([{}])
    useEffect(()=>{
        axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,DASH,XRP,EOS,LTC,BCH,TRX,PRC,YBC,DANK,GIVE,KOBO,DT,CETI,SUP,XPD,NXTI&tsyms=SGD,USD&api_key=4159168a1743c1005c8a3805c9b2cd52e2e882ce4f4bc60608b51e07d5657b58')
    .then(
        res=>setcurrency(res.data),
    )
} ,[])
    Object.keys(currency).map((key)=>(
        all_cryptoList.push({
            price : currency[key].SGD,
            name:key
        })
        ))


    const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
          };

    return(
        <div>
            <h1>All Cryptocurrency List</h1>
            <Radio.Group onChange={setcrypos}>
                {all_cryptoList && all_cryptoList.map(item => (
                    <Radio id={item.name} style={radioStyle} value={item.price}>
                        {item.name} ${item.price}
                    </Radio>
                ))}
            <button id="add" onClick ={handleAddItem}> Add</button>
            </Radio.Group>





        {/* {all_cryptoList &&all_cryptoList.map(item => (
            <tr key={item.name}>
            <td id="name" value= {item.name}>{item.name}</td>
            <td id="price" value={item.price}>${item.price}</td>
            <td>                
            <button id={item.name} value={item.name} onClick ={test}> test</button>
            <button id={item.name} value={item.name} onClick ={handleAddItem}> Add</button>
            </td>
            </tr>
    ))}; */}
    </div>)
};
