import React, { Component } from 'react'
import { connect } from 'react-redux'
import Milestone from '../components/milestones/Milestone'
import Post from '../components/posts/Post'
import { setChild } from '../actions/child'
import PhotoModal from '../components/PhotoModal'


class Timeline extends Component {
  state = {
    modal: false
  }

  handleModal = photo => {
    this.setState({photo: photo})
    this.toggleModal()
  }


  toggleModal = () => {
    this.setState({modal: !this.state.modal})
  }

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
      return {...post, compareDate: post.created_at}
    })

    milestones = milestones.map(milestone => {
      let time = milestone.created_at.split("T")[1]
      return {...milestone, compareDate: milestone.date + "T" + time}
    })

    let items = (posts.concat(milestones)).sort((a,b) => {
      return b.compareDate > a.compareDate ? 1 : b.compareDate < a.compareDate ? -1 : 0
    })

    return (
      items.map(item => {
        return posts.includes(item) 
          ? <Post post={item} handleModal={this.handleModal} key={item.id}/> 
          : <Milestone name={name} milestone={item} key={item.id}/>
      })
    )
  }

  render(){
    return(
        <div id="timeline">
        <PhotoModal photo={this.state.photo} show={this.state.modal} hide={this.toggleModal}/>
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
