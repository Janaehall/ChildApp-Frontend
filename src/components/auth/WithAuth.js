import React, {Component} from 'react'

export default function WithAuth(AuthorizedComponent) {
  
  return class Auth extends Component {

    componentDidMount(){
      const reqObj = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
      fetch('http://localhost:3000/current_user', reqObj)
      .then(resp => resp.json())
      .then(user => {
          user.error? this.props.history.push('/login')
          : this.props.authUser(user)
      })
    }

    render(){
      return(
        <AuthorizedComponent {...this.props} />
      )
    }
  }
}