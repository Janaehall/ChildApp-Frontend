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
import Videos from '../containers/Videos'
import EditChildForm from '../components/EditChildForm'
import { Switch, Route } from 'react-router-dom'
import { setChild, clearChild} from '../actions/child'
import {Loader} from 'semantic-ui-react'
import VideoForm  from '../components/VideoForm'
import DeleteChild from '../components/DeleteChild'


class ChildPage extends Component {

  componentWillUnmount() {
    this.props.clearChild()
  }

  render(){
    let { photo, name, age, birthday } = this.props.child
    return(
      this.props.child.hasFetched
        ? <div>
           <div id="childPage">
              <img id="childPhoto" src={photo} alt=''/>
              <h1 id="name">{name}</h1>
              <div id="childInfo">
                <h6>Age: {age}</h6>
                <h6 id="birthday">Birthday: {birthday}</h6>
              </div>
              <TimelineButtons child={this.props.child}/>
              </div>
              <Switch>
                <Route exact path="/:id" component={Timeline}/>
                <Route exact path="/:id/new_post" component={PostForm}/>
                <Route exact path="/:id/new_milestone" component={MilestoneForm}/>
                <Route exact path="/:id/add_family" component={NewFamilyForm}/>
                <Route exact path="/:id/photos" component={Photos}/>
                <Route exact path="/:id/videos" component={Videos}/>
                <Route exact path="/:id/edit_child" component={EditChildForm}/>
                <Route exact path="/:id/add_video" component={VideoForm}/>
                <Route exact path="/:id/delete_child" component={DeleteChild}/>
              </Switch>
            </div>
          : this.props.child.isFetching 
            ? <Loader active size='massive' inline='centered'>Loading</Loader>
          : null
    )
  }
}

const mapStateToProps = state => {
  return({
    currentUser: state.currentUser,
    child: state.child,
    hasFetched: state.child.hasFetched
   })
}

const mapDispatchToProps = dispatch => {
  return({
    authUser: user => dispatch(authUser(user)),
    setChild: id => dispatch(setChild(id)),
    clearChild: () => dispatch(clearChild())
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(WithAccess(ChildPage))
