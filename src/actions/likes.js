export const delLike = (postId, likeId) => {
  return {type: "DELETE_LIKE", postId, likeId}
}

export const addLike = (like) => {
  return {type: "ADD_LIKE", like}
}
