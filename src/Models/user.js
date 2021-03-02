import { action } from "easy-peasy";
// EAAOhwM6ScugBAHusMztNFSs0wp6v2XIOuziAJy2WdDpxZB70gZBLruZA5hQL8Sl1ZA2HETTQTZBtGEZCPoZCZBx1p5CZCSdfnsZAr9Ltd7HeKxUfmgoa8PUZBMKnBOltJjZBxHXe7a0qjYymGjgVdLbC3ZCzpscIdXVTzuNrmen5TWDzlV2j21cm2ZAbBfCZBrLUxEDIJwZD
export const user = {
  // userdata: {access_token: 'EAAOhwM6ScugBAEv4JWC4lBerSXpW02JJdKwBDffB1OZBPWf2JuJg62JszTg2EUK2ZARagv3fk3sOf0GBvhrjqm1gz2VJZAdcjX27IehS8UPckAVZA893YSZB0jfoa5uMWl5ToYorJZBzkyd9qNqf5zakRVtlq6ouH9qZAXZBsbFfQYRljpZClHctq'},
  userdata: null,
  isLoggedIn: false,
  theme: 'dark',
  currentPath: '',
  setUserData: action((state, newState) => {
    state.isLoggedIn = newState[0];
    state.userdata = newState[1] 
  }),
  setTheme: action((state, newState) => {
    state.theme = newState
  }),
  setCurrentPath: action((state, newState) => {
    state.currentPath = newState
  })
}