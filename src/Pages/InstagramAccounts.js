import { useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom' 
import { useStoreState, useStoreActions } from 'easy-peasy';
import Loading from '../components/Loading';
import Breadcrumbs from '../components/Breadcrumbs';
import Toast from '../components/Notifications';
import { getIgBizzAcc, getDataPerIgPost } from '../API/fb-graph-api';
import { motion, AnimatePresence } from "framer-motion";
const InstagramAccountsPage = () => {
  const history = useHistory()
  const location = useLocation()
  const { id } = useParams()
  const { igAccounts, igPostData } = useStoreState(state => state.accounts)
  const { setIgAccounts, setIgPostData } = useStoreActions(action => action.accounts)
  const { toasts } = useStoreState(state => state.ui)
  const { userdata } = useStoreState(state => state.user)
  const { setToasts, removeToast } = useStoreActions(action => action.ui)
  const goToPostPage = (id, data) => () => {
    if(!data)  return handleNotifications()
      history.push(`${location.pathname}/${id}`)      

  }
  const handleNotifications = () => {
    setToasts({title: 'Ups!', msg: 'Seems that this post doesn\'t have any comments!'})
    setTimeout(() => {
      if(toasts.length === []) return
      removeToast()
    },2000)
  }
  const getBizzInfo = async () => {
    try {
      await getIgBizzAcc(userdata.access_token, id).then((result) => {
        // setIgAccounts(result.data)
        getDataPerIgPost(userdata.access_token, result.data.media.data).then((result) => {
        setIgPostData(result)
        })
      })
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getBizzInfo()
  },[])

  return ( 
    
      <div className='flex flex-col flex-1 overflow-scroll md:overflow-visible'>
      <Breadcrumbs />
      <Toast data={toasts}/>
      {igAccounts ? (
        <div className='w-60 select-none flex bg-gradient-to-br from-primary to-purple-500 rounded-lg p-4 items-center justify-around mx-auto shadow-lg'>
          <div className='relative w-12 h-12 bg-white shadow-lg rounded-full'>
              <div className='absolute p-0.5'>
              <img className='rounded-full' src={igAccounts.profile_picture_url} alt={igAccounts.name}/>
              </div>
            </div>
        <div className='cursor-none text-sm text-white font-semibold'>
          <p>Followers: {igAccounts.followers_count}</p>
          <p>Follows: {igAccounts.follows_count}</p>
          <p>Media: {igAccounts.media_count}</p>
        </div>
        </div>) :
      
      (<Loading />)}
          <AnimatePresence>
        <div className='flex flex-wrap place-content-center'>
          {igPostData.length === 0 ? (<Loading />): (
            igPostData.map(({id, media_url, thumbnail_url,media_type, caption, like_count, comments_count, comments},i) => (
              <motion.div
              variants={{
                hidden: (i) => ({
                  opacity: 0,
                  y: -100 * i,
                }),
                visible: (i) => ({
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: i * 0.025,
                  },
                }),
                removed: {
                  opacity: 0,
                },
              }}
              
              animate="visible"
              exit="removed"
              custom={i}
              initial='hidden'
                onClick={goToPostPage(id, comments)}
                key={id}
                className='w-full lg:w-3/5 m-4 select-none flex flex-col bg-gray-50 dark:bg-lessDarker dark:border border-lessDarker cursor-pointer rounded-lg p-4 hover:bg-opacity-80 transition-all duration-400 ease-in-out shadow-md hover:shadow-lg text-lessDarker dark:text-white'>
                <div className='flex w-full '>
                  <img className='rounded-lg mr-4 h-20 w-20' src={media_type === 'VIDEO'  ? thumbnail_url : media_url} alt={caption}/>
                  <div className='' >{caption?.slice(0,240)}</div>
                </div>
                <div className='flex w-20 justify-between mt-2'>
                  <div className='flex'>
                    <svg className='w-5' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <div className='ml-1'>{like_count}</div>
                  </div>
                  <div className='flex'>
                  <svg className='w-5' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                    <div className='ml-1'>{comments_count}</div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
          </AnimatePresence>
      </div>
   );
}
 
export default InstagramAccountsPage;