const required = (value: string | number) =>
  value || typeof value === 'number' ? undefined : 'Required'

const maxLength = (max: number) => (value: string) =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined

const minLength = (min: number) => (value: string) =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined

const number = (value: string | number) =>
  value && isNaN(Number(value)) ? 'Must be a number' : undefined

const minValue = (min: number) => (value: number) =>
  value && value < min ? `Must be at least ${min}` : undefined

const maxValue = (max: number) => (value: number) =>
  value && value > max ? `Must be at least ${max}` : undefined

const email = (value: string) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined

const password = (value: string) =>
  value && !/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/i.test(value)
    ? 'Invalid password'
    : undefined

const passwordConfirm = (values: {
  password: string
  passwordConfirm: string
}) => {
  const errors: { passwordConfirm?: string } = {}

  if (values.passwordConfirm !== values.password) {
    errors.passwordConfirm = 'Password mismatched'
  }

  return errors
}

export const validators = {
  required,
  maxLength,
  minLength,
  number,
  minValue,
  maxValue,
  email,
  password,
  passwordConfirm,
}
