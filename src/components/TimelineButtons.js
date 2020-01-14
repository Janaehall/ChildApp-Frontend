import React from 'react'
import { Menu } from 'semantic-ui-react'
import ActionButtons from './ActionButtons'
import { history } from '../actions/history'

const TimelineButtons = props => {

  const handleItemClick = (e, {name}) => {
    let {id} = props.child
    name === 'timeline'? history.push(`/${id}`): history.push(`/${id}/photos`) 
  }

    return (
      <Menu tabular>
        <Menu.Item name='timeline' onClick={handleItemClick}/>
        <Menu.Item name='photos' onClick={handleItemClick}/>
        <ActionButtons/>
      </Menu>
    )
}

export default TimelineButtons
 