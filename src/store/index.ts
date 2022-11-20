import create from "zustand";
import { AdminActionHistorySlice, createAdminActionHistorySlice } from "./adminActionHistorySlice";
import { devtools, persist } from "zustand/middleware";

export const useBoundStore = create<AdminActionHistorySlice>()(
  devtools(
    persist((...a) => ({
      ...createAdminActionHistorySlice(...a),
    }), {
        name: 'admin-action-history'
    })
  )
);
