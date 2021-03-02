import { useStoreState } from 'easy-peasy';
import Hero from '../components/Hero';
import IntroSection from '../components/Content/intro';
const LandingPage = () => {
  return ( 
    <div>
      <Hero />
      <IntroSection />
    </div>
   );
}
 
export default LandingPage;