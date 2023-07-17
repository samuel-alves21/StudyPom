export const formValidation = {
  email(email: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (emailRegex.test(email)) {
      return false
    } else {
      console.log('Email is not valid!')
      return true
    }
  },
}
