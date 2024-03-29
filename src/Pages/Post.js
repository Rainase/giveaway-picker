/* eslint-disable react-hooks/exhaustive-deps */
import { useStoreState, useStoreActions } from 'easy-peasy';
import Breadcrumbs from '../components/Breadcrumbs';
import RandomPicker from '../components/NamePicker';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getComments } from '../API/fb-graph-api';
import Loading from '../components/Loading';
import { motion, AnimatePresence } from "framer-motion";
const ExternalLinkIcon = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
)
const PostPage = () => {
  const { postId } = useParams()
  const { comments, igAccounts } = useStoreState(state => state.accounts)
  const { setComments } = useStoreActions(action => action.accounts)
  const { userdata } = useStoreState(state => state.user)
  const { pickerReplies, pickerDuplicates } = useStoreState(state => state.ui)
  let userArr = []
  comments.forEach((comment) => {
    userArr.push(comment.username)
    if(comment.replies && pickerReplies) {
      comment.replies.data.map((comment) => {
        userArr.push(comment.username)
        return userArr
      })
    }
  });

  const wihtoutCurrentUser = userArr.filter((item) => item !== igAccounts.username);
  const removeDuplicates = Object.values(wihtoutCurrentUser.reduce((result, myString) => {
    result[myString] = myString
    return result
  },[]))
  const fetchComments = async () => {
    try {
      const comments_response = await getComments(userdata.access_token, postId)
      await setComments(comments_response)
    } catch (error) {
      console.log('error', error);
    }
  }
useEffect(() => {
  fetchComments()
},[postId])

  // console.log(pickerDuplicates ? removeDuplicates : wihtoutCurrentUser)
  return ( 
    <div className='flex flex-col w-4/5 h-screen mx-auto overflow-scroll md:overflow-visible'>
      <Breadcrumbs />
      <div className='flex w-4/5 mx-auto my-4'>
      <RandomPicker items={pickerDuplicates ? removeDuplicates : wihtoutCurrentUser}/>
      </div>
        <AnimatePresence>
      <div className='flex flex-col flex-1 select-none '>
        {comments.length === 0 && <Loading />}
        {comments && comments.map(({ id, username, text, replies},i) => (
          <motion.div
            variants={{
              hidden: (i) => ({
                opacity: 0,
                y: -50 * i,
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
            key={id + Math.random(33)} 
            className='grid-cols-4 gap-4 p-2 m-2 bg-gray-100 rounded-md shadow-lg dark:bg-lessDarker hover:opacity-90'>
            <a href={`https://www.instagram.com/${username}`} target='_blank' rel='noreferrer' className='flex text-primary'>
              @{username} <ExternalLinkIcon />
            </a>
            <div>{text}
              {replies ? replies.data.map(({ username, text, id}, i) => (
                <div key={id + Math.random(33)} className='p-1 m-2 bg-gray-200 rounded-md shadow-md dark:bg-gray-700'>
                  <a href={`https://www.instagram.com/${username}`} target='_blank' rel='noreferrer' className='flex text-primary'>
                    @{username} <ExternalLinkIcon />
                  </a>{text}
                </div>
                )) : ''
              }
            </div>
          </motion.div>
        ))}
      </div>
        </AnimatePresence>
      <div>
      </div>
    </div>
   );
}
 
export default PostPage;