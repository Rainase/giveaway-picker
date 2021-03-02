import { auth, facebook, db } from '../../firebase'
import {  useStoreActions, useStoreState } from 'easy-peasy';
import { getUserAccounts } from '../../API/fb-graph-api'
import Button from '../Button';
import { useHistory } from 'react-router-dom';
import FBbutton from '../Button/FBbutton';
const Login = () => {
  const { setFbAccounts } = useStoreActions(action => action.accounts);
  const { isLoggedIn, currentPath } = useStoreState(state => state.user)
  const { setCurrentPath, setUserData } = useStoreActions(action => action.user)
  const history = useHistory()
  
  
  const fbAuth = () => () => {
    auth.signInWithPopup(facebook.addScope('pages_read_engagement, instagram_manage_comments, instagram_basic, pages_show_list')).then((result) => {
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
 
  const logout = () => () => {
    auth.signOut()
    setUserData(false, null)
    history.push('/')
  }
  const toDashboard = () => () => {
    setCurrentPath('/app')
    history.push('/app')
  }
  return ( 
    <div className='flex'>
      {isLoggedIn && currentPath === '/' ? (
        <Button
          onClick={toDashboard()}
        >dashboard</Button>
      ) : (<></>)}
      {isLoggedIn ? (
        <Button
          link
          onClick={logout()}
          >Logout
      </Button>
      ) : (
      <FBbutton
        onClick={fbAuth()}
        >Continue with Facebook
      </FBbutton>
      )}
    </div>
   );
}
 
export default Login;