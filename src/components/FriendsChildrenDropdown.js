import React, {Component} from 'react'
import {Dropdown} from 'semantic-ui-react'

class FriendsChildrenDropdown extends Component {

  renderChildren = () => {
    let { friendsChildren, handleClick } = this.props
    return friendsChildren.length > 0
      ? <div>
          {friendsChildren.map(child => {
            return (
              <Dropdown.Item key={child.id} onClick={() => handleClick(child.id)}>
                {child.name}
              </Dropdown.Item>
            )
          })}
        </div>
    : <Dropdown.Item>None</Dropdown.Item>
  }

  render(){
    return(
      <Dropdown item text="Friends' Children">
      <Dropdown.Menu>
        {this.renderChildren()}
      </Dropdown.Menu>
    </Dropdown>
    )
  }
}

export default FriendsChildrenDropdown
