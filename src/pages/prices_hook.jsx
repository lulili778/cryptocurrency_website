import React, { useReducer, useEffect } from "react";

// Styles
// import "./styles.css";

// Data
import initialState from "./initialstate";
import { reducer, StateContext, CryptoContext, actions } from "./reducer_hook";

// Components
import AddItem from "./components/AddItem";
import CryptocurrencyList from "./components/CryptocurrencyList";
import Graph from "./components/Graph";

export default props => {
  // initialState1()
  // const initialState = (localStorage.getItem('unfav'))
  console.log("--------")
  console.log((initialState))
  console.log("--------")
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // simulate loading of items from an API
    dispatch({
      type: actions.GET_CRYPTO
    });

    setTimeout(() => {
      dispatch({
        type: actions.GET_CRYPTO_SUCCESS
      });
    }, 2000);
  }, []);

  return (
    <CryptoContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
      {/* <AddItem/> */}

        <h1>Favourite Cryptocurrency lists</h1>
        {/* <hr />
        {state.loadingCryptocurrencies && <div className="loading">...loading</div>}
        {!state.loadingCryptocurrencies && (
          <div className="columns">
            <div className="column">
              <h2>Add a new cryptocurrency</h2>
              <AddItem />
            </div>
            <div className="column"> */}
              <h2>Cryptocurrency list</h2>
              {/* <CryptocurrencyList /> */}
            {/* </div>
          </div>
        )} */}
        <br/>
        <h2>Graph</h2>
        < Graph />
        <h1>DONE</h1>
      </StateContext.Provider>
    </CryptoContext.Provider>
  );
};
