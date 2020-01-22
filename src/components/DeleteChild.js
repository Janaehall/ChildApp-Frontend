import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'
import { delChild } from '../actions/child'

class DeleteChild extends Component {

  deleteChild = () => {
    this.props.history.push('/homepage')
    // fetch(`http://localhost:3000/children/${this.props.child.id}`)
    this.props.delChild(this.props.child)
  }


  render(){
    return (
      <div>
        <h3>Are you sure you want to delete {this.props.child.name}?</h3>
        <Button type="alert" content="Delete" onClick={this.deleteChild}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    child: state.child
  }
}

const mapDispatchToProps = dispatch => {
  return {
    delChild: child => dispatch(delChild(child))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteChild)