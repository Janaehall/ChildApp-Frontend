import React, {Component} from 'react'
import {Comment, Icon} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {delComment} from '../../actions/comments'

class MyComment extends Component {

  deleteComment = () => {
    let { comment, post, delComment } = this.props
    delComment(post.id, comment.id)
  }

  renderDeleteBtn = () => {
    return this.props.currentUser.id === this.props.comment.user.id?
      <Icon className="delBtn" name="delete" onClick={this.deleteComment}/>
    : null
  }
 
    render(){
      let {comment} = this.props
      return(
      <Comment style={{'min-height':'3em'}}>
      {this.renderDeleteBtn()}
      <Comment.Avatar src={comment.user.profile_pic}/>
      <Comment.Content>
        <Comment.Author style={{'display':'inline-block'}}>{comment.user.name}</Comment.Author>
        <Comment.Metadata>{comment.date.split('T')[0]}</Comment.Metadata>
        <Comment.Text>{comment.content}</Comment.Text>
      </Comment.Content>
      </Comment>

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
      delComment: (post_id, comment_id) =>  dispatch(delComment(post_id, comment_id))
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(MyComment)