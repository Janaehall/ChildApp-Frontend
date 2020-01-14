export const addComment = (post_id, comment) => {
  return {
    type: "ADD_COMMENT",
    comment,
    post_id
  }
}

export const deleteComment = (post_id, comment_id) => {
  return {
    type: "DELETE_COMMENT",
    comment_id,
    post_id
  }
}

export function delComment(post_id, comment_id){
  return function(dispatch) {
    fetch(`http://localhost:3000/comments/${comment_id}`, {'method': 'DELETE'})
    .then(resp => dispatch(deleteComment(post_id, comment_id)))
  }
}