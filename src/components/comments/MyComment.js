import React, { Component } from 'react'
import { Comment, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { delComment, patchComment } from '../../actions/comments'
import EditCommentForm from './EditCommentForm'

class MyComment extends Component {
  state = {
    isEditing: false
  }


  toggleEditing = () => this.setState({isEditing: !this.state.isEditing})


  deleteComment = () => {
    let { type, comment, commentable, delComment } = this.props
    delComment(type, commentable.id, comment.id)
  }


  renderEditBtns = () => {
    return this.props.currentUser.id === this.props.comment.user.id
      ? <div>
          <Icon className="delBtn" name="delete small" onClick={this.deleteComment}/>
          <Icon className="delBtn" name="edit outline" onClick={this.toggleEditing}/>
        </div>
       : null
  }

 

  render(){
    let {comment, patchComment} = this.props
    return(
      this.state.isEditing
        ? <EditCommentForm comment={comment} type={this.props.type}
            patchComment={patchComment} toggleEditing={this.toggleEditing}/>
        : <Comment style={{'min-height':'3em'}}>
            {this.renderEditBtns()}
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
      delComment: (type, commentableId, commentId) =>  dispatch(delComment(type, commentableId, commentId)),
      patchComment: (type, comment) => dispatch(patchComment(type, comment))

    }
  }


export default connect(mapStateToProps, mapDispatchToProps)(MyComment)