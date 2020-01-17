import {setErrors, clearErrors} from './errors'

export const addComment = (comment) => {
  console.log(comment)
  return {
    type: "ADD_COMMENT",
    comment
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

export function postComment(comment){
  return function(dispatch){
    let { userId, postId, content } = comment
    let reqObj = {
      'method': 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        content,
        user_id: userId,
        post_id: postId
      })
    }
    fetch(`http://localhost:3000/comments`, reqObj)
    .then(resp => resp.json())
    .then(comment => {
      if(comment.error){
        dispatch(setErrors([comment.error]))
      } else {
        dispatch(addComment(comment))
        dispatch(clearErrors())
      }
    })
  }
  // this.postComment(reqObj)
}

export function patchComment(comment){
  return function(dispatch){
    let { content, id } = comment
    let reqObj = {
      'method': 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({content})
    }
    fetch(`http://localhost:3000/comments/${id}`, reqObj)
    .then(resp => resp.json())
    .then(comment => {
      if(comment.error){
        dispatch(setErrors([comment.error]))
      } else {
        dispatch(editComment(comment))
        dispatch(clearErrors())
      }
    })
  }
}

export const editComment = (comment) => {
  return {
    type: "EDIT_COMMENT",
    comment
  }
}
