import React, {Component} from 'react'
import {Form, Button} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {addComment} from '../../actions/comments'


class CommentForm extends Component {
  state = {
    content: '',
    class: 'field'
  }

  handleChange = e => this.setState({content: e.target.value})

  onSubmit = e => {
    let { currentUser, post } = this.props
    e.preventDefault()
    let reqObj = {
      'method': 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        user_id: currentUser.id,
        post_id: post.id,
        content: this.state.content
      })
    }
    this.postComment(reqObj)
  }

  postComment = reqObj => {
    let { post, addComment } = this.props
    fetch(`http://localhost:3000/comments`, reqObj)
    .then(resp => resp.json())
    .then(comment => {
      if(comment.error){
        this.setState({class: 'field error'})
      } else {
        addComment(post.id, comment)
        this.setState({content: '', class: 'field'})
      }
    })
  }

  render(){
    return(
      <Form reply>
        <Form.TextArea 
          className={this.state.class} id="commentTextarea" 
          value={this.state.content} onChange={this.handleChange}/>
        <Button onClick={this.onSubmit} content='Add Comment' labelPosition='left' icon='edit' primary />
      </Form>
    )
  }
}

const mapStateToProps = state => {
  return{
    currentUser: state.currentUser.user
  }
}

const mapDispatchToProps = dispatch => {
  return{
    addComment: (post_id, comment) => dispatch(addComment(post_id, comment))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm)