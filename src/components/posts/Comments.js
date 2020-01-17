import React from 'react'
import {Comment} from 'semantic-ui-react'
import MyComment from './MyComment'
import CommentForm from './CommentForm'

const Comments = props => {
  let {post, display} = props

  const renderComments = () => {
    return post.comments.map(comment => <MyComment comment={comment} post={post}/>)
  }

    return(
      <div style={{'display': display}}>
        <Comment.Group>{renderComments()}</Comment.Group>
        <CommentForm post={post}/>
      </div>
    )
}

export default Comments