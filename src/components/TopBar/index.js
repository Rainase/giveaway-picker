import DarkMode from '../DarkMode';
import Login from '../Login';
import lightLogo from '../../giveaway-logo-light.svg';
import darkLogo from '../../giveaway-logo-dark.svg';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useHistory } from 'react-router-dom';

export const Logo = () => {
  const { theme } = useStoreState(state => state.user);
  const { setCurrentPath } = useStoreActions(action => action.user)
  const history = useHistory()
  const toHome = () => () => {
    history.push('/')
    setCurrentPath('/')
  }
  return (
    <div
      onClick={toHome()}
      className='flex items-center cursor-pointer'>
        <img className='w-6 mr-2' src={theme === 'dark' ? lightLogo : darkLogo} alt='GiveAway Picker Logo'/>
        <div className='hidden sm:block text-lg text-transparent font-semibold uppercase bg-clip-text bg-gradient-to-br from-blue-600 to-purple-500'>giveaway picker</div>
    </div>
  )
}
const TopBar = () => {

  return ( 
    <div className=' z-10 select-none bg-white py-4 px-6 place-content-between flex border border-t-0 border-l-0 border-r-0 border-lessDarker border-opacity-20 dark:border-lessDarker shadow-md dark:bg-darker'>
        <Logo />
        <div className='flex items-center'>
        <Login />
        <DarkMode />
      </div>
    </div>
   );
}
 
export default TopBar;