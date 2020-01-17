const initialState = {
  id: null,
  name: null,
  birthdate: null,
  milestones: [],
  posts: [],
  videos: [],
  hasFetched: false,
  isFetching: false
};

const childReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCHED_CHILD":
      let {id, name, birthdate, posts, milestones, familyMembers, photo, age, birthday, videos} = action.child
      return {...state,
        id,
        name,
        birthdate,
        age,
        birthday,
        photo,
        posts,
        videos,
        milestones,
        familyMembers,
        hasFetched: true,
        isFetching: false
      }
      case "FETCH_CHILD":
        return {...state, 
          hasFetched: false,
          isFetching: true
        }
      case "EDIT_CHILD":
        return {...state, 
          name: action.child.name, 
          birthdate: action.child.birthdate, 
          birthday: action.child.birthday, 
          age: action.child.age
        }
      case "ADD_POST":
        return {...state, posts: [...state.posts, action.post]}
      case "ADD_MILESTONE":
        return {...state, milestones: [...state.milestones, action.milestone]}
      case "ADD_VIDEO":
        console.log(action.video)
        return {...state, videos: [...state.videos, action.video]}
      case "ADD_COMMENT":
        return {...state,
          posts: state.posts.map(post => {
            return post.id === action.comment.post_id?
              {...post, comments: [...post.comments, action.comment]}
            : post
          })
        }
      case "EDIT_COMMENT":
          return {...state,
            posts: state.posts.map(post => {
              return post.id === action.comment.post_id?
                {...post,
                  comments: post.comments.map(comment => {
                    return comment.id === action.comment.id? action.comment : comment
                  })}
              : post
            })
          }
      case "DELETE_COMMENT":
        return {...state,
          posts: state.posts.map(post => {
            return post.id === action.post_id?
              {...post,
                comments: post.comments.filter(comment => comment.id !== action.comment_id)
              }
            : post
          })
        }
      case "DELETE_LIKE":
          return {...state,
            posts: state.posts.map(post => {
              return post.id === action.like.post_id
                ? {...post, likes: post.likes.filter(like => like.id !== action.like.id)}
                : post
            })
          }
      case "ADD_LIKE":
        return {...state,
          posts: state.posts.map(post => {
            return post.id === action.like.post_id?
              {...post, likes: [...post.likes, action.like]}
            : post
          })
        }
      case "DELETE_POST":
        return {...state, posts: state.posts.filter(post => post.id !== action.post_id)}
      case "EDIT_POST":
        return {...state, posts: state.posts.map(post => post.id === action.post.id? action.post : post)}
      case "EDIT_MILESTONE":
        return {...state,
          milestones: state.milestones.map(milestone => milestone.id === action.milestone.id? action.milestone : milestone)  
        }
      case "DELETE_MILESTONE":
        return {...state,
          milestones: state.milestones.filter(milestone => milestone.id !== action.milestone_id)  
        }
      case "RECEIVE_ERROR":
        return {...state, isError: true, hasFetched: false, isFetching: false}
      case "CLEAR_CHILD":
        return initialState;
     default:
        return state;
    }
};

export default childReducer