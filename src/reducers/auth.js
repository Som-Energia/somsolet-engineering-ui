export const initialState = {
  isLoading: false,
  user: null,
  error: null,
  token: null,
  isAuthenticated: false,
};

const reducer = (state = initialState, { type, payload, ...action }) => {
  switch (type) {
    case "SIGN_IN":
      return {
        ...state,
        isLoading: true,
      };
    case "SIGN_IN_SUCCESS":
      return {
        ...state,
        isLoading: false,
        token: payload.data.access,
        isAuthenticated: true,
      };
    case "SIGN_IN_FAIL":
      return {
        ...state,
        isLoading: false,
        error: payload.error,
      };
    case "SAVE_TOKEN":
      return {
        ...state,
        isAuthenticated: true,
        token: payload,
      };
    case "LOG_OUT":
    case "RESET_USER":
      return {
        ...initialState,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default reducer;
