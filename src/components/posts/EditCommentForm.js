import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'


class EditCommentForm extends Component {
  state = { 
    comment: this.props.comment
  }

  handleChange = e => this.setState({comment: {...this.state.comment, content: e.target.value}})

  onSubmit = e => {
    e.preventDefault()
    this.props.patchComment(this.props.type, this.state.comment)
    this.props.toggleEditing()
  }

  render(){
    return(
      <Form reply>
        <Form.TextArea  id="editTextarea" 
          value={this.state.comment.content} onChange={this.handleChange}/>
        <Button onClick={this.onSubmit} content='Done' labelPosition='left' icon='edit' primary />
      </Form>
    )
  }
}

export default EditCommentForm