import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Form, Button, Message} from 'semantic-ui-react'
import {postPost} from '../../actions/posts'
import {clearErrors} from '../../actions/errors'


class PostForm extends Component {

  state = {
    content: '',
    photos: []
  }

  componentWillUnmount(){
    this.props.clearErrors()
  }

  onSubmit = e => {
    e.preventDefault()
    let {match, currentUser} = this.props
    this.props.postPost({
      userId: currentUser.id, 
      childId: match.params.id, 
      ...this.state})
  }

  renderMessages = () => {
    return(
      this.props.errors?
        <div>
          {this.props.errors.map(error => {
            return <Message error size="tiny" header={error}/>
          })}
        </div>
      :null
    )
  }

  renderImages = () => {
    return(
        <div>
          {[...this.state.photos].map(image => {
            return <img className="postFormTn" src={URL.createObjectURL(image)}/>
          })}
        </div>
    )
  }

  handleImageUpload = e => this.setState({photos: e.target.files})

  handleChange = e => this.setState({[e.target.name]: e.target.value})

  render() {
    return(
        <div id="logInForm">
          <h1 id="timelineHeader">New Post</h1>
          {this.renderMessages()}
          <Form onSubmit={this.onSubmit}>
          <Form.Field required>
            <Form.TextArea id="commentTextarea" placeholder='Write Your Post Here' name="content" onChange={this.handleChange}/>
          </Form.Field>
          {this.renderImages()}
          <Form.Field required>
            <input multiple type="file" onChange={this.handleImageUpload} style={{'display':'inline-block'}}/>
          </Form.Field>
          <Button type='submit'>Add</Button>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.user,
    errors: state.errors
  }
}

const mapDispatchToProps = dispatch => {
  return{
    postPost: post => dispatch(postPost(post)),
    clearErrors: () => dispatch(clearErrors())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);