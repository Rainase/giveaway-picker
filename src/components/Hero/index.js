import { auth, db, facebook } from '../../firebase.js'
import { useStoreActions } from 'easy-peasy';
import { getUserAccounts } from '../../API/fb-graph-api';
import { useHistory } from 'react-router-dom';
const Hero = () => {
  const history = useHistory()
  const { setFbAccounts } = useStoreActions(action => action.accounts)

  const fbAuth = () => () => {
    auth.signInWithPopup(facebook.addScope('instagram_basic, pages_show_list')).then((result) => {
      db.collection('users').doc(result.user.providerData[0].uid).set({
        access_token: result.credential.accessToken
      }).then(
        getUserAccounts(result.credential.accessToken).then((result) => {
          setFbAccounts(result)
        })
      )
    })
    history.push('/app')
  }

  return ( 
    <section className="w-full px-6 mb-12 antialiased bg-white dark:bg-darker select-none">
    <div className="mx-auto max-w-7xl">
        <div className="container max-w-lg px-4 py-32 mx-auto text-left md:max-w-none md:text-center">

            <h1 className="text-5xl font-extrabold tracking-tight text-left text-gray-900 dark:text-white leading-tightest md:leading-12 md:text-center sm:leading-none md:text-6xl lg:text-7xl">
              <span className="inline md:block">Instagram comment picker</span>
              <span className="relative mt-2 text-transparent md:inline-block bg-clip-text bg-gradient-to-br from-blue-600 to-purple-500"> Giveaway tool</span>
            </h1>
            <div className="mx-auto mt-5 text-gray-500 dark:text-gray-200 md:mt-12 md:max-w-lg md:text-center lg:text-lg">
              Random winner picker for your Instagram promotion, sweepstake, giveaway and contest for FREE!
            </div>
            <div className="flex flex-col items-center mt-12 text-center">
                <span className="relative inline-flex w-full rounded-full shadow-sm md:w-auto">
                    <button
                      onClick={fbAuth()}
                      type="button"
                      className="inline-flex items-center justify-center w-full px-8 py-4 text-base font-bold leading-6 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-full md:w-auto hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700">
                        Get Started Now
                    </button>
                    <span className="absolute top-0 right-4 px-2 py-1 -mt-3 -mr-6 text-xs font-medium leading-tight text-white bg-green-400 rounded-full">
                      FREE 
                    </span>
                </span>
            </div>
        </div>
    </div>
</section>
   );
}
 
export default Hero;