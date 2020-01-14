import React, {Component} from 'react'
import { connect } from 'react-redux'
import PhotoModal from '../components/PhotoModal'
import {Loader} from 'semantic-ui-react'

class Photos extends Component {
  state = {
    photo: null,
    modal: false
  }

  handleModal = photo => {
    this.setState({photo: photo})
    this.toggleModal()
  }


  toggleModal = () => {
    this.setState({modal: !this.state.modal})
  }

  renderPhotos = () => {
    let photos = []
    this.props.posts.forEach(post => photos.push(...post.photos))
    return(
      photos.length > 0?
        <div>
          {photos.map(photo => {
            return <img onClick={() => this.handleModal(photo)} id="myPhotos" src={photo} alt=''/>
          })}
        </div>
      : <h1 id="timelineHeader">No Photos</h1>
    )
  }
  
  render(){
    return(
      this.props.hasFetched?
        <div id="photos">
          <PhotoModal photo={this.state.photo} show={this.state.modal} hide={this.toggleModal}/>
          {this.renderPhotos()}
        </div>
      : <Loader active size='massive' inline='centered'>Loading</Loader>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    hasFetched: state.child.hasFetched,
    posts: state.child.posts,
    child: state.child
  }
}

export default connect(mapStateToProps)(Photos)