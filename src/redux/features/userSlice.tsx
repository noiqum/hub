// redux/features/userSlice.ts
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  id: string | null
  name: string | null
  email: string | null
  isAuthenticated: boolean,
  role: string
}

const initialState: UserState = {
  id: null,
  name: null,
  email: null,
  isAuthenticated: false,
  role: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Omit<UserState, 'isAuthenticated'>>) => {
      state.id = action.payload.id
      state.name = action.payload.name
      state.email = action.payload.email
      state.isAuthenticated = true
      state.role = action.payload.role
    },
    clearUser: (state) => {
      return initialState
    }
  }
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer