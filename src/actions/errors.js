export const setErrors = errors => {
  return {
    type: "SET_ERRORS",
    errors
  }
}

export const clearErrors = () => {
  return {
    type: "CLEAR_ERRORS"
  }
}