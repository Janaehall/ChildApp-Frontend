import React, {Component} from 'react'

export default function WithAccess(AuthorizedComponent) {
  
  return class Access extends Component {

    componentDidMount(){
      let {id} = this.props.match.params

      const reqObj = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }

      fetch('http://localhost:3000/current_user', reqObj)
      .then(resp => resp.json())
      .then(user => { 
        this.props.authUser(user)
        let children = user.children.concat(user.friends_children).map(child => child.id)
        user.error? this.props.history.push('/login')
        : children.includes(parseInt(id))? this.props.setChild(id)
        : this.props.history.push('/homepage')
      })
    }

    render(){
      return(
        <AuthorizedComponent {...this.props}/>
      )
    }
  }
}