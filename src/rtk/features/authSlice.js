import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  userId: localStorage.getItem("userId") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload); // مزامنة مع localStorage
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
      localStorage.setItem("userId", action.payload);
    },
    logout: (state) => {
      state.token = null;
      state.userId = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    },
  },
});

export const { setToken, setUserId, logout } = authSlice.actions;
export default authSlice.reducer;
