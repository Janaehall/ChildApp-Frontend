import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Button, Message } from 'semantic-ui-react'
import { postMilestone } from '../../actions/milestones'
import { clearErrors } from '../../actions/errors'



class MilestoneForm extends Component {
  state = {
    content: '',
    date: ''
  }


  componentWillUnmount(){
    this.props.clearErrors()
  }


  onSubmit = e => {
    e.preventDefault()
    this.props.postMilestone({childId: this.props.match.params.id, ...this.state})
  }


  renderMessages = () => {
    let { errors } = this.props
    return errors
      ? <div>{errors.map(error => <Message size="tiny" error header={error}/>)}</div>
      : null
  }


  handleChange = e => this.setState({[e.target.name]: e.target.value})


  render() {
    return(
      <div id="logInForm">
        <h1 id="timelineHeader">New Milestone</h1>
        {this.renderMessages()}
        <Form onSubmit={this.onSubmit}>
          <Form.Field required>
            <label>Date</label>
            <input type="date" name="date" onChange={this.handleChange}/>
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


const mapStateToProps = state => {
  return {
    errors: state.errors
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postMilestone: milestone => dispatch(postMilestone(milestone)),
    clearErrors: () => dispatch(clearErrors())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MilestoneForm);