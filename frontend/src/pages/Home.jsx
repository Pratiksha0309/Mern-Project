import React from 'react'
import Hero from '../components/Hero'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
import CardShowcase from "../components/CardShowcase.jsx";
import ProductTabs from "../components/ProductTabs.jsx";

const Home = () => {
  return (
    <div>
      <Hero />
      <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[8vw]'>
          <CardShowcase />
      {/*<LatestCollection/>*/}
      {/*<BestSeller/>*/}
        <ProductTabs />
        <OurPolicy/>
      {/* <NewsletterBox/> */}
      </div>
    
    </div>
  )
}

export default Home
