import React, { Component } from 'react'
import { Icon, Divider, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { delMilestone, editMilestone } from '../../actions/milestones'
import EditMilestoneForm from './EditMilestoneForm'
import ParentalAccess from '../auth/ParentalAccess'
import Comments from '../posts/Comments'
import LikeButton from '../posts/LikeButton'


class Milestone extends Component{
  state = {
    display: 'none',
    isEditing: false
  }

  toggleComments = () => {
    this.state.display === 'none'?
      this.setState({display: 'block'})
    : this.setState({display: 'none'})
  }

  deleteMilestone = () => {this.props.delMilestone(this.props.milestone.id)}

  toggleEditing = () => this.setState({isEditing: !this.state.isEditing})

  renderDelBtn = () => {
    return ParentalAccess(this.props.currentUser, this.props.child)
    ? <div>
        <Icon className="delBtn" name="delete" onClick={this.deleteMilestone}/>
        <Icon className="delBtn" name="edit" onClick={this.toggleEditing}/>
      </div>
    : null
  }

  render(){
    let { milestone, editMilestone } = this.props
    return(
        <div className='milestone'>
          <Divider vertical fitted>{milestone.date}</Divider>
          {this.renderDelBtn()}<br/>
          {this.state.isEditing
            ? <EditMilestoneForm 
              milestone={milestone} toggleEditing={this.toggleEditing} 
              editMilestone={editMilestone}/>
            : <div className="milestoneContent">
                <img id="milestoneImg" src="https://cdn2.iconfinder.com/data/icons/font-awesome/1792/child-512.png" alt=''/>
                <h2>{milestone.content}</h2>
                <div id="postFooter">
                  <div id="postComments">
                    <Button id="showCommentBtn" onClick={this.toggleComments}>
                      Show Comments({milestone.comments.length})
                      <i aria-hidden="true" class="dropdown icon"></i>
                    </Button>
                    <LikeButton likeable={milestone} type="Milestone"/>
                  </div>
                    <Comments commentable={milestone} type="Milestone" display={this.state.display}/>
                </div>
              </div>
            }
        </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
    child: state.child
  }
}

const mapDispatchToProps = dispatch => {
  return {
    delMilestone: milestoneId => dispatch(delMilestone(milestoneId)),
    editMilestone: milestone => dispatch(editMilestone(milestone))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Milestone)