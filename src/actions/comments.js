import {setErrors, clearErrors} from './errors'

export const addPostComment = (comment) => {
  return {
    type: "ADD_POST_COMMENT",
    comment
  }
}

export const addMilestoneComment = (comment) => {
  return {
    type: "ADD_MILESTONE_COMMENT",
    comment
  }
}

export const deletePostComment = (post_id, comment_id) => {
  return {
    type: "DELETE_POST_COMMENT",
    comment_id,
    post_id
  }
}

export const deleteMilestoneComment = (milestone_id, comment_id) => {
  return {
    type: "DELETE_MILESTONE_COMMENT",
    comment_id,
    milestone_id
  }
}

export function delComment(type, commentable_id, comment_id){
  return function(dispatch) {
    fetch(`http://localhost:3000/comments/${comment_id}`, {'method': 'DELETE'})
    .then(resp => {
      type==="Post" 
        ? dispatch(deletePostComment(commentable_id, comment_id))
        : dispatch(deleteMilestoneComment(commentable_id, comment_id))
    })
  }
}

export function postComment(type, comment){
  return function(dispatch){
    let { userId, commentableId, content } = comment
    let reqObj = {
      'method': 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        content,
        user_id: userId,
        commentable_id: commentableId,
        commentable_type: type
      })
    }
    fetch(`http://localhost:3000/comments`, reqObj)
    .then(resp => resp.json())
    .then(comment => {
      if(comment.error){
        dispatch(setErrors([comment.error]))
      } else {
        type === "Post" ? dispatch(addPostComment(comment)) : dispatch(addMilestoneComment(comment))
        dispatch(clearErrors())
      }
    })
  }
}

export function patchComment(type, comment){
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
        type === "Post" ? dispatch(editPostComment(comment)) : dispatch(editMilestoneComment(comment))
        dispatch(clearErrors())
      }
    })
  }
}

export const editPostComment = (comment) => {
  return {
    type: "EDIT_POST_COMMENT",
    comment
  }
}

export const editMilestoneComment = (comment) => {
  return {
    type: "EDIT_MILESTONE_COMMENT",
    comment
  }
}
