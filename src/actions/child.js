import { history } from './history'
import { deleteChild } from './user'


export const receivedChild = child => {
  return {
    type: "FETCHED_CHILD",
    child
  }
}

export const clearChild = () => {
  return {
    type: "CLEAR_CHILD"
  }
}

export const fetchchild = () => {
  return {
    type: "FETCH_CHILD"
  }
}

export const editThisChild = child => {
  return {
    type: "EDIT_CHILD",
    child
  }
}


export function setChild(id){
  return function(dispatch) {
    dispatch(fetchchild())
    fetch(`http://localhost:3000/children/${id}`)
    .then(resp => resp.json())
    .then(child=> {
      child.error
      ? history.push("/homepage")
      : dispatch(receivedChild(child))
    })
  }
}

export function editChild(child){
  return function(dispatch){
    let {name, birthdate, id} = child
    let reqObj = {
      method: 'PATCH', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name, birthdate})
    }
    fetch(`http://localhost:3000/children/${id}`, reqObj)
    .then(resp => resp.json())
    .then(child => dispatch(editThisChild(child)))
  }
}

export function delChild(child){
  return function(dispatch){
  fetch(`http://localhost:3000/children/${child.id}`, {method: "DELETE"})
  .then(resp => dispatch(deleteChild(child)))
  }
}


