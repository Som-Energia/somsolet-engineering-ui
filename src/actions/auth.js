import * as CONSTANTS from "./../constants";
import PATHS from "../paths";
import { fetchCampaigns } from "./campaigns";
import jwt_decode from "jwt-decode";
import {
  getCookie,
  getLocalStorage,
  removeCookie,
  removeLocalStorage,
  removeSessionStorage,
  setCookie,
  setLocalStorage,
} from "../utils/storage";

export const checkUserIsLogged = () => (dispatch) => {
  const token =
    getCookie(CONSTANTS.TOKEN_KEY) || getLocalStorage(CONSTANTS.TOKEN_KEY);

  if (token) {
    dispatch({ type: "SAVE_TOKEN", payload: token });
    dispatch(decodeUserToken(token));
    dispatch(fetchUser());
    dispatch(fetchCampaigns());
  } else {
    dispatch({ type: "RESET_USER" });
  }
};

export const decodeUserToken = (token) => {
  const { email, username, name, user_id } = jwt_decode(token);

  return {
    type: "DECODE_USER_TOKEN",
    payload: { email, username, name, user_id },
  };
};

export const setToken = ({ token, remember = false }) => {
  if (remember) {
    setCookie(CONSTANTS.TOKEN_KEY, token, { expires: 365 });
  } else {
    setLocalStorage(CONSTANTS.TOKEN_KEY, token);
  }

  return {
    type: "SAVE_TOKEN",
    payload: token,
  };
};

export const signIn =
  ({ username, password, remember }, navigate) =>
  async (dispatch) => {
    const action = await dispatch(fetchSignIn({ username, password }));

    if (action.type === "SIGN_IN_SUCCESS" && !action.error) {
      const { access: token } = action.payload.data;
      dispatch(setToken({ token, remember }));
      navigate(PATHS.CAMPAIGNS);
    } else if (action.type === "SIGN_IN_FAIL") {
      const error = action.error.meta;
      console.error(error);
    }

    return action;
  };

export const fetchUser = () => ({
  type: "FETCH_USER",
  payload: {
    request: {
      method: "GET",
      url: "https://run.mocky.io/v3/9444e1ca-c196-4455-962a-07637212e472",
    },
  },
});

export const fetchSignIn = ({ username, password }) => ({
  type: "SIGN_IN",
  payload: {
    request: {
      method: "POST",
      url: "/api/token/",
      data: {
        username,
        password,
      },
    },
  },
});

export const signOut = () => async (dispatch) => {
  dispatch(resetUser());

  window.location.href = "/signin";
};

export const resetUser = () => {
  removeCookie(CONSTANTS.TOKEN_KEY);
  removeLocalStorage(CONSTANTS.TOKEN_KEY);
  removeSessionStorage(CONSTANTS.TOKEN_KEY);

  return {
    type: "RESET_USER",
  };
};
