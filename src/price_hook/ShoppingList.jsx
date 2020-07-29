import React, { useContext } from "react";

// State
import {
  ShoppingContext,
  StateContext,
  actions,
  createAction
} from "../reducer";

export default props => {
  const state = useContext(StateContext);
  const dispatch = useContext(ShoppingContext);

  const handleRemoveItem = id => {
    dispatch(createAction(actions.REMOVE_ITEM, id));
  };

  return (
    <>
      {!state.shoppingList && <p>no items in list</p>}
      {state.shoppingList && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {state.shoppingList &&
              state.shoppingList.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>£{item.price}</td>
                  <td>
                    <button onClick={() => handleRemoveItem(item.id)}>
                      remove
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </>
  );
};
