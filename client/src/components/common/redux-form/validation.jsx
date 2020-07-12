import * as EmailValidator from 'email-validator'

const passwordRegex = /^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

const required = (value) => value ? undefined : 'Required'
const number = value => value && isNaN(Number(value)) ? 'Only number allowed' : undefined

const email = value => value && !EmailValidator.validate(value) ? 'Please enter a valid Email' : undefined
const passwordPattern = value => (!!value && !passwordRegex.test(value)) ? 'Password must be at least 8 chars long with 1 uppercase, 1 number and 1 special character' : undefined
const passwordsMatch = (value, allValues) => value !== allValues.password ? 'Passwords don\'t match' : undefined

export {
    required,
    number,
    email,
    passwordPattern,
    passwordsMatch
}