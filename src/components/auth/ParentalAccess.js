

const ParentalAccess = (user, child) => {
  return user.children.map(child_obj => child_obj.id).includes(child.id)
}

export default ParentalAccess