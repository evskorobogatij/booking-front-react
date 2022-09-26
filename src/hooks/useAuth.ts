import * as jose from 'jose'

interface AuthUser {
  username: string
  roles: string[]
}

export const useAuth = () => {
  if (!localStorage.getItem('auth')) {
    return {
      user: {
        username: '',
        roles: [''],
      },
      check(...roles: string[]) {
        return !!roles
      },
      logout() {},
    }
  }

  const jwt = jose.decodeJwt(
    JSON.parse(localStorage.getItem('auth') || '{}').access_token
  )

  const user: AuthUser = {
    username: jwt.sub as string,
    roles: jwt.roles as string[],
  }

  const check = (...roles: string[]): boolean => {
    return roles.some((role) => user.roles.includes(role))
  }

  const logout = () => {
    localStorage.removeItem('auth')
    location.href = '/signin'
  }

  return {
    user,
    check,
    logout,
  }
}
