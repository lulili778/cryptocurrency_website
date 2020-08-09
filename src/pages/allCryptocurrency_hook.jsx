import React from "react";
export const StateContext = React.createContext(null);
export const SelectCryptoContext = React.createContext(null);


export const actions = {
    SELECTED_CRYPTO : "selected crypto",
    UNSELECTED_CRYPTO : "unselected crypto"
}

export const createAction = (type,payload) =>{
    return {
        type,
        payload
    };
};


export const reducer = (state,action) =>{
    console.log("----STATE.selectCryptoList",state.selectCryptoList)
    switch (action.type) {
        case actions.SELECTED_CRYPTO:
            const selectCrypto = {
                ...action.payload
            }
            console.log(".....this is new.....",selectCrypto)

            return {
                ...state,
                selectCryptoList : [selectCrypto,...state.selectCryptoList]
            };
        case actions.UNSELECTED_CRYPTO:
            return {
                ...state,
                selectCryptoList : state.selectCryptoList.filter(
                    crypto => crypto.name !== action.payload
                ),
            };
        default:
            return state
    }
}