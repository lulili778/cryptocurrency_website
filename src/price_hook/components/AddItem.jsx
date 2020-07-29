import React, { useContext, useState } from "react";

// State
import { ShoppingContext, actions, createAction } from "../reducer";

export default props => {
  const _defaultFields = {
    name: "",
    description: "",
    price: ""
  };
  const dispatch = useContext(ShoppingContext);
  const [fields, setFields] = useState({ ..._defaultFields });

  const handleInputChange = evt => {
    setFields({
      ...fields,
      [evt.target.id]: evt.target.value
    });
  };

  const handleFormSubmit = evt => {
    evt.preventDefault();
    dispatch(createAction(actions.ADD_ITEM, fields));
    setFields(_defaultFields);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        type="text"
        value={fields.name}
        onChange={handleInputChange}
      />
      <label htmlFor="description">Description</label>
      <input
        id="description"
        type="text"
        value={fields.description}
        onChange={handleInputChange}
      />
      <label htmlFor="price">Price</label>
      <input
        id="price"
        type="text"
        value={fields.price}
        onChange={handleInputChange}
      />
      <button type="submit">Add item</button>
    </form>
  );
};
