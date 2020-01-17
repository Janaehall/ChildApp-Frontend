import React, { Component } from 'react'
import { connect } from 'react-redux'
import Milestone from '../components/milestones/Milestone'
import Post from '../components/posts/Post'
import { setChild } from '../actions/child'


class Timeline extends Component {

  renderTimeline = () => {
    let { posts, milestones } = this.props.child
    return(
      posts.concat(milestones).length > 0
        ? this.renderMilestonesAndPosts()
        : <h1 id="timelineHeader">No Posts</h1>
    )
  }

  renderMilestonesAndPosts = () => {
    let {posts, milestones, name} = this.props.child
    posts = posts.map(post => {
      return {...post, date: post.created_at}
    })
    let items = (posts.concat(milestones)).sort((a,b) => {
      return b.date > a.date ? 1 : b.date < a.date ? -1 : 0
    })
    return (
      items.map(item => {
        return posts.includes(item) 
          ? <Post post={item}/> 
          : <Milestone name={name} milestone={item}/>
      })
    )
  }

  render(){
    return(
      <div id="timeline">
        {this.renderTimeline()}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return({
    child: state.child,
    hasFetched: state.child.hasFetched,
    currentUser: state.currentUser.user
  })
}

const mapDispatchToProps = dispatch => {
  return {
    setChild: id => dispatch(setChild(id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Timeline)
