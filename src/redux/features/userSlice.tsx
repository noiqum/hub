// redux/features/userSlice.ts
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  id: string | null
  name: string | null
  email: string | null
  isAuthenticated: boolean
}

const initialState: UserState = {
  id: null,
  name: null,
  email: null,
  isAuthenticated: false
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
    },
    clearUser: (state) => {
      return initialState
    }
  }
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer