import { StateCreator } from "zustand";

interface AdminActionHistory {
  name: string,
  createdAt: string,
  action: string
}

export interface AdminActionHistorySlice {
  history: AdminActionHistory[];
  addHistory: (data: AdminActionHistory) => void
}

export const createAdminActionHistorySlice: StateCreator<AdminActionHistorySlice> = (
  set
) => ({

  history: [],
  
  addHistory: (data) => set((state) => ({ history: [...state.history, data] })),

});
