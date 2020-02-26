import React from 'react'
import { Menu } from 'semantic-ui-react'
import ActionButtons from './ActionButtons'
import { history } from '../actions/history'
import { ParentalAccess } from '../components/auth/ParentalAccess'

const TimelineButtons = props => {

  const handleItemClick = (e, {name}) => {
    let { id } = props.child
    name === 'timeline'? history.push(`/${id}`): history.push(`/${id}/${name}`) 
  }

    return (
      <Menu tabular id="timelineBtns">
        <Menu.Item name='timeline' onClick={handleItemClick}/>
        <Menu.Item name='photos' onClick={handleItemClick}/>
        <Menu.Item name='videos' onClick={handleItemClick}/>
        <ActionButtons/>
      </Menu>
    )
}

export default TimelineButtons
 