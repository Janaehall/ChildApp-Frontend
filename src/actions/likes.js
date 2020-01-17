export const delLike = (like) => {
  // console.log(like)
  return {type: "DELETE_LIKE", like}
}

export const addLike = (like) => {
  return {type: "ADD_LIKE", like}
}
