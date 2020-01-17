import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { postComment } from '../../actions/comments'
import { clearErrors } from '../../actions/errors'


class CommentForm extends Component {
  state = {
    userId: this.props.currentUser.id,
    postId: this.props.post.id,
    content: ''
  }

  componentWillUnmount(){
    this.props.clearErrors()
  }

  handleChange = e => this.setState({content: e.target.value})

  onSubmit = e => {
    e.preventDefault()
    this.props.postComment(this.state)
    this.setState({content: ''})
  }

  render(){
    let myClass
    this.props.errors ? myClass = "field error" : myClass = "field"
    return(
      <Form reply>
        <Form.TextArea 
          className={myClass} id="commentTextarea" 
          value={this.state.content} onChange={this.handleChange}/>
        <Button onClick={this.onSubmit} content='Add Comment' labelPosition='left' icon='edit' primary />
      </Form>
    )
  }
}

const mapStateToProps = state => {
  return{
    currentUser: state.currentUser.user,
    errors: state.errors
  }
}

const mapDispatchToProps = dispatch => {
  return{
    postComment: (comment) => dispatch(postComment(comment)),
    clearErrors: () => dispatch(clearErrors())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm)