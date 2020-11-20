import { useEffect } from 'react';
import { users } from '../models/users';

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

  useEffect(() => {
    getUser()
  }, [])

  return {
    getUser,
  }
}

export default useUser;
