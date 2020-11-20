import { createSlice, configureStore } from '@reduxjs/toolkit'

export const login = createSlice({
  name: 'login',
  initialState: {
    loggedIn: !!localStorage.getItem('usuario')
  },
  reducers: {
    loginUser: (state, action) => {
      const { usuario } = action.payload
      localStorage.setItem("usuario", usuario)
      return ({ ...state, loggedIn: true })
    },
    logoffUser: state => {
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
