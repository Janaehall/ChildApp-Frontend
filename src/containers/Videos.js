import React, {Component} from 'react'
import { connect } from 'react-redux'
import PhotoModal from '../components/PhotoModal'

class Videos extends Component {
  state = {
    modal: false
  }

  handleModal = video => {
    this.setState({video: video})
    this.toggleModal()
  }


  toggleModal = () => {
    this.setState({modal: !this.state.modal})
  }

  renderVideos = () => {
    let { videos } = this.props
      return(
        videos.length > 0
           ? <div>
              {videos.map(video => {
                return <video onClick={() => this.handleModal(video)} className="myMedia" src={video} alt=''/>
              })}
            </div>
          : <h1 id="timelineHeader">No Videos</h1>
      )
  }
  
  render(){
    return(
        <div id="videos">
          <PhotoModal video={this.state.video} show={this.state.modal} hide={this.toggleModal}/>
          {this.renderVideos()}
        </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    videos: state.child.videos
  }
}

export default connect(mapStateToProps)(Videos)