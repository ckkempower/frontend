import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addDetails: (state, action) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.value = {};
    },
  },
});

export const { addDetails } = userSlice.actions;

export default userSlice.reducer;
