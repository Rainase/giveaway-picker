const Button = ({ children, onClick, disabled, link }) => {
  const standard = 'focus:outline-none flex select-none text-indigo-500 dark:text-white shadow-md py-1.5 px-2 mr-4 mb-2 outline-none rounded-md uppercase text-sm dark:border-transparent border border-indigo-500 bg-white dark:bg-indigo-600 transition-all duration-250 dark:hover:bg-indigo-700'
  const linkBtn = 'flex select-none text-indigo-500 dark:text-white py-1.5 px-2 mr-4 mb-2 text-sm transition-all duration-250'
  return ( 
    <button className={link ? linkBtn : standard}
      onClick={onClick}
      disabled={disabled}>
      {children}
    </button>
   );
}
 
export default Button;