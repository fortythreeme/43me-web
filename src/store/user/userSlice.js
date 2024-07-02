import { createSlice } from '@reduxjs/toolkit'


export const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    isAuthenticated:false,
    daysLeft:null
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.isAuthenticated = true;
      state.currentUser = action.payload.data;  state.error = false;
      state.daysLeft=action.payload.data.days_left
      // console.log(state.currentUser,'action')
    //   state.firebaseToken = action.payload.idToken
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
      // state.loginErrorType = action.payload;
    },
    
    signupStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    signupSuccess: (state, action) => {
      state.isFetching = false;
      state.isAuthenticated = true;
      state.daysLeft=action.payload.data.days_left
      state.currentUser = action.payload.data;
    },
    signupFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    setUser: (state, action) => {
      // console.log(action.payload,'data')
      state.currentUser = action.payload ;
      state.isAuthenticated = true;

    }, 
    updateDaysLeft: (state, action) => {
      state.daysLeft = action.payload;
    },   logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
    },
  }
})

export const { setUser,updateDaysLeft, logout, signupStart, signupSuccess, signupFailure, loginFailure , loginSuccess , loginStart } = userSlice.actions

export default userSlice.reducer