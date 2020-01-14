import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Form, Button, Message} from 'semantic-ui-react'
import {logIn} from '../actions/user'

class SignUp extends Component {

  state = {
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  }

  onSubmit = e => {
    e.preventDefault()
    let userData = new FormData()
    userData.append('user[name]', this.state.name)
    userData.append('user[email]', this.state.email)
    userData.append('user[password]', this.state.password)
    userData.append('user[password_confirmation]', this.state.password_confirmation)
    if(this.state.profile_pic) {
      userData.append('user[profile_pic]', this.state.profile_pic)
    }
    let reqObj = {
      method: 'POST',
      body: userData
      }
    this.createUser(reqObj)
  }


  createUser = reqObj => {
    fetch(`http://localhost:3000/users`, reqObj)
    .then(resp => resp.json())
    .then(user => {
      user.errors?
        this.setState({errors: user.errors})
      : this.props.logIn({email: user.email, password: this.state.password})
    })
  }

  renderMessages = () => {
    return(
      this.state.errors?
        <div>
          {this.state.errors.map(error => <Message size="tiny" error header={error}/>)}
        </div>
      :null
    )
  }

  handleChange = e => {
    e.target.name === 'profile_pic'?
      this.setState({profile_pic: e.target.files[0]})
    : this.setState({[e.target.name]: e.target.value})
  }


  render() {
    return(
      <div id="logInForm">
        <h1 id="timelineHeader">Sign Up To MyChild</h1>
        {this.renderMessages()}
      <Form onSubmit={this.onSubmit}>
        <Form.Field>
         <label>Name</label>
         <input placeholder='Name' onChange={this.handleChange} name="name"/>
       </Form.Field>
       <Form.Field>
         <label>Email</label>
         <input placeholder='Email' onChange={this.handleChange} name="email"/>
       </Form.Field>
       <Form.Field>
         <label>Password</label>
         <input placeholder='Password' type="password" onChange={this.handleChange} name="password"/>
       </Form.Field>
       <Form.Field>
         <label>Confirm Password</label>
         <input placeholder='Confirm Password' type="password" onChange={this.handleChange} name="password_confirmation"/>
       </Form.Field>
       <Form.Field>
         <label>Add Profile Picture</label>
        <input type="file" name="profile_pic" onChange={this.handleChange}/>
       </Form.Field>
       <Button type='submit'>Sign Up</Button>
      </Form>
      </div>

    )
  }
}


 
const mapDispatchToProps = dispatch => {
  return {
    logIn: (user) => dispatch(logIn(user))
  };
};


 
export default connect(null,mapDispatchToProps)(SignUp);