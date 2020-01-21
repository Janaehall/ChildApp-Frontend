import React, {Component} from 'react'
import {connect} from 'react-redux'
import { delPostLike, addPostLike, delMilestoneLike, addMilestoneLike } from '../../actions/likes'
import {Icon} from 'semantic-ui-react'

class LikeButton extends Component {
  // constructor(props){
  //   super(props)
  //   // let likeable
  //   this.props.post ? this.type = 'Post' : this.type = 'Milestone'
  //   this.props.post ? this.likeable = this.props.post : this.likeable = this.props.milestone
  //   this.state = {
  //     hasLiked: this.likeable.likes.map(like => like.user_id).includes(this.props.currentUser.id)
  //   }
  // }

  state = {
    hasLiked: this.props.likeable.likes.map(like => like.user_id).includes(this.props.currentUser.id)
  }

  deleteLike = () => {
    let { type, likeable, currentUser, delPostLike, delMilestoneLike } = this.props
    console.log('!!!!!!', likeable)
    console.log('?????', likeable.likes.map(l => l.user_id))
    console.log('$$$$$$', currentUser.id)
    let like = likeable.likes.find(like => like.user_id === currentUser.id)
    
    fetch(`http://localhost:3000/likes/${like.id}`, {'method':'DELETE'})
    .then(resp => {
      type === "Post" ? delPostLike(like) : delMilestoneLike(like)
      this.setState({hasLiked: false})
    })
  }

  addLike = () => {

    let {likeable, type, addPostLike, addMilestoneLike, currentUser} = this.props
    let reqObj = {
      'method':'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        likeable_id: likeable.id, 
        likeable_type: type, 
        user_id: currentUser.id
      })
    }
    fetch('http://localhost:3000/likes', reqObj)
    .then(resp => resp.json())
    .then(like => {
      type === "Post" ? addPostLike(like) : addMilestoneLike(like)
      this.setState({hasLiked: true})
    })
  }

  toggleLike = () => this.state.hasLiked? this.deleteLike() : this.addLike()

  render(){
    return(
      <div id="likes" onClick={this.toggleLike}>
        <Icon id={this.state.hasLiked? "liked":"unliked"} name='like'/>
        {this.props.likeable.likes.length} Likes
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
    addPostLike: like => dispatch(addPostLike(like)),
    addMilestoneLike: like => dispatch(addMilestoneLike(like)),
    delPostLike: like => dispatch(delPostLike(like)),
    delMilestoneLike: like => dispatch(delMilestoneLike(like))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(LikeButton)