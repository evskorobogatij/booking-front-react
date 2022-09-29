import { UserModel } from '../modules/User/UserModel'

export function getUserShortName(user: UserModel): string {
  const surname =
    user.surname && user.surname.charAt(0).toUpperCase() + user.surname.slice(1)
  const name = user.name && `${user.name[0].toUpperCase()}.`
  const patrName = user.patrName && `${user.patrName[0].toUpperCase()}.`

  return [surname, name, patrName].join(' ')
}
