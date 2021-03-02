import { auth, db } from './firebase'
import { Suspense } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import { routes } from './Routes';
import './App.css';
import { useEffect } from 'react';
import { useStoreState ,useStoreActions } from 'easy-peasy';
import { getUserAccounts, getIgBizzAcc, getAllIgBizzAccounts } from './API/fb-graph-api'

import Login from './components/Login';
import Loading from './components/Loading';
import TopBar from './components/TopBar';
import Footer from './components/Footer';
function App() {
  const { setUserData, setTheme, setCurrentPath } = useStoreActions(action => action.user);
  const { isLoggedIn, currentPath, userdata } = useStoreState(state => state.user);
  const { setFbAccounts, setIgAccounts } = useStoreActions(action => action.accounts);
  const history = useHistory()
  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (user) => {
      if(user) {
        await db.collection('users').doc(user.providerData[0].uid).get()
        .then(async (doc) => {
          if(doc.exists) {
            await setUserData([true, doc.data()])
            await getUserAccounts(doc.data().access_token).then(async (result) => {
            await setFbAccounts(result)
          })
          // FOR LATER USE ONCE FACEBOOK GIVES ME CORRECT INFO FOR POST COMMENTS
          // await getAllIgBizzAccounts(doc.data().access_token).then(async (result) => {
          //   setIgAccounts(result)
          // })
          // getIgBizzAcc(userdata.access_token, id).then((result) => {
          // setIgAccounts(result.data) })
          } else {
            // no user in db
            setUserData([false, null])    
          }
        })
      } else {
        setUserData([false, null])
      }
    })
    return () => {
      unsub()
    }
  },[isLoggedIn, setFbAccounts, setUserData])
  // useEffect(() => {
  //   const test = async () => {
  //     await getUserAccounts('EAAOhwM6ScugBAEv4JWC4lBerSXpW02JJdKwBDffB1OZBPWf2JuJg62JszTg2EUK2ZARagv3fk3sOf0GBvhrjqm1gz2VJZAdcjX27IehS8UPckAVZA893YSZB0jfoa5uMWl5ToYorJZBzkyd9qNqf5zakRVtlq6ouH9qZAXZBsbFfQYRljpZClHctq').then(async (result) => {
  //     await setFbAccounts(result)
  //     // console.log('variableName', result[0].id);
  //     getIgBizzAcc('EAAOhwM6ScugBAEv4JWC4lBerSXpW02JJdKwBDffB1OZBPWf2JuJg62JszTg2EUK2ZARagv3fk3sOf0GBvhrjqm1gz2VJZAdcjX27IehS8UPckAVZA893YSZB0jfoa5uMWl5ToYorJZBzkyd9qNqf5zakRVtlq6ouH9qZAXZBsbFfQYRljpZClHctq', result[0].id).then((result) => {
  //       console.log('result.data', result.data);
  //       setIgAccounts([result.data])
  //     })
  //   })
  // }

  //     return () => {
  //       test()
  //     }
  // },[history.location.pathname])
  useEffect(() => {
    setCurrentPath(history.location.pathname)
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme('dark')
      localStorage.setItem('theme', 'dark')
      document.querySelector('html').classList.add('dark')
    } else {
      setTheme('light')
      localStorage.setItem('theme', 'light')
      document.querySelector('html').classList.remove('dark')
    }
  },[history.location.pathname])
  return (
    <div className='flex flex-col h-screen'>
      <TopBar />
      <Suspense fallback={
        <Loading />
      }>
      <Switch>
        {routes(isLoggedIn).map(({path, component}, i) => (
          <Route
          key={i}
          exact
          path={path}
          component={component}
          />
          )
        )}
        </Switch>
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;
