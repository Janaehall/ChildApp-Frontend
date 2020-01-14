import React, {Component} from 'react'
import Comments from './Comments'
import {Button, Icon} from 'semantic-ui-react'
import {delPost, editPost} from '../../actions/posts'
import {connect} from 'react-redux'
import EditPostForm from './EditPostForm'
import LikeButton from './LikeButton'


class Post extends Component{
  state = {
    display: 'none',
    isEditing: false
  }

  toggleComments = () => {
    this.state.display === 'none'?
      this.setState({display: 'block'})
    : this.setState({display: 'none'})
  }

  deletePost = () => {this.props.delPost(this.props.post.id)}

  toggleEditing = () => {this.setState({isEditing: !this.state.isEditing})}

  renderDelBtn = () => {
    return this.props.currentUser.id === this.props.post.user.id?
      <div>
        <Icon className="delBtn" name="delete" onClick={this.deletePost}/>
        <Icon className="delBtn" name="edit" onClick={this.toggleEditing}/>
      </div>
    : null
  }

  renderPhotos = () => {
    return this.props.post.photos.map(photo => {
      return <img id="thumbnail" src={photo} alt=''/>
    })
  }

  renderContent = () => {
    let {post} = this.props
    return this.state.isEditing?
      <EditPostForm 
        post={post} toggleEditing={this.toggleEditing} editPost={this.props.editPost}/>
    : 
      <div id="postBody">
       <div id="postContent">{post.content}</div>
          <div id="postImages">
            {this.renderPhotos()}
          </div>
      </div>
  }

  render(){
    let {post} = this.props
    let name
    this.props.currentUser.id === post.user.id? name = "You" : name = post.user.name
    return(
      <div id="post">
        <div id="postHeader">
          {this.renderDelBtn()}
          <img id="profpicThumbnail" src={post.user.profile_pic} alt=''/>
          <div id="postSummary">{name} posted on his page</div>
          <div id="postDate">{post.created_at.split('T')[0]}</div>
        </div>
        {this.renderContent()}
        <div id="postFooter">
          <div id="postComments">
            <Button id="showCommentBtn" onClick={this.toggleComments}>
              Show Comments({post.comments.length})
              <i aria-hidden="true" class="dropdown icon"></i>
            </Button>
            <LikeButton post={post}/>
          </div>
            <Comments post={post} display={this.state.display}/>
        </div>
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
    delPost: post_id => dispatch(delPost(post_id)),
    editPost: post => dispatch(editPost(post))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)