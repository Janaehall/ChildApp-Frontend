import React from 'react'
import {Modal} from 'semantic-ui-react'

const PhotoModal = props => {
  return(
    <Modal open={props.show} onClose={props.hide}>
      <img src={props.photo} alt=''/>
    </Modal>
  )
}

export default PhotoModal
