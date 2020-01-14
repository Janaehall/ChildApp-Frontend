
const initialState = {
  user: {},
  access: false,
  hasFetched: false,
  isError: false,
  children: [],
  friendsChildren: []
};

const currentUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTH_USER":
      return {
        user: {
          id: action.user.id, 
          name: action.user.name, 
          profile_pic: action.user.profile_pic
        },
        hasFetched: true,
        isError: false,
        friendsChildren: action.user.friends_children,
        children: action.user.children
      }
    case "RECEIVE_USER_ERROR":
      return Object.assign({}, state, {
        isError: true,
        hasFetched: false
      })
    case "SIGN_OUT":
      return initialState 
    default:
      return state;
  }
};

export default currentUserReducer