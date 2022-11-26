import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AdminActionHistory {
  name: string,
  createdAt: string,
  action: string
}

interface AdminActionHistoryState {
  history: AdminActionHistory[];
}

const initialState: AdminActionHistoryState = {
  history: [],
}

export const adminActionHistorySlice = createSlice({
  name: 'adminActionHistory',
  initialState,
  reducers: {

    addHistory: (state, action: PayloadAction<AdminActionHistory>) => {

        state.history.push(action.payload)

    },

  },
})

export const { addHistory } = adminActionHistorySlice.actions

export default adminActionHistorySlice.reducer