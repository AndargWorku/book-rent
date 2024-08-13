import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: "",
  },
  reducers: {
    addUser: (state, action) => {
      state.value = action.payload;
    },

    removeUser: (state) => {
      state.value = "";
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
// export const incrementAsync = (amount) => (dispatch) => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount))
//   }, 1000)
// }

export const getUser = (state) => state.user.value;

export default userSlice.reducer;