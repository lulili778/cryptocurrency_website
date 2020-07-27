import React, { useReducer, useEffect } from "react";

// Styles
// import "./styles.css";

// Data
import initialState from "./initialstate";
import { reducer, StateContext, CryptocurrencyContext, actions } from "./reducer";

// Components
import AddItem from "./components/AddItem";
import CryptocurrencyList from "./components/CryptocurrencyList";

export default props => {
  // initialState1()
  // const initialState = (localStorage.getItem('unfav'))
  console.log("--------")
  // console.dir((initialState))
  console.log("--------")
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // simulate loading of items from an API
    dispatch({
      type: actions.GET_CRYPTOCURRENCIES
    });

    setTimeout(() => {
      dispatch({
        type: actions.GET_CRYPTOCURRENCIES_SUCCESS
      });
    }, 2000);
  }, []);

  return (
    <CryptocurrencyContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <h1>Redux fun with Cryptocurrency lists</h1>
        <hr />
        {state.loadingCryptocurrencies && <div className="loading">...loading</div>}
        {!state.loadingCryptocurrencies && (
          <div className="columns">
            <div className="column">
              <h2>Add a new cryptocurrency</h2>
              <AddItem />
            </div>
            <div className="column">
              <h2>Cryptocurrency list</h2>
              <CryptocurrencyList />
            </div>
          </div>
        )}
      </StateContext.Provider>
    </CryptocurrencyContext.Provider>
  );
};
