import React, { useContext } from "react";

// State
import {
  CryptocurrencyContext,
  StateContext,
  actions,
  createAction
} from "../reducer";

export default props => {
  const state = useContext(StateContext);
  const dispatch = useContext(CryptocurrencyContext);

  const handleRemoveItem = id => {
    dispatch(createAction(actions.REMOVE_FAVOURTIE, id));
  };

  return (
    <div>
      {!state.cryptocurrencyList && <p>no items in list</p>}
      {state.cryptocurrencyList && (
        // <table>
        //   <thead>
        //     <tr>
        //       <th>ID</th>
        //       <th>Name</th>
        //       <th>Price</th>
        //       <th>Actions</th>
        //     </tr>
        //   </thead>
          <div>
            {state.cryptocurrencyList &&
              state.cryptocurrencyList.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>
                    <button onClick={() => handleRemoveItem(item.id)}>
                      remove
                    </button>
                  </td>
                </tr>
              ))}
    //       </div>
    //     </table>
      )}
    </div>
  );
};
