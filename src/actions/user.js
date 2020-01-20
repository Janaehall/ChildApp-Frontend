import { history } from './history'
import { setErrors } from './errors'

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

export function submitUser(newUser){
  return function(dispatch){
    let userData = new FormData()
    userData.append('user[name]', newUser.name)
    userData.append('user[email]', newUser.email)
    userData.append('user[password]', newUser.password)
    userData.append('user[password_confirmation]', newUser.password_confirmation)
    if(newUser.profile_pic) {
      userData.append('user[profile_pic]', newUser.profile_pic)
    }
    fetch(`http://localhost:3000/users`, {method: 'POST', body: userData})
    .then(resp => resp.json())
    .then(user => {
      user.errors
        ? dispatch(setErrors(user.errors))
        : dispatch(logIn({email: newUser.email, password: newUser.password}))
    })
  }
}

export const editChildren = (child) => {
  return {
    type: "EDIT_CHILDREN",
    child
  }
}

// onSubmit = e => {
//   e.preventDefault()
//   let userData = new FormData()
//   userData.append('user[name]', this.state.name)
//   userData.append('user[email]', this.state.email)
//   userData.append('user[password]', this.state.password)
//   userData.append('user[password_confirmation]', this.state.password_confirmation)
//   if(this.state.profile_pic) {
//     userData.append('user[profile_pic]', this.state.profile_pic)
//   }
//   this.createUser({method: 'POST', body: userData})
// }


// createUser = reqObj => {
//   fetch(`http://localhost:3000/users`, reqObj)
//   .then(resp => resp.json())
//   .then(user => {
//     user.errors
//       ? this.setState({errors: user.errors})
//       : this.props.logIn({email: user.email, password: this.state.password})
//   })
// }