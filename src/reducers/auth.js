export const initialState = {
  isLoading: false,
  user: null,
  language: null,
  error: null,
  token: null,
  isAuthenticated: false,
};

const reducer = (state = initialState, { type, payload, ...action }) => {
  switch (type) {
    case "FETCH_USER":
    case "SIGN_IN":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_USER_SUCCESS":
      return {
        ...state,
        isLoading: false,
        user: { ...state.user, ...payload.data },
        language: payload.data.language,
      };
    case "SIGN_IN_SUCCESS":
      return {
        ...state,
        isLoading: false,
        token: payload.data.access,
        isAuthenticated: true,
      };
    case "DECODE_USER_TOKEN":
      return {
        ...state,
        user: payload,
      };
    case "FETCH_USER_FAIL":
    case "SIGN_IN_FAIL":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        error: payload.error,
      };
    case "SAVE_TOKEN":
      return {
        ...state,
        isAuthenticated: true,
        token: payload,
      };
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
