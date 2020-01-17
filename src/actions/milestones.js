import {setErrors} from './errors'
import {history} from './history'

export const addMilestone = milestone => {
  return {
    type: "ADD_MILESTONE",
    milestone
  }
}

export const editThisMilestone = milestone => {
  return {
    type: "EDIT_MILESTONE",
    milestone
  }
}

export const deleteMilestone = (milestone_id) => {
  return {
    type: "DELETE_MILESTONE",
    milestone_id
  }
}

export function delMilestone(milestone_id){
  return function(dispatch) {
    fetch(`http://localhost:3000/milestones/${milestone_id}`, {'method': 'DELETE'})
    .then(resp => dispatch(deleteMilestone(milestone_id)))
  }
}

export function editMilestone(milestone){
  return function(dispatch) {
    let reqObj = {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({content: milestone.content, date: milestone.date})
    }
    fetch(`http://localhost:3000/milestones/${milestone.id}`, reqObj)
    .then(resp => resp.json())
    .then(milestone => dispatch(editThisMilestone(milestone)))
  }
}

export function postMilestone(milestone){
  console.log(milestone)
  return function(dispatch){
    let { childId, content, date } = milestone
    let reqObj = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({child_id: childId, content, date})
    }
    fetch(`http://localhost:3000/milestones`, reqObj)
    .then(resp => resp.json())
    .then(milestone => {
      if(milestone.errors){
        dispatch(setErrors(milestone.errors))
      } else {
        dispatch(addMilestone(milestone))
        history.push(`/${milestone.child_id}`)
      }
    })
  }
}

