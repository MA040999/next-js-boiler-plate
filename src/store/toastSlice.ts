import { MutableRefObject } from "react";
import { StateCreator } from "zustand";

export interface ToastSlice {
  toast: MutableRefObject<any> | null;
  showSuccessToast: (message: string) => void;
  showInfoToast: (message: string) => void;
  showWarningToast: (message: string) => void;
  showErrorToast: (message: string) => void;
}

const toastFadeOutTime = 3000

export const createToastSlice: StateCreator<ToastSlice> = (
  _,
  get
) => ({

  toast: null,
  
  showErrorToast(message) {
    get().toast?.current?.show({ severity: 'warn', summary: 'Warning', detail: message, life: toastFadeOutTime });
  },

  showWarningToast(message) {
    get().toast?.current?.show({ severity: 'warn', summary: 'Warning', detail: message, life: toastFadeOutTime });
  },
  
  showInfoToast(message) {
    get().toast?.current?.show({ severity: 'info', summary: 'Info', detail: message, life: toastFadeOutTime });
  },
  
  showSuccessToast(message) {
    get().toast?.current?.show({ severity: 'success', summary: 'Success', detail: message, life: toastFadeOutTime });
  },

});
