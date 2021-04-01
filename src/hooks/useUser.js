import { useEffect } from 'react';
import { users } from '../models/users';
import * as R from 'ramda'

const useUser = () => {

  const getUser = () => {
    const usuarioLocalStorage = JSON.parse(localStorage.getItem("usuario"))
    if (usuarioLocalStorage)
      return usuarioLocalStorage;
  }

  const getUserRole = () => {
    const user = getUser()
    if (R.isEmpty(user)) return undefined
    return user.type
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
