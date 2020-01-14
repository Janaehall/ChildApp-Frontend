import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Form, Button, Checkbox, Message} from 'semantic-ui-react'

class NewFamilyForm extends Component {

  state = {
   email: '',
   parent: false
    }

  onSubmit = e => {
    e.preventDefault()
    let reqObj = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        family_member: this.state.email,
        child_id: this.props.child.id
      })
    }
    this.addFamily(reqObj)
  }

  addFamily = (reqObj) => {
    let route
    this.state.parent? route = "parent_children" : route = "child_families"
    fetch(`http://localhost:3000/${route}`, reqObj)
    .then(resp => resp.json())
    .then(resp => {
      resp.error? 
      this.setState({message: null, error: resp.error})
      : this.setState({error: null, message: resp.message})
    })
  }

  renderMessage = () => {
    return (
      this.state.error? <Message error size="tiny" header={this.state.error}/>
      : this.state.message? <Message success size="tiny" header={this.state.message}/>
      : null
    )
  }

  handleChange = e => {this.setState({email: e.target.value})}

  toggleParent = () => {this.setState({parent: !this.state.parent})}

  render() {
    return(
      <div id="logInForm">
        <h1 id="timelineHeader">Add Family</h1>
        {this.renderMessage()}
       <Form onSubmit={this.onSubmit}>
       <Form.Field>
         <label>User Email</label>
         <input placeholder='Email' onChange={this.handleChange} name="email"/>
       </Form.Field>
       <Form.Field>
         <Checkbox onChange={this.toggleParent} label='Parent' />
       </Form.Field>
       <Button type='submit'>Add Family</Button>
     </Form>
     </div>

    )
  }
}


 
const mapStateToProps = state => {
  return {
    child: state.child
  };
};


export default connect(mapStateToProps)(NewFamilyForm);