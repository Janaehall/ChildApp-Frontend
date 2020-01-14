const initialState = {
  id: null,
  name: null,
  birthdate: null,
  milestones: [],
  posts: [],
  hasFetched: false,
  isFetching: false
};

const childReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCHED_CHILD":
      let {id, name, birthdate, posts, milestones, familyMembers, photo, age, birthday} = action.child
      return Object.assign({}, state,{
        id,
        name,
        birthdate,
        age,
        birthday,
        photo,
        posts,
        milestones,
        familyMembers,
        hasFetched: true,
        isFetching: false
      })
      case "FETCH_CHILD":
        return Object.assign({}, state, {
          hasFetched: false,
          isFetching: true
        })
      case "ADD_POST":
        return Object.assign({}, state, {
          posts: [...state.posts, action.post]
        })
      case "ADD_MILESTONE":
        return Object.assign({}, state, {
          milestones: [...state.milestones, action.milestone]
        })
      case "ADD_COMMENT":
        return Object.assign({}, state, {
          posts: state.posts.map(post => {
            return post.id === action.post_id?
              {...post, comments: [...post.comments, action.comment]}
            : post
          })
        })
      case "DELETE_COMMENT":
        return Object.assign({}, state, {
          posts: state.posts.map(post => {
            return post.id === action.post_id?
              {...post,
                comments: post.comments.filter(comment => comment.id !== action.comment_id)
              }
            : post
          })
        })
      case "DELETE_LIKE":
          return Object.assign({}, state, {
            posts: state.posts.map(post => {
              return post.id === action.postId?
                {...post,
                  likes: post.likes.filter(like => like.id !== action.likeId)
                }
              : post
            })
          })
      case "ADD_LIKE":
        console.log(action.like)
        return Object.assign({}, state, {
          posts: state.posts.map(post => {
            return post.id === action.like.post_id?
              {...post, likes: [...post.likes, action.like]}
            : post
          })
        })
      case "DELETE_POST":
        return Object.assign({}, state, {
          posts: state.posts.filter(post => post.id !== action.post_id)  
        })
      case "EDIT_POST":
        return Object.assign({}, state, {
          posts: state.posts.map(post => post.id === action.post.id? action.post : post)  
        })
      case "EDIT_MILESTONE":
        return Object.assign({}, state, {
          milestones: state.milestones.map(milestone => milestone.id === action.milestone.id? action.milestone : milestone)  
        })
      case "DELETE_MILESTONE":
        return Object.assign({}, state, {
          milestones: state.milestones.filter(milestone => milestone.id !== action.milestone_id)  
        })
      case "RECEIVE_ERROR":
        return Object.assign({}, state, {
          isError: true,
          hasFetched: false,
          isFetching: false
        })
      case "DELETE_CHILD":
        return initialState;
     default:
        return state;
    }
};

export default childReducer