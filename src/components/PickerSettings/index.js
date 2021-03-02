
import { useStoreState, useStoreActions } from 'easy-peasy';
import Button from '../Button';
import Toast from '../Notifications/index';
const PickerSettings = () => {
  const { toasts, pickerDuration, pickerDuplicates, pickerReplies, showPickerSettings } = useStoreState(state => state.ui)
  const { setPickerDuration,setPickerDuplicates, setPickerReplies, setShowPickerSettings, setToasts, removeToast } = useStoreActions(action => action.ui)

  const handleNotifications = () => {
    setToasts({title: 'Error!', msg: 'Minimum game duration can be 5 seconds'})
    setTimeout(() => {
      if(toasts.length === []) return
      removeToast()
    },2000)
  }
  
  const handleDuration = (e) => {
    e.preventDefault()
    const duration = e.target.value
    if(duration < 5) return handleNotifications()
    setPickerDuration(duration * 1000)
  }
  const handleDuplicates = (e) => {
    const duplicate = e.target.checked
    setPickerDuplicates(duplicate)
  }
  const handleReplies = (e) => {
    const replies = e.target.checked
    setPickerReplies(replies)
  }
  return ( 
    <div className={`${showPickerSettings? 'fixed' : 'hidden'} inset-0 bg-lessDarker bg-opacity-70 z-30`}>
      <div className='sm:w-3/6 absolute sm:inset-1/4 inset-1 bg-white dark:bg-darker shadow-md border-lessDarker border rounded-md p-4'>
      <Toast data={toasts}/>
  <div className="md:grid md:grid-cols-3 md:gap-6 mt-5">
    <div className="md:col-span-1">
      <div className="px-4 sm:px-0">
        <h3 className="text-lg font-medium leading-6">Picker settings</h3>
        <p className="mt-1 text-sm text-gray-500">
          Here you can modify your winner picking settings. Changes are automatically saved.
        </p>
      </div>
    </div>
    <div className="mt-5 md:mt-0 md:col-span-2">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="px-4 py-5 bg-white dark:bg-lessDarker space-y-6 sm:p-6">
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-3 sm:col-span-2">
                <label htmlFor="duration" className="block text-sm font-medium">
                  Duration
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    value={pickerDuration / 1000}
                    onChange={(e) => handleDuration(e)}
                    type="number"
                    name="duration" id="duration" className=" text-darker focus:outline-none flex-1 block w-full rounded-none rounded-l-md border border-gray-300 pl-2" />
                  <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-300 text-gray-500 text-sm">
                    seconds
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 space-y-4">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    onChange={(e) => handleDuplicates(e)}
                    id="duplicates"
                    name="duplicates"
                    type="checkbox"
                    checked={pickerDuplicates}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-500 border-gray-300 rounded" />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="duplicates" className="font-medium">Remove duplicates</label>
                  <p className="text-gray-500 text-xs">Check this box if you want to allow one entriy per user to participate.</p>
                </div>
              </div>
                <div className="flex items-center h-5">
                  <input
                    onChange={(e) => handleReplies(e)}
                    id="replies"
                    name="replies"
                    type="checkbox"
                    checked={pickerReplies}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-500 border-gray-300 rounded" />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="replies" className="font-medium">Include comment replies</label>
                  <p className="text-gray-500 text-xs">Check this box if you want to include users from commment replies</p>
                </div>
              </div>
          </div>
          <div className="px-4 py-3 dark:bg-lessDarker text-right sm:px-6">
            <Button onClick={() => setShowPickerSettings(!showPickerSettings)}>Close</Button>
          </div>
        </div>
      </form>
    </div>
  </div>
      <div>
</div>
      </div>
    </div>
   );
}
 
export default PickerSettings;