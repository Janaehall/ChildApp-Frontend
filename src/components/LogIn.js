import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Button, Message, Icon } from 'semantic-ui-react'
import { logIn } from '../actions/user'

class LogIn extends Component {

  state = {
    email: 'janaeelisa@gmail.com', 
    password: 'password'
  }

  onSubmit = e => {
    e.preventDefault()
    this.props.logIn(this.state)
  }


  handleChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  renderError = () => {
    return(
      this.props.isError?
        <Message error size="tiny" header='Invalid Username or Password'/> 
      : null
    )
  }


  render() {
    return(
      <div id="logInForm">
        <h1 id="timelineHeader">Log In To MyChild</h1>
        {this.renderError()}
        <Form onSubmit={this.onSubmit}>

        <Form.Field required>
          <label>Email</label>
          <input value={this.state.email} placeholder='Email' 
            name="email" onChange={this.handleChange}/>
        </Form.Field>
        <Form.Field required>
          <label>Password</label>
          <input value={this.state.password} type="password" placeholder="password" 
            name="password" onChange={this.handleChange}/>
        </Form.Field>
        <Button type='submit'>Log In</Button>
        <Button onClick={() => this.props.history.push('/sign_up')}>Sign Up</Button>
        </Form>
      </div>

    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser.user,
    isError: state.currentUser.isError
   }
}
 
const mapDispatchToProps = dispatch => {
  return {
    logIn: (user) => dispatch(logIn(user))
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(LogIn);