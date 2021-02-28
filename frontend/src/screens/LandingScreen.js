
import React from 'react'
import {motion} from 'framer-motion';

import "../css/Custom.css"

const LandingScreen = () => {
  return (
   <motion.div initial={{opacity:0,y:90}} animate={{opacity:1,y:0}} transition={{delay:0.2, duration:0.6,type: "spring", damping: 36, stiffness: 200,}} classNameName = "landingpage">
    
<section className="c-section">
  <h2 className="c-section__title"><span>Open Edu</span></h2>
  <ul className="c-services">
    <li className="c-services__item">
      <h3>Feature 1</h3>
      <p>Shantanu likh dena</p>
    </li>
    <li className="c-services__item">
      <h3>Feature 2</h3>
      <p>Shantanu likh dena</p>
    </li>
    <li className="c-services__item">
      <h3>High Light2</h3>
      <p>We are Front End masters with a deep focus on HTML, CSS. The result of our work is a responsive, accessible, and performant websites. Either you have the design ready and want us to code it, or you want us to do both design and code, we&rsquo;re happy to do so.</p>
    </li>
    <li className="c-services__item">
      <h3>yeh bhi likhna h</h3>
      <p>If you don&rsquo;t know what kind of service to request from us, don&rsquo;t worry. We can help and see what fits your business and your budget.</p>
    </li>
    <li className="c-services__item">
      <h3>Mobile Apps Design</h3>
      <p>To reach more customers and the goals of your business, a mobile application is necessary these days. We will work on the app design from scratch to final tested prototype.</p>
    </li>
    <li className="c-services__item">
      <h3>UX Research</h3>
      <p>It&rsquo;s important to research deeply for the product you want to build. We help in that by defining the user audience, working on user stories, competitive analysis and much more. </p>
    </li>
  </ul>
</section>
   </motion.div>
  )
}

export default LandingScreen
