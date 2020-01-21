import React from 'react'
import {Comment} from 'semantic-ui-react'
import MyComment from './MyComment'
import CommentForm from './CommentForm'

const Comments = props => {
  let {commentable, display, type} = props

  const renderComments = () => {
    return commentable.comments.map(comment => <MyComment type={props.type} comment={comment} commentable={commentable}/>)
  }

    return(
      <div style={{'display': display}}>
        <Comment.Group>{renderComments()}</Comment.Group>
        <CommentForm commentable={commentable} type={type}/>
      </div>
    )
}

export default Comments