import React from 'react'
import {Modal} from 'semantic-ui-react'

const PhotoModal = props => {
  return(
    <Modal open={props.show} onClose={props.hide}>
      {props.video
      ? <video id="displayVideo" src={props.video} alt='' controls/>
      : <img id="displayPhoto" src={props.photo} alt=''/>}
    </Modal>
  )
}

export default PhotoModal
