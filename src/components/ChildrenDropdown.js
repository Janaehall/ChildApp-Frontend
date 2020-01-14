import React, {Component} from 'react'
import {Dropdown} from 'semantic-ui-react'
import {history} from '../actions/history'

class ChildrenDropdown extends Component {

  renderChildren = () => {
    let { children, handleClick } = this.props
    return children.length > 0?
      children.map(child => {
        return (
          <Dropdown.Item key={child.id} onClick={() => handleClick(child.id)}>
            {child.name}
          </Dropdown.Item>
        )
      })
    : <Dropdown.Item id="none">None</Dropdown.Item>
  }

  render(){
    return(
      <Dropdown item text="My Children">
      <Dropdown.Menu>
        {this.renderChildren()}
        <Dropdown.Divider />
        <Dropdown.Item onClick={() => history.push("/add_child")}>Add Child</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    )
  }
}

export default ChildrenDropdown
