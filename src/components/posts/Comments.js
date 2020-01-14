import React from 'react'
import {Comment} from 'semantic-ui-react'
import MyComment from './MyComment'
import CommentForm from './CommentForm'

const Comments = props => {

  const renderComments = () => {
    let {post} = props
    return post.comments.map(comment => <MyComment comment={comment} post={post}/>)
  }

    return(
      <div style={{'display': props.display}}>
        <Comment.Group>{renderComments()}</Comment.Group>
        <CommentForm post={props.post}/>
      </div>
    )
}

export default Comments