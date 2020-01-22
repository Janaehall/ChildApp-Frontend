import React from 'react'
import { Comment } from 'semantic-ui-react'
import MyComment from './MyComment'
import CommentForm from './CommentForm'

const Comments = props => {

  let {commentable, display, type} = props

  const renderComments = () => {
    let comments = commentable.comments.sort((a,b) =>  a.id > b.id ? 1 : b.id > a.id ? -1 : 0)
    return comments.map((comment, index) => {
      return <MyComment type={type} comment={comment} commentable={commentable} key={index}/>
    })
  }
  

    return(
      <div style={{'display': display}}>
        <Comment.Group>{renderComments()}</Comment.Group>
        <CommentForm commentable={commentable} type={type}/>
      </div>
    )
}

export default Comments