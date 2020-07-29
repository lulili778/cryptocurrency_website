import React, {useContext, useState,useEffect} from "react";
import { Radio, Input } from 'antd';

// State
import {
  CryptoContext,
  StateContext,
  actions,
  createAction
} from "../reducer_hook";

export default props => {
  const state = useContext(StateContext);
  const dispatch = useContext(CryptoContext);


  const [cryptos,setCryptos] = useState()



  const setcrypos = evt =>{
    setCryptos(
        evt.target.id
   )}

  const handleRemoveItem = evt => {
    dispatch(createAction(actions.REMOVE_CRYPTO_FAV, cryptos));
  };




  const cryptoList = (state.cryptoList)

  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };


  return (
    <div>
       <Radio.Group onChange={setcrypos}>
                {cryptoList && cryptoList.map(item => (
                  <div>
                    <Radio id={item.name} style={radioStyle} value={item.price}>
                        {item.name} ${item.price}
                    </Radio>

                  </div>
                ))}
                <button id="remove" onClick={handleRemoveItem}> Remove</button>

      </Radio.Group>
    </div>
  )



}
















