import { createSlice } from "@reduxjs/toolkit";
const initialState = [];
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action) => {
      const { _id, name, itemImage, count } = action.payload;
      const { price } = action.payload.selectedQuantityId;
      const itemInCart = state.find(
        (item) =>
          item._id === _id &&
          item.quantityId === action.payload.selectedQuantityId._id
      );
      if (itemInCart) {
        itemInCart.count++;
      } else {
        state.push({
          _id,
          name,
          itemImage,
          count,
          price,
          quantityId: action.payload.selectedQuantityId._id,
          quantityName: action.payload.selectedQuantityId.name,
          dateNow: Date.now(),
        });
      }
    },
    minus: (state, action) => {
      const { _id, quantityId, dateNow } = action.payload;
      let item = state.find(
        (item) => item._id === _id && item.quantityId === quantityId
      );
      if (item.count === 1) {
        return state.filter((i) => i.dateNow !== dateNow);
      } else {
        item.count--;
      }
    },
    plus: (state, action) => {
      const { _id, quantityId } = action.payload;
      const item = state.find(
        (item) => item._id === _id && item.quantityId === quantityId
      );
      item.count++;
    },
    remove: (state, action) => {
      return (state = initialState);
    },
  },
});

export const { add, minus, plus, remove } = cartSlice.actions;

export default cartSlice.reducer;
