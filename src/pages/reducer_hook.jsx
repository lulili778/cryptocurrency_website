import React from "react";
import { Result, ConfigProvider } from "antd";
//Context provides a way to pass data through the component tree without having to pass down manually at every level
export const StateContext = React.createContext(null);
export const CryptoContext = React.createContext(null);

export const actions ={
    GET_CRYPTO: "get cryptocurrencies",
    GET_CRYPTO_SUCCESS : "get cryptocurrencies success",
    ADD_CRYPTO_FAV : "add crypto",
    REMOVE_CRYPTO_FAV : "remove crypto"
};

export const createAction = (type,payload) =>{
    return {
        type,
        payload
    };
};



//Reducer
export const reducer = (state,action) =>{
    switch (action.type) {
        case actions.GET_CRYPTO:
            return {
                ...state,
                loadingCrypto: true
            };
        case actions.GET_CRYPTO_SUCCESS:
            return {
                ...state,
                loadingCrypto : false
            }
        case actions.ADD_CRYPTO_FAV:
        const newCrypto = {
            ...action.payload
        }
        console.log("-----------",state.cryptoList)
        console.log(".....this is new.....",newCrypto)
            return{                
                ...state,
                cryptoList : [...state.cryptoList, newCrypto]

            };
        case actions.REMOVE_CRYPTO_FAV:
            console.log("cryptolist_name",state.cryptoList) 
            return{
                ...state,
                cryptoList: state.cryptoList.filter(
                    crypto => crypto.name !== action.payload
                ),
            };
        default:
            return state
    }
}