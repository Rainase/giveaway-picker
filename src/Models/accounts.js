import { action } from "easy-peasy";

export const accounts = {
  fbAccounts: [],
  igAccounts: [],
  igPostData: [],
  comments: [],
  setFbAccounts: action((state, newState) => {
    state.fbAccounts = newState
  }),
  setIgAccounts: action((state, newState) => {
    state.igAccounts = newState
  }),
  setIgPostData: action((state, newState) => {
    state.igPostData = newState
  }),
  setComments: action((state, newState) => {
    state.comments = newState
  })
}