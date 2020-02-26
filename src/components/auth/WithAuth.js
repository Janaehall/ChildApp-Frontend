import React, { Component } from 'react'

export default function WithAuth(AuthorizedComponent) {
  
  return class Auth extends Component {

    componentDidMount(){
      let { history, authUser } = this.props
      const reqObj = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
      fetch('http://localhost:3000/current_user', reqObj)
      .then(resp => resp.json())
      .then(user => {
        console.log(user)
        user.error ? history.push('/login') : authUser(user)})
    }
    

    render(){
      return(
        <AuthorizedComponent {...this.props} />
      )
    }
  }
}