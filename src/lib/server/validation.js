import { define } from 'superstruct'
import isEmail from 'is-email'

export const email = define('email', isEmail)
