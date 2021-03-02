import { action } from "easy-peasy";

export const ui = {
  toasts: [],
  pickerDuration: 10000,
  pickerDuplicates: false,
  pickerReplies: true,
  showPickerSettings: false,
  setToasts: action((state, newState) => {
    state.toasts.push(newState);
  }),
  removeToast: action((state, newState) => {
    state.toasts.splice(0, 1);
  }),
  setPickerDuration: action((state, newState) => {
    state.pickerDuration = newState
  }),
  setPickerDuplicates: action((state, newState) => {
    state.pickerDuplicates = newState
  }),
  setPickerReplies: action((state, newState) => {
    state.pickerReplies = newState
  }),
  setShowPickerSettings: action((state, newState) => {
    state.showPickerSettings = newState
  })
}