import React, { Component } from 'react'
import ParentalAccess from './ParentalAccess'

export default function WithAccess(AuthorizedComponent) {
  
  return class Access extends Component {

    componentDidMount(){
      let { id } = this.props.match.params
      let  { history, authUser, setChild } = this.props
      const reqObj = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }


      fetch('http://localhost:3000/current_user', reqObj)
      .then(resp => resp.json())
      .then(user => { 
        authUser(user)
        let children = user.children.concat(user.friends_children).map(child => child.id)
        if(user.error){
          history.push('/login')
        } else if(children.includes(parseInt(id))){
          setChild(id)
          if(/new_post|new_milestone|add_family|add_video|edit_child/.test(this.props.location.pathname) && !ParentalAccess(user, {id: parseInt(id)})){
            history.push(`/${id}`)
          }
        } else {
          history.push('/homepage')
        }
      })
    }
    

    render(){
      return(
        <AuthorizedComponent {...this.props}/>
      )
    }
  }
}