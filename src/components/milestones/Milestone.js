import React, {Component} from 'react'
import {Icon} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {delMilestone, editMilestone} from '../../actions/milestones'
import EditMilestoneForm from './EditMilestoneForm'


class Milestone extends Component{
  state = {isEditing: false}

  deleteMilestone = () => {this.props.delMilestone(this.props.milestone.id)}

  toggleEditing = () => this.setState({isEditing: !this.state.isEditing})

  renderDelBtn = () => {
    return this.props.currentUser.children.map(child => child.id).includes(this.props.child.id)?
      <div>
        <Icon className="delBtn" name="delete" onClick={this.deleteMilestone}/>
        <Icon className="delBtn" name="edit" onClick={this.toggleEditing}/>
      </div>
    : null
  }

  render(){
    let {milestone} = this.props
  return(
    <div id="milestone">
      {this.renderDelBtn()}<br/>
      {this.state.isEditing?
      <EditMilestoneForm 
        milestone={milestone} toggleEditing={this.toggleEditing} 
        editMilestone={this.props.editMilestone}/>
      :
      <div>
        <img id="milestoneImg" src="https://cdn2.iconfinder.com/data/icons/font-awesome/1792/child-512.png" alt=''/>
        <h5>{milestone.date}</h5>
        <h2>{milestone.content}</h2>
      </div>}
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
    delMilestone: milestone_id => dispatch(delMilestone(milestone_id)),
    editMilestone: milestone => dispatch(editMilestone(milestone))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Milestone)