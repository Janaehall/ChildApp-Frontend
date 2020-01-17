import React, {Component} from 'react'
import {Form, Button} from 'semantic-ui-react'



class EditPostForm extends Component {

  state = {
    post: this.props.post
  }

  onSubmit = e => {
    e.preventDefault()
    this.props.editPost(this.state.post)
    this.props.toggleEditing()
  }

  handleChange = e => this.setState({post: {...this.state.post, content: e.target.value}})

  render() {
    return(
          <Form onSubmit={this.onSubmit}>
          <Form.Field required>
            <Form.TextArea id="commentTextarea" 
              value={this.state.post.content} name="content" onChange={this.handleChange}/>
          </Form.Field>
          <Button type='submit'>Done</Button>
        </Form>
    )
  }
}

export default EditPostForm