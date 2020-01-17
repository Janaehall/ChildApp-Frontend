import React, {Component} from 'react'
import {connect} from 'react-redux'
import { delLike, addLike } from '../../actions/likes'
import {Icon} from 'semantic-ui-react'

class LikeButton extends Component {
  state = {
    hasLiked: this.props.post.likes.map(like => like.user_id).includes(this.props.currentUser.id)
  }

  deleteLike = () => {
    let { post, currentUser, delLike } = this.props
    let like = post.likes.find(like => like.user_id === currentUser.id)
    
    fetch(`http://localhost:3000/likes/${like.id}`, {'method':'DELETE'})
    .then(resp => {
      delLike(like)
      this.setState({hasLiked: false})
    })
  }

  addLike = () => {
    let {post, addLike, currentUser} = this.props
    let reqObj = {
      'method':'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({post_id: post.id, user_id: currentUser.id})
    }
    fetch('http://localhost:3000/likes', reqObj)
    .then(resp => resp.json())
    .then(like => {
      addLike(like)
      this.setState({hasLiked: true})
    })
  }

  toggleLike = () => this.state.hasLiked? this.deleteLike() : this.addLike()

  render(){
    return(
      <div id="likes" onClick={this.toggleLike}>
        <Icon id={this.state.hasLiked? "liked":"unliked"} name='like'/>
        {this.props.post.likes.length} Likes
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addLike: like => dispatch(addLike(like)),
    delLike: like => dispatch(delLike(like))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(LikeButton)