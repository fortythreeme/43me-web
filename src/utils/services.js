import axios from 'axios';
import { loginFailure,loginSuccess,loginStart,signupFailure,signupStart,signupSuccess } from '@/store/user/userSlice';


export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_APP}auth/login`, user);
      console.log(res.data.data,'data')
      dispatch(loginSuccess(res.data));
      console.log(res.data)
      return res.data; // Return the response data
    } catch (err) {
      dispatch(loginFailure()); // Dispatch with an error type
      throw err; // Return the error object
    }
  };
  export const signUp = async (dispatch, user) => {
    dispatch(signupStart());
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_APP}auth/register`, user);
      console.log(res.data.data,'data')
      dispatch(signupSuccess(res.data));
      console.log(res.data)
      return res.data; // Return the response data
    } catch (err) {
      dispatch(signupFailure()); // Dispatch with an error type
      throw err; // Return the error object
    }
  };