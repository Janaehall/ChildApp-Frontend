import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Form, Button, Message } from 'semantic-ui-react'
import {addMilestone} from '../../actions/milestones'



class MilestoneForm extends Component {

  state = {
    content: '',
    date: ''
  }

  onSubmit = e => {
    e.preventDefault()
    let child_id = this.props.match.params.id
    let {content, date } = this.state
    let reqObj = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({child_id, content, date})
    }
    this.addMilestone(reqObj)
  }


  addMilestone = reqObj => {
    fetch('http://localhost:3000/milestones', reqObj)
    .then(resp => resp.json())
    .then(milestone => {
      if(milestone.errors){
        this.setState({errors: milestone.errors})
      } else {
        this.props.addMilestone(milestone)
        this.props.history.push(`/${this.props.match.params.id}`)
      }
    })
  }


  renderMessages = () => {
    let {errors} = this.state
    return(
      errors?
        <div>{errors.map(error => <Message size="tiny" error header={error}/>)}</div>
      :null
    )
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    return(
      <div id="logInForm">
        <h1 id="timelineHeader">New Milestone</h1>
        {this.renderMessages()}
        <Form onSubmit={this.onSubmit}>
          <Form.Field required>
            <label>Date</label>
            <input placeholder='2019-11-10' name="date" onChange={this.handleChange}/>
          </Form.Field>
          <Form.Field required>
            <label>Milestone</label>
            <input placeholder="Example: Learned to walk" name="content" onChange={this.handleChange}/>
          </Form.Field>
          <Button type='submit'>Add</Button>
        </Form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addMilestone: milestone => dispatch(addMilestone(milestone))
  }
}

export default connect(null, mapDispatchToProps)(MilestoneForm);