import axios from "axios";
import {
  USER_SIGN_IN_FAIL,
  USER_SIGN_IN_REQUEST,
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_OUT,
  USER_SIGN_UP_FAIL,
  USER_SIGN_UP_REQUEST,
  USER_SIGN_UP_SUCCESS,
} from "../constants/userConstants";

export const signIn = (email, password) => async (dispatch) => {
  dispatch({
    type: USER_SIGN_IN_REQUEST,
    payload: { email, password },
  });
  try {
    const { data } = await axios.post("api/users/signIn", { email, password });
    dispatch({ type: USER_SIGN_IN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGN_IN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signOut = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
  localStorage.removeItem("shippingAddress");
  localStorage.removeItem("paymentMethod");
  dispatch({ type: USER_SIGN_OUT });
};

export const signUp = (name, email, password) => async (dispatch) => {
  dispatch({
    type: USER_SIGN_UP_REQUEST,
    payload: { name, email, password },
  });
  try {
    const { data } = await axios.post("api/users/signUp", {
      name,
      email,
      password,
    });
    dispatch({ type: USER_SIGN_UP_SUCCESS, payload: data });
    dispatch({ type: USER_SIGN_IN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGN_UP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
