import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Form, Button} from 'semantic-ui-react'
import {addPost} from '../../actions/posts'
import {withRouter} from 'react-router-dom'

class PhotosForm extends Component {

  state = {
    displayPhotos: [],
    photo: null
  }

  onSubmit = e => {
    e.preventDefault()
    let postData = new FormData()
    postData.append('post[photo]', this.state.photo)
    let reqObj = {
      method: 'PATCH', 
      body: postData
    }
    this.postPhoto(reqObj)
  }

  postPhoto = reqObj => {
    fetch(`http://localhost:3000/posts/${this.props.post.id}/add_photos`, reqObj)
    .then(resp => resp.json())
    .then(resp => {
      this.setState({displayPhotos: resp.photos})
      this.props.addPhotos(resp.photos)
    })
  }

  handleDone = () => {
    let {post, match, addPost, history} = this.props
    addPost(post)
    history.push(`/${match.params.id}`)
  }

  handleImageUpload = e => this.setState({photo: e.target.files[0]})

  renderPhotos = () => {
    return (
      this.state.displayPhotos.map(photo => <img src={photo} id="thumbnail" alt=''/>) 
    )
  }

  render() {
    console.log(this.state.displayPhotos)
    return(
      <div id="logInForm">
        <h1 id="timelineHeader">Add Photos</h1>
        {this.renderPhotos()}
        <Form encType="image/jpeg" onSubmit={this.onSubmit}>
          <Form.Field>
            <input type="file" onChange={this.handleImageUpload} style={{'display':'inline-block'}}/>
            <Button style={{'display':'inline-block'}} variant="primary" type="submit">Add Photo</Button>
          </Form.Field>
          <div id="formFooter">
            <Button variant="secondary" onClick={this.handleDone}>Done</Button>
            <Button id="skip" onClick={this.handleDone}>Skip</Button>
          </div>
        </Form>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return{
    addPost: post => dispatch(addPost(post))
  }
}

export default connect(null, mapDispatchToProps)(withRouter(PhotosForm))
