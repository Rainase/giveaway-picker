
import { motion, AnimatePresence } from "framer-motion";
const Toast = ({data}) => {

  const DangerIcon = () => (
    <svg className='w-5 text-purple-500' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg> )
  return (
    <div className='select-none fixed top-20 right-3 flex flex-col z-40'>
      <AnimatePresence >
        {data.map(({ title, msg }, i) => (
        <motion.div
          key={i}
          positionTransition
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.1, transition: { duration: 0.2 } }}
          className="flex flex-row mb-2 border border-purple-500 rounded-md shadow-md w-92 bg-gray-100 dark:bg-lessDarker p-2">
          <div className="px-1 flex">
            <DangerIcon />
          </div>
          <div className="ml-2 mr-6">
            <span className="font-semibold text-sm">{title}</span>
            <span className="block dark:text-gray-300 text-sm">{msg}</span>
          </div>
        </motion.div>
        ))}
        </AnimatePresence>
        </div>
   );
}
 
export default Toast;