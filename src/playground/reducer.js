import React from "react";

// Contexts
export const StateContext = React.createContext(null);
export const ShoppingContext = React.createContext(null);

// Action constants
export const actions = {
  GET_ITEMS: "get items",
  GET_ITEMS_SUCCESS: "get items success",
  ADD_ITEM: "add item",
  REMOVE_ITEM: "remove item"
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
    case actions.GET_ITEMS:
      return {
        ...state,
        loadingItems: true
      };
    case actions.GET_ITEMS_SUCCESS:
      return {
        ...state,
        loadingItems: false
      };
    case actions.ADD_ITEM:
      console.log("ADD_ITEM")
      const nextId = Math.max.apply(
        null,
        state.shoppingList.map(item => item.id)
      );
      const newItem = {
        ...action.payload,
        id: nextId + 1
      };
      return {
        ...state,
        shoppingList: [...state.shoppingList, newItem]
      };
    case actions.REMOVE_ITEM:
      return {
        ...state,
        shoppingList: state.shoppingList.filter(
          item => item.id !== action.payload
        )
      };
    default:
      return state;
  }
};
