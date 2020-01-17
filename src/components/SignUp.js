import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Form, Button, Message} from 'semantic-ui-react'
import { submitUser } from '../actions/user'

class SignUp extends Component {

  state = {
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  }

  onSubmit = e => {
    e.preventDefault()
    this.props.submitUser(this.state)
  }
  
  renderMessages = () => {
    let { errors } = this.props
    return(
      errors
        ? <div>
            {errors.map(error => <Message size="tiny" error header={error}/>)}
          </div>
        : null
    )
  }

  handleChange = e => {
    e.target.name === 'profile_pic'
      ? this.setState({profile_pic: e.target.files[0]})
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

const mapStateToProps = state => {
  return {
    errors: state.errors
  };
};


 
const mapDispatchToProps = dispatch => {
  return {
    submitUser: (user) => dispatch(submitUser(user))
  };
};


 
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);