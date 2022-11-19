import create from 'zustand'
import { createToastSlice, ToastSlice } from './toastSlice'
import { devtools } from 'zustand/middleware'

export const useBoundStore = create<ToastSlice>()(devtools((...a) => ({
    ...createToastSlice(...a),
})))