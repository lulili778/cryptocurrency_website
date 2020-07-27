import React from "react";

// Contexts
export const StateContext = React.createContext(null);
export const CryptocurrencyContext = React.createContext(null);

// Action constants
export const actions = {
  GET_CRYPTOCURRENCIES: "get cryptocurrencies",
  GET_CRYPTOCURRENCIES_SUCCESS: "get cryptocurrencies success",
  ADD_FAVOURITE: "add cryptocurrency to favourite list",
  REMOVE_FAVOURTIE: "remove cryptocurrency from favourite list"
};

export const createAction = (type, payload) => {
  return {
    type,
    payload
  };
};

// Reducer
export const reducer = (state, action) => {
  switch (action.type) {
    case actions.GET_CRYPTOCURRENCIES:
      return {
        ...state,
        loadingCryptocurrencies: true
      };
    case actions.GET_CRYPTOCURRENCIES_SUCCESS:
      return {
        ...state,
        loadingCryptocurrencies: false
      };
    case actions.ADD_FAVOURITE:
      const nextId = Math.max.apply(
        null,
        state.cryptocurrencyList.map(item => item.id)
      );
      const newItem = {
        ...action.payload,
        id: nextId + 1
      };
      return {
        ...state,
        cryptocurrencyList: [...state.cryptocurrencyList, newItem]
      };
    case actions.REMOVE_ITEM:
      return {
        ...state,
        cryptocurrencyList: state.cryptocurrencyList.filter(
          item => item.id !== action.payload
        )
      };
    default:
      return state;
  }
};
