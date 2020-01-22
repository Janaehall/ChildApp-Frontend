export const delPostLike = (like) => {
  return {type: "DELETE_POST_LIKE", like}
}

export const addPostLike = (like) => {
  return {type: "ADD_POST_LIKE", like}
}

export const delMilestoneLike = (like) => {
  return {type: "DELETE_MILESTONE_LIKE", like}
}

export const addMilestoneLike = (like) => {
  return {type: "ADD_MILESTONE_LIKE", like}
}

