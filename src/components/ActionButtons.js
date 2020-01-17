import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Menu } from 'semantic-ui-react'
import { history } from '../actions/history'
import ParentalAccess from './auth/ParentalAccess'



class ActionButtons extends Component {

  handleClick = route => history.push(`/${this.props.child.id}/${route}`)

  render(){
    let { currentUser, child } = this.props
    return(
      ParentalAccess(currentUser, child)
      ? <Menu tabular id="actionBtns">
          <Menu.Item name='Add Post' onClick={() => this.handleClick('new_post')} />
          <Menu.Item name='Add Milestone' onClick={() => this.handleClick('new_milestone')} />
          <Menu.Item name='Add Video' onClick={() => this.handleClick('add_video')} />
          <Menu.Item name='Add Family Member' onClick={() => this.handleClick('add_family')}/>
          <Menu.Item name={`Edit ${child.name}`} onClick={() => this.handleClick('edit_child')}/>
        </Menu>
      : null
    )
  }
}

const mapStateToProps = state => {
  return {
    child: state.child,
    currentUser: state.currentUser
  }
}

export default connect(mapStateToProps)(ActionButtons)