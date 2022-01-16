import { createSlice } from '@reduxjs/toolkit'

export const membersSlice = createSlice({
  name: 'members',
  initialState: {
    members: [],
  },
  reducers: {
    update: (state, action) => {
      state.members = action.payload // is this correct
    },
  },
})

export const { update } = membersSlice.actions // generate action creators ?

export default membersSlice.reducer