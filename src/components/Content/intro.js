import loginWithFB from '../../login-with-facebook.svg'
import officialApi from '../../official-api.svg'
const IntroSection = () => {
  return ( 
    <section className="w-full bg-white dark:bg-darker pt-7 pb-7 md:pt-20 md:pb-24">
    <div className="box-border flex flex-col items-center content-center px-8 mx-auto leading-6 text-black border-0 border-gray-300 border-solid md:flex-row max-w-7xl lg:px-16">

        <div className="box-border relative w-full max-w-md px-4 mt-5 mb-4 -ml-5 text-center bg-no-repeat bg-contain border-solid md:ml-0 md:mt-0 md:max-w-none lg:mb-0 md:w-1/2 xl:pl-10">
            <img src={loginWithFB} className="p-2 pl-6 pr-5 xl:pl-16 xl:pr-20 " alt='Social authentication' />
        </div>

        <div className="box-border order-first w-full dark:text-white border-solid md:w-1/2 md:pl-10 md:order-none">
            <h2 className="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl">
                Login with Facebook
            </h2>
            <p className="pt-4 pb-8 m-0 leading-7 text-gray-500 dark:text-gray-50 border-0 border-gray-300 sm:pr-12 xl:pr-32 lg:text-lg">
                Use your Facebook account that is admin of the Facebook page that is connected to Instagram business or creator account.
            </p>
            <ul className="p-0 m-0 leading-6 border-0 border-gray-300">
                <li className="box-border relative py-1 pl-0 text-left text-gray-500 dark:text-gray-50 border-solid">
                    <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-purple-600 rounded-full">
                    <span className="text-sm font-bold">✓</span></span>For influencers and businesses
                </li>
                <li className="box-border relative py-1 pl-0 text-left text-gray-500 dark:text-gray-50 border-solid">
                    <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-purple-600 rounded-full">
                      <span className="text-sm font-bold">✓</span></span>Select pages you need to run giveaway contests
                </li>
                <li className="box-border relative py-1 pl-0 text-left text-gray-500 dark:text-gray-50 border-solid">
                    <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-purple-600 rounded-full">
                    <span className="text-sm font-bold">✓</span></span>Pick a post and randomly pick a winner
                </li>
            </ul>
        </div>
    </div>
    <div className="box-border flex flex-col items-center content-center px-8 mx-auto mt-2 leading-6 text-black border-0 border-gray-300 border-solid md:mt-20 xl:mt-0 md:flex-row max-w-7xl lg:px-16">
        <div className="box-border w-full text-black border-solid md:w-1/2 md:pl-6 xl:pl-32">
            <h2 className="m-0 text-xl dark:text-white font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl">
                We use Facebook's official API
            </h2>
            <p className="pt-4 pb-8 m-0 leading-7 text-gray-700 dark:text-gray-50 border-0 border-gray-300 sm:pr-10 lg:text-lg">
                To get the list of all your posts comments we are using the official API to fetch all the data. For that we need permissions.
            </p>
            <ul className="p-0 m-0 leading-6 border-0 border-gray-300">
                <li className="box-border relative py-1 pl-0 text-left text-gray-500 dark:text-gray-50 border-solid">
                    <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-purple-600 rounded-full">
                    <span className="text-sm font-bold">✓</span></span>Access profile and posts
                </li>
                <li className="box-border relative py-1 pl-0 text-left text-gray-500 dark:text-gray-50 border-solid">
                    <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-purple-600 rounded-full">
                    <span className="text-sm font-bold">✓</span></span>Read content posted on the Page
                </li>
                <li className="box-border relative py-1 pl-0 text-left text-gray-500 dark:text-gray-50 border-solid">
                    <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-purple-600 rounded-full">
                    <span className="text-sm font-bold">✓</span></span>We don't ask permissions to post on your behalf
                </li>
            </ul>
        </div>

        <div className="box-border relative w-full max-w-md px-4 mt-10 mb-4 text-center bg-no-repeat bg-contain border-solid md:mt-0 md:max-w-none lg:mb-0 md:w-1/2">
            <img src={officialApi} className="pl-4 sm:pr-10 xl:pl-10 lg:pr-32" alt='API'/>
        </div>
    </div>
</section>
   );
}
 
export default IntroSection;