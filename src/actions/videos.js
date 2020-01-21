import { setErrors } from './errors'
import { history } from './history'

export const addVideo = video => {
  return {
    type: "ADD_VIDEO",
    video
  }
}


export function postVideo(newVideo) {
  return function(dispatch){
  let formData = new FormData()
  let {childId, video} = newVideo
  formData.append('child[video]', video)
  let reqObj = {method: 'PATCH', body: formData}
  fetch(`http://localhost:3000/children/${childId}/add_video`, reqObj)
    .then(resp => resp.json())
    .then(video => {
      if(video.errors){
        dispatch(setErrors(video.errors))
      } else {
        dispatch(addVideo(video.video))
        history.push(`/${childId}/videos`)
      }
    })
  }
}