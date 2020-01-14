const initialState = null


const currentUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ERRORS":
      return action.errors
   case "CLEAR_ERRORS":
      return initialState
    default:
      return state;
  }
};

export default currentUserReducer