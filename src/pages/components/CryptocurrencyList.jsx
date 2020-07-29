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
    const fav = localStorage.getItem('fav').split(',')
    if (fav.length >= 2){
      const newFav = fav.filter(item => item !== cryptos)
      localStorage.setItem('fav',newFav.join(','))
    }else{
      localStorage.removeItem('fav')
    }
  };


  const cryptoList = (state.cryptoList)

  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
  };

  function disableButton (){
    const isfav = localStorage.getItem('fav')
    console.log("isFAV",isfav)
    if (isfav !== null ){
      const fav = localStorage.getItem('fav').split(',')
      const isEmpty = fav.length
      console.log("isempty",isEmpty)
      console.log("isempty_bol",isEmpty <= 1 )
      if (isEmpty === 0 ){
        console.log(true)
        return (true)
      }else{
        console.log(false)
        return (false)
      }
    }else{
      console.log(true)
      return (true)
    }
    
  }



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
                <button disabled={disableButton()} id="remove" onClick={handleRemoveItem}> Remove</button>
      </Radio.Group>
    </div>
  )



}
















