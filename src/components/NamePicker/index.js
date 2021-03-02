import { useState, createRef, useEffect } from 'react'
import Button from '../Button/index';
import lottie from 'lottie-web'
import confetti from './confetti.json'
import { useStoreActions, useStoreState } from 'easy-peasy';
import PickerSettings from '../PickerSettings';
import ExternalLink from '../Icons/ExternalLink';
const RandomPicker = ({ items }) => {
  const [isRunning, setIsRunning] = useState(false)
  const [currentChoice, setCurrentChoice] = useState('')
  const [gameOpen, setGameOpen] = useState(false)
  const { pickerDuration, showPickerSettings } = useStoreState(state => state.ui)
  const { setShowPickerSettings } = useStoreActions(action => action.ui)
  let interval = null;
  let intervalDuration = 100;
  let duration = pickerDuration;
  
  const start = () => {
    clearInterval(interval);
    interval = setInterval(() => setChoice(), intervalDuration);
    setGameOpen(true)
    setIsRunning(true);
    setTimeout(() => {
        stop()
    }, duration);
    console.log('interval', interval);
  }
  
  const stop = () => {
    clearInterval(interval);
    setIsRunning(false);
  }
  
  const reset = () => {
    clearInterval(interval);
    setIsRunning(false)
    setCurrentChoice('')
  }
  
  const pickChoice = () =>  {
    const choice = items[Math.floor(Math.random() * items.length)];
    return choice;
  }
  
  const setChoice = () => {
    setCurrentChoice(pickChoice())
  }
  const SettingsIcon = () => (
    <svg className='w-5 ml-2' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
  )
  const CloseIcon = () => (
    <svg className='w-5 transform rotate-45 text-primary' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
  )
  const PlayIcon = () => (
    <svg className='w-5 ml-2' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
  )
  const StarIcon = () => (
    <svg className='w-20 animate-spin-slow ease-in-out text-yellow-400' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  )
  
  const GameOverlay = () => {
    let confettiContainer = createRef()
    const showConfetti = () => {
      const anim = lottie.loadAnimation({
        container: confettiContainer.current,
        animationData: confetti
      })
      anim.setSpeed(0.8)
      setTimeout(() => {
        anim.stop()
      },5000)
    }
    useEffect(() => {
      if(!isRunning) return showConfetti()
    })

    return (
      <div className={`${gameOpen ? 'fixed': 'hidden'} fixed inset-0 bg-lessDarker bg-opacity-70 transition-all ease-in-out delay-300 z-30`}>
          <div className='absolute pointer-events-none inset-0 z-30' ref={confettiContainer}></div>
        <div className='sm:w-3/6 absolute w-full sm:inset-1/4 inset-1 bg-white dark:bg-darker shadow-md border-lessDarker border rounded-md p-4'>
        <div
          onClick={isRunning ? () => console.log('game still running') : () => setGameOpen(!gameOpen)}
          className='right-5 absolute p-1 rounded-full hover:bg-lessDarker cursor-pointer select-none'>
          <CloseIcon />
        </div>
          <div className='mt-8 flex justify-around'>
          {isRunning ? '' : <StarIcon />}
          </div>
          <div className='animate-bounce transition-all ease-in-out delay-500 text-4xl mt-8 flex justify-around text-darker dark:text-white select-none'>
            {!isRunning && currentChoice !== '' ? 
            <a className='flex cursor-pointer' rel="noreferrer" target='_blank' href={`https://www.instagram.com/${currentChoice}`}>{currentChoice}<ExternalLink className='w-4 h-4'/></a> : ''}
          </div>
          <div className='mt-12 flex justify-around animate-pulse text-lg'>
          {isRunning ? currentChoice : ''}
          </div>
        
        </div>
      </div>
    )
  }
    return (
      <div className='mt-4'>
        <GameOverlay hidden={gameOpen}/>
        <PickerSettings />
        {items.length > 0 && (
        <div className="flex">
          <Button disabled={isRunning} onClick={() => start()}>Start <PlayIcon /></Button>
          {/* <Button onClick={() => showConfetti()}>Confetti</Button> */}
          <Button onClick={() => setShowPickerSettings(!showPickerSettings)}>Settings <SettingsIcon /></Button>
          <Button onClick={reset} disabled={isRunning || !currentChoice.trim().length > 0}>Reset</Button>
        </div>
        )}
      </div>
    );
    }


export default RandomPicker
