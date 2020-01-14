import {history} from './history'

export const authUser = user => {
  return {
    type: "AUTH_USER",
    user: user
  }
}

export const receiveUserError = () => {
  return {
    type: "RECEIVE_USER_ERROR"
  }
}

export function logIn(user){
  return function(dispatch) {
    const reqObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password
      })
    }

    fetch(`http://localhost:3000/auth`, reqObj)
    .then(resp => resp.json())
    .then(user => {
      if(user.error){
      dispatch(receiveUserError())
    } else {
      dispatch(authUser(user))
      localStorage.setItem('token', user.token)
      history.push('/homepage')
    }
    })
  }
}
