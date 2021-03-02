
import Loading from '../Loading/index';

const DangerIcon = () => (
  <svg className='w-8 m-4 text-red-600' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)
const NoFacebookPages = () => (
  <div className='flex border rounded-md border-red-400 p-2 shadow-md select-none'>
    <DangerIcon />
    You don't see your page here becasue you didn't allow permissions to your Facebook and Instagram pages or haven't set up your Instagram account to be either business or creator account !</div>
)
const IGAccountCard = ({ igAccounts, onClick }) => {
  return ( 
    <div className='flex flex-wrap mx-4'>
      { igAccounts.length === 0 && <NoFacebookPages /> }
      {igAccounts ? (
        igAccounts.map((acc) => (
          <div
            key={acc.id}
            onClick={() => onClick(acc.id)}
            className=' flex flex-col content-center w-64 h-32 items-center p-4 rounded-md m-2 cursor-pointer dark:bg-lessDarker shadow-md bg-gradient-to-br from-primary to-purple-500 hover:shadow-xl transition-all ease-in-out'>
            <div className='relative w-12 h-12 bg-white shadow-lg rounded-full'>
              <div className='absolute p-0.5'>
              <img className='rounded-full' src={acc.profile_picture_url} alt={acc.name}/>
              </div>
            </div>
            <div className='text-gray-200  mt-1'>{acc.name}</div>
            {/* <button onClick={() => getBizzInfo(acc.id)}>here</button> */}
          </div>
        ))
      ): (
        <Loading />
      )}
    </div>
   );
}
 
export default IGAccountCard;