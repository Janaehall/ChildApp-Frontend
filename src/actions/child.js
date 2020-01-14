
export const receivedChild = child => {
  return {
    type: "FETCHED_CHILD",
    child
  }
}

export const fetchchild = () => {
  return {
    type: "FETCH_CHILD"
  }
}

export const delChild = () => {
  return {
    type: "DELETE_CHILD"
  }
}


export function setChild(id){
  return function(dispatch) {
    dispatch(fetchchild())
    fetch(`http://localhost:3000/children/${id}`)
    .then(resp => resp.json())
    .then(child=> {
      dispatch(receivedChild(child))
    })
  }
}


