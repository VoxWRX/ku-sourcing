const AuthReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN": {
        return {
          currentUser: action.payload,
        };
      }
      case "LOGOUT": {
        return {
          currentUser: null,
        };
      }
      case "SET_USER_INFO": {
        return {
          ...state,
          currentUser: action.payload, 
        };
      }
      default:
        return state;
    }
  };
  
  export default AuthReducer;