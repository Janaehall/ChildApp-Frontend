import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { editChild } from '../actions/child'
import { editChildren } from '../actions/user'
import { connect } from 'react-redux'



class EditChildForm extends Component {
  constructor(props){
    super(props)
    let { id, name, birthdate } = this.props.child
    this.state = {
      child: {id, name, birthdate}
    }
  }

  componentDidUpdate(prevProps, prevState){
    let { id, name, birthdate } = this.props.child
    if(!prevState.child.id && id){
      this.setState({child: {id, name, birthdate}})
    }
  }
 
  onSubmit = e => {
    e.preventDefault()
    this.props.editChild(this.state.child)
    this.props.editChildren(this.state.child)
  }

  handleChange = e => {
    this.setState({
      child: {...this.state.child, [e.target.name]: e.target.value}
    })
  }

  render() {
    let { name, birthdate } = this.state.child
      return(
        <div id="logInForm">
        <h1 id="timelineHeader">Edit {this.props.child.name}</h1>
        <Form onSubmit={this.onSubmit}>
          <Form.Field required>
            <label>Name</label>
            <input value={name} name="name" onChange={this.handleChange}/>
          </Form.Field>
          <Form.Field required>
            <label>Birthdate</label>
            <input value={birthdate} type="date" name="birthdate" onChange={this.handleChange}/>
          </Form.Field>
          <Button type='submit'>Update Child</Button>
        </Form>
        </div>
  
      )
  }
}

const mapStateToProps = state => {
  return {
    child: state.child
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editChild: child =>dispatch(editChild(child)),
    editChildren: child =>dispatch(editChildren(child))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditChildForm)