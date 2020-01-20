import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'

class DeleteChild extends Component {

  deleteChild = () => {
    fetch()
  }


  render(){
    return (
      <div>
        <h3>Are you sure you want to delete {this.props.child.name}?</h3>
        <Button type="alert" content="Delete"/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    child: state.child
  }
}

export default connect(mapStateToProps)(DeleteChild)