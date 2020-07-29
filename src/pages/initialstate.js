import React, { Component, useState, useEffect } from 'react';
import axios from 'axios'


function getInitialData(){
    const fav_list = localStorage.getItem('fav')
    const fav_map = []
    if (fav_list !== null) {
        console.log("inside_fav_list",fav_list==='')
        axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms='+fav_list+'&tsyms=SGD,USD&api_key=4159168a1743c1005c8a3805c9b2cd52e2e882ce4f4bc60608b51e07d5657b58').then(res =>{
            console.log("---data",res.data)
            Object.keys(res.data).map(item =>(
                fav_map.push({
                    price :res.data[item].SGD,
                    name : item})
            ))
        })
        return (fav_map)
    }else{
        return (fav_map)
    }


}



export default {
    loadingCrypto : false,
        cryptoList : getInitialData()
}
