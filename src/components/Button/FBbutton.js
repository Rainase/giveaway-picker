import fbLogo from '../../fb-logo.svg'
const FBbutton = ({ children, onClick, disabled }) => {

  return ( 
    <button
      className='flex items-center bg-fbBlue py-1 px-2 rounded-full text-sm text-white font-medium max-h-7'
      onClick={onClick}
      disabled={disabled}>
        <img style={{height:18, width:18, marginRight:7}} src={fbLogo} alt='facebook-logo' />{children}
    </button>
   );
}
 
export default FBbutton;