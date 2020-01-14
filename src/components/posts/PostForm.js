import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Form, Button, Message} from 'semantic-ui-react'
import PhotosForm from './PhotosForm'


class PostForm extends Component {

  state = {
    content: '',
    hasSubmitted: false,
    post: null
  }

  onSubmit = e => {
    let {match, currentUser} = this.props
    let {content} = this.state
    e.preventDefault()
    let reqObj = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        content, child_id: match.params.id, user_id: currentUser.user.id
      })
    }
   this.submitPost(reqObj)
  }

  submitPost = reqObj => {
    fetch('http://localhost:3000/posts', reqObj)
    .then(resp => resp.json())
    .then(post => {
      post.errors?
        this.setState({errors: post.errors}) 
      : this.setState({post, hasSubmitted: true})
    })
  }

  renderMessages = () => {
    return(
      this.state.errors?
        <div>
          {this.state.errors.map(error => <Message error size="tiny" header={error}/>)}
        </div>
      :null
    )
  }

  handleChange = e => this.setState({[e.target.name]: e.target.value})

  addPhotos = photos => this.setState({post: {...this.state.post, photos: photos}})

  render() {
    let {hasSubmitted, post} = this.state
    return(
      hasSubmitted?
        <PhotosForm post={post} addPhotos={this.addPhotos}/>
      :
        <div id="logInForm">
          <h1 id="timelineHeader">New Post</h1>
          {this.renderMessages()}
          <Form onSubmit={this.onSubmit}>
          <Form.Field required>
            <Form.TextArea id="commentTextarea" placeholder='Write Your Post Here' name="content" onChange={this.handleChange}/>
          </Form.Field>
          <Button type='submit'>Add</Button>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    child: state.child,
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(PostForm);