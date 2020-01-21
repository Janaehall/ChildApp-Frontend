import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { postPostComment, postMilestoneComment} from '../../actions/comments'
import { clearErrors } from '../../actions/errors'


class CommentForm extends Component {
  state = {
    userId: this.props.currentUser.id,
    commentableId: this.props.commentable.id,
    content: ''
  }

  componentWillUnmount(){
    this.props.clearErrors()
  }

  handleChange = e => this.setState({content: e.target.value})

  onSubmit = e => {
    let {type, postPostComment, postMilestoneComment} = this.props
    e.preventDefault()
    type === "Post" ? postPostComment(this.state) : postMilestoneComment(this.state)
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
    postPostComment: (comment) => dispatch(postPostComment(comment)),
    postMilestoneComment: (comment) => dispatch(postMilestoneComment(comment)),
    clearErrors: () => dispatch(clearErrors())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm)