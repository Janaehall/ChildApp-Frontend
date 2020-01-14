import {setErrors, clearErrors} from './errors'
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
