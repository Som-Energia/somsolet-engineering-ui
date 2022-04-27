import * as CONSTANTS from "./../constants";
import PATHS from "../paths";
import { fetchCampaigns } from "./campaigns";
import {
  getCookie,
  getLocalStorage,
  removeCookie,
  removeLocalStorage,
  removeSessionStorage,
  setCookie,
  setLocalStorage,
} from "../utils/storage";

export const checkUserIsLogged = (token) => (dispatch) => {
  token =
    token ||
    getCookie(CONSTANTS.TOKEN_KEY) ||
    getLocalStorage(CONSTANTS.TOKEN_KEY);

  if (token) {
    dispatch({ type: "SAVE_TOKEN", payload: token });
    dispatch(fetchCampaigns({ token }));
  } else {
    dispatch({ type: "RESET_USER" });
    window.location.href(PATHS.SIGNIN);
  }
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
  ({ username, password, remember }) =>
  async (dispatch) => {
    const action = await dispatch(fetchSignIn({ username, password }));

    if (action.type === "SIGN_IN_SUCCESS" && !action.error) {
      const { access: token } = action.payload.data;
      dispatch(setToken({ token, remember }));
      window.location.href = PATHS.CAMPAIGNS;
    } else if (action.type === "SIGN_IN_FAIL") {
      const error = action.error.meta;
      console.error(error);
    }

    return action;
  };

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
  dispatch(logOut());

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

export const logOut = () => ({
  type: "LOG_OUT",
  payload: null,
});
