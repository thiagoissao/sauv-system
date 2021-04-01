import { createSlice, configureStore } from '@reduxjs/toolkit'
import axios from 'axios';

export const login = createSlice({
  name: 'login',
  initialState: {
    loggedIn: !!localStorage.getItem('usuario')
  },
  reducers: {
    loginUser: (state, action) => {
      const usuario = action.payload;
      axios.defaults.headers.common['Authorization'] = `bearer ${action.payload.token}` ;
      localStorage.setItem("usuario", JSON.stringify(usuario))
      return ({ ...state, loggedIn: true })
    },
    logoffUser: state => {
      axios.defaults.headers.common['Authorization'] = null;
      localStorage.clear()
      return ({ ...state, loggedIn: false })
    },
  }
})

export const { loginUser, logoffUser } = login.actions

const store = configureStore({
  reducer: login.reducer
})

export default store
