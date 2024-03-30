import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: null,
    },
    isSignUp: false,
  },
  reducers: {
    loginSuccess: (state, action) => {
      console.log(action.payload);
      state.login.currentUser = {
        ...action.payload.data,
        token: action.payload.token,
      };
    },

    registerSuccess: (state, action) => {
      
      state.isSignUp = true;
    },

    logOutSuccess: (state, action) => {
      
      state.login.currentUser = null;
    },
    updateUserSuccess: (state, action) => {
      
      state.login.currentUser = {
        ...state.login.currentUser,
        ...action.payload,
      };
    },
    getCurrentUserSucess: (state, action) => {
      
      
    },
  },
});

export const {
  loginSuccess,

  registerSuccess,

  logOutSuccess,
  updateUserSuccess,
  getCurrentUserSucess
} = authSlice.actions;

export default authSlice.reducer;
