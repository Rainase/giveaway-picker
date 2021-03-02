import { useState } from 'react';
import { useStoreState ,useStoreActions } from 'easy-peasy';
const DarkMode = () => {
  const { theme } = useStoreState(state => state.user);
  const { setTheme } = useStoreActions(action => action.user);
  const toggleMode = () => () => {

    if(theme === 'dark') {
      localStorage.setItem('theme', 'light')
      setTheme('light')
      document.querySelector('html').setAttribute('class', 'light')
    } else {
      localStorage.setItem('theme', 'dark')
      setTheme('dark')
      document.querySelector('html').setAttribute('class', 'dark')
    }
  }
  const MoonIcon = () => (
    <svg className='w-5 text-indigo-600' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
</svg>
  )
  const SunIcon = () => (
    <svg className='w-5 text-white' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
</svg>
  )

  return ( 
    <div onClick={toggleMode()} className='m-2 cursor-pointer'>
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </div>
   );
}
 
export default DarkMode;