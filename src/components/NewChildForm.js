import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Form, Button, Message} from 'semantic-ui-react'
import {authUser} from '../actions/user'
import WithAuth from './auth/WithAuth'

class NewChildForm extends Component {

  state = {
    name: '',
    birthdate: null
  }

  onSubmit = e => {
    e.preventDefault()
    let childData = new FormData()
    childData.append('child[name]', this.state.name)
    childData.append('child[birthdate]', this.state.birthdate)
    childData.append('child[parent]', this.props.currentUser.id)
    if(this.state.photo) {
      childData.append('child[photo]', this.state.photo)
    }
    let reqObj = {method: 'POST', body: childData}
    this.addChild(reqObj)
  }


  addChild = reqObj => {
    fetch('http://localhost:3000/children', reqObj)
    .then(resp => resp.json())
    .then(child => {
      child.errors?
        this.setState({errors: child.errors})
      : this.props.history.push(`/${child.id}`)
    })
  }

  handleChange = e => {
    e.target.name === 'photo'?
      this.setState({photo: e.target.files[0]})
    : this.setState({[e.target.name]: e.target.value})
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


  render() {
    return(
      <div id="logInForm">
        <h1 id="timelineHeader">Add Child</h1>
        {this.renderMessages()}
      <Form onSubmit={this.onSubmit}>
        <Form.Field required>
          <label>Name</label>
          <input placeholder='Name' name="name" onChange={this.handleChange}/>
        </Form.Field>
        <Form.Field required>
          <label>Birthdate</label>
          <input type="date" name="birthdate" onChange={this.handleChange}/>
        </Form.Field>
        <Form.Field>
          <label>Add Photo</label>
          <input type="file" name="photo" onChange={this.handleChange}/>
        </Form.Field>
        <Button type='submit'>Add Child</Button>
      </Form>
      </div>

    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    authUser: user => dispatch(authUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithAuth(NewChildForm));