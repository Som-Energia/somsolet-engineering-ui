export const TOKEN_KEY = "token";

// wiki: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
export const STATUS_CODE = {
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TOO_MANY_REQUESTS: 429,
  NETWORK: 0,
};

export const CANCEL_ACTION_REQUESTS = "CANCEL_ACTION_REQUESTS";
export const CANCEL_ALL_ACTION_REQUESTS = "CANCEL_ALL_ACTION_REQUESTS";
export const CANCEL_DATA = { cancelled: true };
