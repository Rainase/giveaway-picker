import { auth } from '../firebase'
import { useHistory } from 'react-router-dom'
import { useStoreState ,useStoreActions } from 'easy-peasy';
import { getIgBizzAcc, getDataPerIgPost } from '../API/fb-graph-api';
import FBAccountCard from '../components/AccountCards/FBAccountCard';
import Button from '../components/Button';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import IGAccountCard from '../components/AccountCards/IGAccountCard';
import axios from 'axios';

const DashboardPage = () => {
  const location = useHistory()
  const { fbAccounts, igAccounts } = useStoreState(state => state.accounts);
  const { userdata } = useStoreState(state => state.user)
  const { setIgAccounts, setIgPostData } = useStoreActions(action => action.accounts)
  const { setUserData } = useStoreActions(action => action.user)
  
  const test = async () => {
    const response = await axios.get('https://graph.facebook.com/v9.0/125973324735440/posts',{
      params: {
        fields: 'message,id,picture,comments{from,message}',
        access_token: userdata.access_token,
      }
    })
    // console.log('response', response);
  }
  const getIgPosts = async (id) => {
    location.push(`/app/${id}`)
  }
  const getFbPosts = async (id) => {
    location.push(`/app/fb/${id}`)
  }
  // test()
  return (
    <>
    <section className='flex flex-col flex-1'>
      <h1 className='m-2 text-3xl font-semibold select-none text-lessDarker dark:text-white'>Dashboard</h1>
      <div className='flex flex-wrap mx-4'>
        <FBAccountCard fbAccounts={fbAccounts} onClick={getIgPosts}/>
      </div>
        {/* <IGAccountCard igAccounts={igAccounts} onClick={getFbPosts}/> */}
    </section>
    {/* <Footer /> */}
    </>
   );
}
 
export default DashboardPage;