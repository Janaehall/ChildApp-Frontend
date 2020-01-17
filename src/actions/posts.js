import {history} from './history'
import {setErrors} from './errors'

export function editPost(post){
  return function(dispatch) {
    let reqObj = {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({content: post.content})
    }
    fetch(`http://localhost:3000/posts/${post.id}`, reqObj)
    .then(resp => resp.json())
    .then(post => dispatch(editThisPost(post)))
  }
}

export function delPost(post_id){
  return function(dispatch) {
    fetch(`http://localhost:3000/posts/${post_id}`, {'method': 'DELETE'})
    .then(resp => dispatch(deletePost(post_id)))
  }
}

export const editThisPost = post => {
  return {
    type: "EDIT_POST",
    post
  }
}

export const deletePost = (post_id) => {
  return {
    type: "DELETE_POST",
    post_id
  }
}

export const addPost = post => {
  return {
    type: "ADD_POST",
    post
  }
}

export function postPost(post) {
  return function(dispatch){
  let postData = new FormData()
  let {childId, userId, content, photos} = post
  postData.append('post[child_id]', childId)
  postData.append('post[user_id]', userId)
  postData.append('post[content]', content)
  for(let i=0; i < photos.length; i++){
    postData.append('post[photos][]', photos[i])
  }
  let reqObj = {method: 'POST', body: postData}
  fetch('http://localhost:3000/posts', reqObj)
    .then(resp => resp.json())
    .then(post => {
      if(post.errors){
        dispatch(setErrors(post.errors))
      } else {
        dispatch(addPost(post))
        history.push(`/${childId}`)
      }
    })
  }
}

