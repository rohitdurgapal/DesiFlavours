import { createSlice } from "@reduxjs/toolkit";
const initialState = [];
export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    addLogin: (state, action) => {
      state.pop();
      state.push(action.payload);
    },
    addLogout: (state, action) => {
      state.pop();
    },
  },
});

export const { addLogin, addLogout } = customerSlice.actions;

export default customerSlice.reducer;
