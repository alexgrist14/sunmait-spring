let initialState = {
  login: "",
  password: "",
  isAuthenticated: false,
  error: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOGIN":
      return {
        ...state,
        login: action.payload,
        error: "",
      };
    case "SET_PASSWORD":
      return {
        ...state,
        password: action.payload,
        error: "",
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        error: "",
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        isAuthenticated: false,
        error: "Incorrect user or password",
      };
    case "LOGOUT":
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
