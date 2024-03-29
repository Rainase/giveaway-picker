import { useHistory } from 'react-router-dom';
import { useStoreActions } from 'easy-peasy';
const Breadcrumbs = () => {
  const history = useHistory()
  const { setComments } = useStoreActions(action => action.accounts)

  const navigateBack = () => () => {
    setComments([])
    history.goBack()
  }
  const BackIcon = () => (
    <svg className='w-5 mr-2' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
    </svg>
  )
  return ( 
    <div
      className='m-4 text-xs uppercase flex cursor-pointer'
      onClick={navigateBack()}>
      <BackIcon />
      back
    </div>
   );
}
 
export default Breadcrumbs;