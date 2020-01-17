import React, {Component} from 'react'
import {connect} from 'react-redux'
import WithAuth from './auth/WithAuth'
import {authUser} from '../actions/user'
import {Link} from 'react-router-dom'

class Homepage extends Component {
  render(){
    return(
      <div id="homepage">
        <img src={process.env.PUBLIC_URL + '/download.png'} />
        <h3>Welcome to My Child! <br/> This app allows you to share your share your child's important moments and photos
        with loved ones. 
        <br/>
        Click <Link to="/add_child">Here</Link> to add a new child</h3>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    authUser: user => dispatch(authUser(user))
  }
}

export default connect(null, mapDispatchToProps)(WithAuth(Homepage))
