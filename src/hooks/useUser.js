import { useEffect } from 'react';
import { users } from '../models/users';
import * as R from 'ramda'

const useUser = () => {

  const getUser = () => {
    const usuarioLocalStorage = localStorage.getItem("usuario")
    if (usuarioLocalStorage) {
      const find = users.find(user => user.usuario === usuarioLocalStorage)
      if (find) {
        return find
      }
    }
    return {}
  }

  const getUserRole = () => {
    const user = getUser()
    if (R.isEmpty(user)) return undefined
    return user.role
  }

  const enableField = enableFor => {
    return enableFor && enableFor.find(item => item === getUserRole())
  }

  useEffect(() => {
    getUser()
  }, [])

  return {
    getUser,
    enableField
  }
}

export default useUser;
