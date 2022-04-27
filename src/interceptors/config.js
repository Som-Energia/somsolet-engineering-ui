import axiosMiddleware from "redux-axios-middleware";
import * as axios from "axios";
import { STATUS_CODE } from "../constants";
import { signOut } from "../actions/auth";

const middlewareConfig = {
  interceptors: {
    request: [
      {
        success: function ({ getState, dispatch, getSourceAction }, config) {
          const token = getState().auth.token;

          config.headers["Content-Type"] = `application/json`;

          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }

          return config;
        },
        error: function ({ getState, dispatch, getSourceAction }, error) {
          return Promise.reject(error);
        },
      },
    ],
    response: [
      {
        success: function ({ getState, dispatch, getSourceAction }, res) {
          return Promise.resolve(res);
        },
        error: function ({ getState, dispatch, getSourceAction }, request) {
          let result = request;
          const { response: { status, data } = {} } = request;

          const { isAuthenticated } = getState().auth;

          if (status === STATUS_CODE.UNAUTHORIZED && isAuthenticated)
            dispatch(signOut());

          switch (true) {
            case status === STATUS_CODE.BAD_REQUEST:
              result = {
                ...result,
                meta: {
                  code: data?.id || STATUS_CODE.BAD_REQUEST,
                  message:
                    data?.detail || `errors.generic.${STATUS_CODE.BAD_REQUEST}`,
                },
              };
              break;
            case status === STATUS_CODE.NOT_FOUND:
              result = {
                ...result,
                meta: {
                  code: data?.id || STATUS_CODE.NOT_FOUND,
                  message:
                    data?.detail || `errors.generic.${STATUS_CODE.NOT_FOUND}`,
                },
              };
              break;
            case status === STATUS_CODE.TOO_MANY_REQUESTS:
              result = {
                ...result,
                meta: {
                  code: data?.id || STATUS_CODE.TOO_MANY_REQUESTS,
                  message:
                    data?.detail ||
                    `errors.generic.${STATUS_CODE.TOO_MANY_REQUESTS}`,
                },
              };
              break;
            case status === STATUS_CODE.UNAUTHORIZED:
              result = {
                ...result,
                meta: {
                  code: data?.id || STATUS_CODE.UNAUTHORIZED,
                  message:
                    data?.detail ||
                    `errors.generic.${STATUS_CODE.UNAUTHORIZED}`,
                },
              };
              break;
            case /^5\d{2}$/.test(String(status)):
              result = {
                ...result,
                meta: {
                  code: data?.id || STATUS_CODE.INTERNAL_SERVER_ERROR,
                  message:
                    data?.detail ||
                    `errors.generic.${STATUS_CODE.INTERNAL_SERVER_ERROR}`,
                },
              };
              break;
            default:
              result = {
                ...result,
                response: request.response || {},
                request: request.response || {},
                meta: {
                  code: data?.id || STATUS_CODE.NETWORK,
                  message:
                    data?.detail || `errors.generic.${STATUS_CODE.NETWORK}`,
                },
              };
          }

          return Promise.reject(result);
        },
      },
    ],
  },
};

let instance = null;

export const axiosInstance = () => {
  instance =
    instance ||
    axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL,
      responseType: "json",
    });

  return instance;
};

const httpClientMiddleware = () =>
  axiosMiddleware(axiosInstance(), middlewareConfig);
export default httpClientMiddleware;
