import React, { Component } from 'react'
import {connect} from 'react-redux'
import WithAccess from '../components/auth/WithAccess'
import TimelineButtons from '../components/TimelineButtons'
import { authUser } from '../actions/user'
import Timeline from './Timeline'
import PostForm from '../components/posts/PostForm'
import MilestoneForm from '../components/milestones/MilestoneForm'
import NewFamilyForm from '../components/NewFamilyForm'
import Photos from '../containers/Photos'
import { Switch, Route } from 'react-router-dom'
import { setChild, delChild } from '../actions/child'


class ChildPage extends Component {


  componentWillUnmount() {
    this.props.delChild()
  }

  render(){
    let {photo, name, age, birthday} = this.props.child
    return(
      <div>
        <img id="childPhoto" src={photo} alt=''/>
        <h1 id="name">{name}</h1>
        <div id="childInfo">
          <h6>Age: {age}</h6>
          <h6>Birthday: {birthday}</h6>
        </div>
        <TimelineButtons child={this.props.child}/>
        <Switch>
          <Route exact path="/:id" component={Timeline}/>
          <Route exact path="/:id/new_post" component={PostForm}/>
          <Route exact path="/:id/new_milestone" component={MilestoneForm}/>
          <Route exact path="/:id/add_family" component={NewFamilyForm}/>
          <Route exact path="/:id/photos" component={Photos}/>
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return({
    currentUser: state.currentUser,
    child: state.child
   })
}

const mapDispatchToProps = dispatch => {
  return({
    authUser: user => dispatch(authUser(user)),
    setChild: id => dispatch(setChild(id)),
    delChild: () => dispatch(delChild())
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(WithAccess(ChildPage))
