import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Form, Button, Message} from 'semantic-ui-react'
import {postVideo} from '../actions/videos'
import {clearErrors} from '../actions/errors'


class VideoForm extends Component {

  state = {
    video: null
  }

  componentWillUnmount(){
    this.props.clearErrors()
  }

  onSubmit = e => {
    e.preventDefault()
    let { match } = this.props
    this.props.postVideo({childId: match.params.id, ...this.state})
  }

  renderMessages = () => {
    return(
      this.props.errors
        ? <div>
            {this.props.errors.map(error => {
              return <Message error size="tiny" header={error}/>
            })}
          </div>
        : null
    )
  }

  renderVideo = () => {
    return(
      this.state.video
        ? <video width="320" height="240" controls autoplay src={URL.createObjectURL(this.state.video)}/>
        : null
    )
  }

  handleVideoUpload = e => this.setState({video: e.target.files[0]})

  // handleChange = e => this.setState({[e.target.name]: e.target.value})

  render() {
    return(
        <div id="logInForm">
          <h1 id="timelineHeader">New Video</h1>
          {this.renderMessages()}
          <Form onSubmit={this.onSubmit}>
          {this.renderVideo()}
          <Form.Field required>
            <input type="file" name="media-vid" accept="video/*" onChange={this.handleVideoUpload} style={{'display':'inline-block'}}/>
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
  return{
    postVideo: video => dispatch(postVideo(video)),
    clearErrors: () => dispatch(clearErrors())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoForm);