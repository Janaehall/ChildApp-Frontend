import React, {Component} from 'react'
import {Form, Button} from 'semantic-ui-react'



class EditMilestoneForm extends Component {

  state = {
    milestone: this.props.milestone
  }

  onSubmit = e => {
    e.preventDefault()
    this.props.editMilestone(this.state.milestone)
    this.props.toggleEditing()
  }

  handleChange = e => {
    this.setState({
      milestone: {...this.state.milestone, [e.target.name]: e.target.value}
    })
  }

  render() {
    return(
          <Form onSubmit={this.onSubmit}>
          <Form.Field>
            <label>Date</label>
            <input value={this.state.milestone.date} name="date" type="date" onChange={this.handleChange}/>
          </Form.Field>
          <Form.Field>
            <label>Milestone</label>
            <input value={this.state.milestone.content} name="content" onChange={this.handleChange}/>
          </Form.Field>
          <Button type='submit'>Add</Button>
        </Form>
    )
  }
}

export default EditMilestoneForm