let initialState = {
  login: "",
  password: "",
  isAuthenticated: false,
  isRefreshingToken: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOGIN":
      return {
        ...state,
        login: action.payload,
      };
    case "SET_PASSWORD":
      return {
        ...state,
        password: action.payload,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        isAuthenticated: false,
      };
    case "LOGOUT":
      return initialState;
    case "SET_REFRESHING_TOKEN":
      return {
        ...state,
        isRefreshingToken: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
