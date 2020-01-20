import React, {Component} from 'react'
import {connect} from 'react-redux'
import ChildrenDropdown from '../components/ChildrenDropdown'
import FriendsChildrenDropdown from '../components/FriendsChildrenDropdown'
import {history} from '../actions/history'
import {Menu, Button} from  'semantic-ui-react'
import {setChild} from '../actions/child'
import {Link} from 'react-router-dom'

class Navigationbar extends Component {

  signOut = () => {
    this.props.signOut()
    localStorage.removeItem('token')
    history.push('/login')
  }

  handleClick = (id) => {
    this.props.setChild(id)
    history.push(`/${id}`)
  }

  render(){
    let {children, friendsChildren, currentUser} = this.props
    return(
      <Menu id="navBar" size='small'>
      <Menu.Item name='My Child' as={Link} to="/homepage"/>
      <Menu.Menu position='right'>
        <ChildrenDropdown handleClick={this.handleClick} children={children}/>
        <FriendsChildrenDropdown handleClick={this.handleClick} friendsChildren={friendsChildren}/>
        <Menu.Item id="userInfo">
          <img id="profpicThumbnail" src={currentUser.profile_pic} alt=''/> 
          Welcome, {currentUser.name}!
        </Menu.Item>
        <Menu.Item>
          <Button secondary onClick={this.signOut}>Sign Out</Button>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
    )
  }
}

const mapStateToProps = state => {
  return{
    children: state.currentUser.children,
    friendsChildren: state.currentUser.friendsChildren,
    currentUser: state.currentUser.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch({type: "SIGN_OUT"}),
    setChild: id => dispatch(setChild(id))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Navigationbar)
