import { createSlice, configureStore } from '@reduxjs/toolkit'

export const login = createSlice({
  name: 'login',
  initialState: {
    loggedIn: !!localStorage.getItem('usuario')
  },
  reducers: {
    loginUser: state => ({ ...state, loggedIn: true }),
    logoffUser: state => ({ ...state, loggedIn: false })
  }
})

export const { loginUser, logoffUser } = login.actions

const store = configureStore({
  reducer: login.reducer
})

export default store
